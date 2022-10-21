import style from "./layout.module.css";
import React, { useState, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ReactNode } from "react";
import { Layout, Typography, Affix, message } from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";
import Header from "@/components/header/Header";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { AuthTunk } from "@/store/actions/auth";
import { selectAuth } from "@/store/reducers/auth";
import { selectLoading } from "@/store/reducers/globalLoading";
import Spin from "@/components/spin/Spin";
import socket from "@/config/socket";
import { loadToken } from "@/tools/localStorage";

const { Footer, Content } = Layout;
interface Props {
  children: ReactNode;
}

const MasterLayout: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { children } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth, access_token } = useAppSelector(selectAuth);
  const { Loading } = useAppSelector(selectLoading);

  const login = async () => {
    try {
      await dispatch(AuthTunk());
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    if (isAuth) {
      socket.connect();
      socket.on("Error", (error) => {
        console.log(error);
        message.error(`Socket ${error.message}`);
      });
      return () => {
        socket.off("Error");
      };
    }
  }, [isAuth]);

  useEffect(() => {
    access_token && login();
  }, [access_token]);

  return (
    <Layout className={style.layout}>
      {Loading && <Spin />}
      <Affix>
        <Header
          collapsed={collapsed}
          setCollapsed={function (value: SetStateAction<boolean>): void {
            setCollapsed(value);
          }}
        />
      </Affix>
      <Layout>
        {isAuth && (
          <Affix offsetTop={70}>
            <SiderLayout
              collapsed={collapsed}
              setCollapsed={function (value: SetStateAction<boolean>): void {
                setCollapsed(value);
              }}
            />
          </Affix>
        )}
        <Layout className={style.contentContainer}>
          <Content>{children}</Content>
          <div className={style.layoutFooter}>
            {router.pathname === "/" && (
              <div className={style.sectionGameInfo}>
                <div className={style.sectionGameInfoLogo}>
                  <Link href="/">
                    <a>
                      <Image src="/images/Logo.png" height={68} width={110} />
                    </a>
                  </Link>
                </div>
                <div className={style.sectionGameInfoText}>
                  <Typography.Title level={3} className={style.sectionGameInfoTettel}>
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
