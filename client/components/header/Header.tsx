import { MenuOpenIcon, MenuCloseIcon, OutIcon } from "@/icons/index";
import Icon, { DownOutlined, SmileOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./header.module.css";
import { Layout, Button, Avatar, message, Typography, Dropdown, Space, Menu } from "antd";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import { _42Icon } from "@/icons/index";
import { useEffect } from "react";
import Notifications from "@/components/notifications/Notifications";
import socket from "@/config/socket";
import Search from "../search/Search";
import type { MenuProps } from "antd";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/reducers/auth";
import Socket from "@/config/socket";

const { Text } = Typography;
interface PropsType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<PropsType> = (props) => {
  const { collapsed, setCollapsed } = props;
  const { isAuth, img_url, error, username } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const route = useRouter();

  const handleLogOut: MenuProps["onClick"] = (e) => {
    dispatch(logout());
    Socket.disconnect();
    route.push("/");
    message.warning("success logout");
  };

  useEffect(() => {
    if (isAuth) {
      socket.on("userChangeStatus", (data) => {});
      return () => {
        socket.off("userChangeStatus");
      };
    }
  }, [isAuth]);

  const items: MenuProps["items"] = [
    {
      label: <Link href="/profile/me">{"Profile"}</Link>,
      key: "1",
    },

    {
      label: (
        <Text>
          <Icon component={OutIcon} style={{ fontSize: 15 }} />
          {" Logout"}
        </Text>
      ),
      key: "2",
      onClick: handleLogOut,
    },
  ];

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
        <form method="POST" action={`${process.env.API_URL || "http://localhost:5000"}/auth/login`}>
          <Button htmlType="submit" shape="round" ghost icon={<Icon component={_42Icon} style={{ fontSize: 20 }} />}>
            {"Login"}
          </Button>
        </form>
      ) : (
        <div className={style.rightDiv}>
          <Notifications />
          <Link href={"/profile/me"}>
            <a>
              <Text strong>{username}</Text>
            </a>
          </Link>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
            <a onClick={(e) => e.preventDefault()}>
              <Avatar src={img_url} size={55} />
            </a>
          </Dropdown>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
