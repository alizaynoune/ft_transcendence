import { useState } from "react";
import layoutStyle from "./layout.module.css";
import { NextPage } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { Layout, Button, Typography, Avatar, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useSession, signOut, signIn } from 'next-auth/react'
import SiderLayout from '../sider/Sider'
// import {}

const { Header, Footer, Content, Sider } = Layout;

type Props = {
  children: ReactNode;
};

const MasterLayout: NextPage<Props> = (props) => {
  const { children } = props
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(true);
  // console.log(session, '<<<<<<<<data');

  return (
    <Layout className={layoutStyle.layout}>
      <Header className={layoutStyle.header}>
        <Image src="/images/Logo.png" height={68} width={110} />
        {!session ? (
          <Button >
            <Link href='/auth/login'>
              Login
            </Link>
          </Button>
        ) : (
          <>
          {/* // ! Delet this button */}
            <Button onClick={() => signOut()}>Logout</Button> 
            <Avatar src={session.user.image} size='large' />
          </>
        )
        }
      </Header>
      <Layout>
        {session && (<SiderLayout />)}
        <Content className={layoutStyle.contentContainer}>
          {children}
        </Content>
      </Layout>
      <div className={layoutStyle.sectionGameInfo}>
        <div className={layoutStyle.sectionGameInfoLogo}>
          <Image src="/images/Logo.png" height={68} width={110} />
        </div>
        <div className={layoutStyle.sectionGameInfoText}>
          <Typography.Title level={3} className={layoutStyle.sectionGameInfoTettel}>
            About game
          </Typography.Title>
          <Typography.Text className={layoutStyle.sectionGameInfoText}>
            Ping-pong is a game in which two or four players hit a light, hollow ball back and forth across a net stretched across the center of a table. The game is more commonly known as table tennis, reflecting its origin as an indoor modification of the sport of lawn tennis. The term ping-pong is a federally registered trademark for the game first issued to Parker Brothers, Inc., in 1901, and now owned by Escalade Sports, of Evansville, Indiana.
            Provide additional interactive capacity of editable and copyable.
          </Typography.Text>
        </div>
      </div>
      <Footer className={layoutStyle.footer}>
        <span>Ft_transcendence</span>
        <span>© 2022 1337. All rights reserved.</span>
      </Footer>
    </Layout>
  );
};
export default MasterLayout;
