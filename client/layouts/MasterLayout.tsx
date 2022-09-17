import style from "./layout.module.css";
import React, { useState, useRef, SetStateAction } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Icon, {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  BellOutlined,
  BellFilled,
} from "@ant-design/icons";
import { ReactNode, forwardRef, createRef } from "react";
import {
  Layout,
  Button,
  Typography,
  Avatar,
  Dropdown,
  Menu,
  MenuProps,
  Card,
  Input,
  Badge,
  Affix,
} from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";

import { SearchIcon, MenuCloseIcon, MenuOpenIcon } from "@/icons/index";

const { Header, Footer, Content, Sider } = Layout;
const { Meta } = Card;

type Props = {
  children: ReactNode;
  footer?: boolean;
};

const MasterLayout: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { children } = props;
  const router = useRouter();
  const { isAuth, avatar, email, name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  // console.log(isAuth);
  console.log(router.asPath);

  return (
    <Layout className={style.layout}>
      <Affix>
        <Header className={style.header}>
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
            {isAuth && (
              <Input
                className={style.search}
                size="large"
                placeholder="Search"
                suffix={
                  <Icon
                    component={SearchIcon}
                    style={{ fontSize: "135%", color: "var(--light-color)" }}
                  />
                }
              />
            )}
          </div>
          {!isAuth ? (
            <Button>
              <Link href="/auth/login">Login</Link>
            </Button>
          ) : (
            <div className={style.rightDiv}>
              <Badge count={3}>
                <BellFilled
                  style={{
                    fontSize: "180%",
                    color: "var(--light-color)",
                    fontWeight: "bold",
                  }}
                />
              </Badge>
              <Link href={"/profile/me"}>
                <a>
                  <Avatar src={avatar} size={55} />
                </a>
              </Link>
            </div>
          )}
        </Header>
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
                    About game
                  </Typography.Title>
                  <Typography.Text className={style.sectionGameInfoText}>
                    Ping-pong is a game in which two or four players hit a
                    light, hollow ball back and forth across a net stretched
                    across the center of a table. The game is more commonly
                    known as table tennis, reflecting its origin as an indoor
                    modification of the sport of lawn tennis. The term ping-pong
                    is a federally registered trademark for the game first
                    issued to Parker Brothers, Inc., in 1901, and now owned by
                    Escalade Sports, of Evansville, Indiana. Provide additional
                    interactive capacity of editable and copyable.
                  </Typography.Text>
                </div>
              </div>
            )}
            <Footer className={style.footer}>
              <span>ft_transcendence</span>
              <span>© 2022 1337. All rights reserved.</span>
            </Footer>
          </div>
        </Layout>
      </Layout>
    </Layout>

    //   <Layout className={style.layout}>
    //   <Affix offsetTop={70}>
    //           <SiderLayout
    //             collapsed={collapsed}
    //             setCollapsed={function (value: SetStateAction<boolean>): void {
    //               setCollapsed(value);
    //             }}
    //           />
    //         </Affix>
    //   <Layout>
    //     <Affix>
    //         <Header className={style.header}>
    //           <div className={style.trigger}>
    //             <Icon
    //               component={collapsed ? MenuOpenIcon : MenuCloseIcon}
    //               style={{
    //                 fontSize: "40px",
    //                 color: "var(--light-color)",
    //               }}
    //               onClick={() => setCollapsed(!collapsed)}
    //             />
    //           </div>
    //           <div className={style.leftDiv}>
    //             <Link href="/">
    //               <a className={style.logo}>
    //                 <Image src="/images/Logo.png" height={68} width={110} />
    //               </a>
    //             </Link>
    //             {isAuth && (
    //               <Input
    //                 className={style.search}
    //                 size="large"
    //                 placeholder="Search"
    //                 suffix={
    //                   <Icon
    //                     component={SearchIcon}
    //                     style={{ fontSize: "135%", color: "var(--light-color)" }}
    //                   />
    //                 }
    //               />
    //             )}
    //           </div>
    //           {!isAuth ? (
    //             <Button>
    //               <Link href="/auth/login">Login</Link>
    //             </Button>
    //           ) : (
    //             <div className={style.rightDiv}>
    //               <Badge count={3}>
    //                 <BellFilled
    //                   style={{
    //                     fontSize: "180%",
    //                     color: "var(--light-color)",
    //                     fontWeight: "bold",
    //                   }}
    //                 />
    //               </Badge>
    //               <Link href={"/profile/me"}>
    //                 <a>
    //                   <Avatar src={avatar} size={55} />
    //                 </a>
    //               </Link>
    //             </div>
    //           )}
    //         </Header>
    //       </Affix>
    //       <Content className={style.contentContainer}>{children}</Content>
    //     <div className={style.layoutFooter}>
    //         {router.asPath === "/" && (
    //           <div className={style.sectionGameInfo}>
    //             <div className={style.sectionGameInfoLogo}>
    //               <Link href="/">
    //                 <a>
    //                   <Image src="/images/Logo.png" height={68} width={110} />
    //                 </a>
    //               </Link>
    //             </div>
    //             <div className={style.sectionGameInfoText}>
    //               <Typography.Title
    //                 level={3}
    //                 className={style.sectionGameInfoTettel}
    //               >
    //                 About game
    //               </Typography.Title>
    //               <Typography.Text className={style.sectionGameInfoText}>
    //                 Ping-pong is a game in which two or four players hit a light,
    //                 hollow ball back and forth across a net stretched across the
    //                 center of a table. The game is more commonly known as table
    //                 tennis, reflecting its origin as an indoor modification of the
    //                 sport of lawn tennis. The term ping-pong is a federally
    //                 registered trademark for the game first issued to Parker
    //                 Brothers, Inc., in 1901, and now owned by Escalade Sports, of
    //                 Evansville, Indiana. Provide additional interactive capacity of
    //                 editable and copyable.
    //               </Typography.Text>
    //             </div>
    //           </div>
    //         )}
    //         <Footer className={style.footer}>
    //           <span>ft_transcendence</span>
    //           <span>© 2022 1337. All rights reserved.</span>
    //         </Footer>
    //       </div>
    //   </Layout>
    // </Layout>
  );
};
export default MasterLayout;
