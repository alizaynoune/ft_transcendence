import { MenuOpenIcon, MenuCloseIcon, SearchIcon } from "@/icons/index";
import Icon from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import style from "./header.module.css";
import { Layout, Input, Button, Badge, Avatar, message, Select, Dropdown, Menu } from "antd";
import type { MenuProps } from "antd";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import { _42Icon } from "@/icons/index";
import { useEffect, useState } from "react";
import Notifications from "@/components/notifications/Notifications";
import { UserType } from "@/types/types";
import axios from "@/config/axios";
import socket from "@/config/socket";
import Search from "../search/Search";

interface PropsType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<PropsType> = (props) => {
  const { collapsed, setCollapsed } = props;
  const { isAuth, img_url, error } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isAuth) {
      socket.emit("events", { message: "emit from client" });
      socket.on("userChangeStatus", (data) => {
        console.log(data);
      });
      return () => {
        socket.off("userChangeStatus");
      };
    }
  }, [isAuth]);

  useEffect(() => {
    error && message.error(error.message);
  }, [error]);

  return (
    <Layout.Header className={style.header}>
      <div className={style.trigger}>
        <Icon
          component={collapsed ? MenuOpenIcon : MenuCloseIcon}
          style={{
            fontSize: "40px",
            color: "var(--light-color)",
          }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
      <div className={style.leftDiv}>
        <Link href="/">
          <a className={style.logo}>
            <Image src="/images/Logo.png" height={68} width={110} />
          </a>
        </Link>
        {isAuth && <Search />}
      </div>
      {!isAuth ? (
        <form method="GET" action={`${process.env.NEXT_PUBLIC_URL_API || "http://localhost:5000"}/auth/login`}>
          <Button htmlType="submit" shape="round" ghost icon={<Icon component={_42Icon} style={{ fontSize: 20 }} />}>
            {"Login"}
          </Button>
        </form>
      ) : (
        <div className={style.rightDiv}>
          <Notifications />
          <Link href={"/profile/me"}>
            <a>
              <Avatar src={img_url} size={55} />
            </a>
          </Link>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
