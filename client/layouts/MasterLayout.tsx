import style from "./layout.module.css";
import React, { useState, useRef, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Icon, { BellFilled } from "@ant-design/icons";
import { ReactNode } from "react";
import { Layout, Typography, Affix } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";
import Header from "@/components/header/Header";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";

import { SearchIcon, MenuCloseIcon, MenuOpenIcon } from "@/icons/index";

const { Footer, Content } = Layout;

type Props = {
  children: ReactNode;
};

interface NotifType {
  id: string;
  isRead: boolean;
  content: string;
  user: {
    id: string;
    name: { first: string; last: string };
    username: string;
    avatar: string;
  };
  createAt: Date;
}

interface UserType {
  id: string;
  username: string;
  name: { first: string; last: string };
  avatar: string;
}

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

async function fetchUserList(): Promise<UserType[]> {
  return fetch("https://randomuser.me/api/?results=20")
    .then((response) => response.json())
    .then((body) =>
      body.results.map(
        (user: {
          name: { first: string; last: string };
          login: { username: string; uuid: string };
          picture: { large: string };
        }) => ({
          id: user.login.uuid,
          username: user.login.username,
          name: user.name,
          avatar: user.picture.large,
        })
      )
    );
}

const randomNotif = () => {
  fetchUserList().then((res) => {
    console.log(res);
  });
};

const MasterLayout: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { children } = props;
  const router = useRouter();
  // console.log(isAuth);
  console.log(router.asPath);

  useEffect(() => {
    randomNotif();
  }, []);

  return (
    <Layout className={style.layout}>
      <Affix>
        <Header
          collapsed={collapsed}
          setCollapsed={function (value: SetStateAction<boolean>): void {
            setCollapsed(value);
          }}
          isAuth={false}
        />
      </Affix>
      <Layout>
        <Affix offsetTop={70}>
          <SiderLayout
            collapsed={collapsed}
            setCollapsed={function (value: SetStateAction<boolean>): void {
              setCollapsed(value);
            }}
          />
        </Affix>
        <Layout className={style.contentContainer}>
          <Content>{children}</Content>
          <div className={style.layoutFooter}>
            {router.asPath === "/" && (
              <div className={style.sectionGameInfo}>
                <div className={style.sectionGameInfoLogo}>
                  <Link href="/">
                    <a>
                      <Image src="/images/Logo.png" height={68} width={110} />
                    </a>
                  </Link>
                </div>
                <div className={style.sectionGameInfoText}>
                  <Typography.Title
                    level={3}
                    className={style.sectionGameInfoTettel}
                  >
                    {"About game"}
                  </Typography.Title>
                  <Typography.Text className={style.sectionGameInfoText}>
                    {
                      "Ping-pong is a game in which two or four players hit a\
                    light, hollow ball back and forth across a net stretched\
                    across the center of a table. The game is more commonly\
                    known as table tennis, reflecting its origin as an indoor\
                    modification of the sport of lawn tennis. The term ping-pong\
                    is a federally registered trademark for the game first\
                    issued to Parker Brothers, Inc., in 1901, and now owned by\
                    Escalade Sports, of Evansville, Indiana. Provide additional\
                    interactive capacity of editable and copyable."
                    }
                  </Typography.Text>
                </div>
              </div>
            )}
            <Footer className={style.footer}>
              <span>{"ft_transcendence"}</span>
              <span>{"© 2022 1337. All rights reserved."}</span>
            </Footer>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MasterLayout;
