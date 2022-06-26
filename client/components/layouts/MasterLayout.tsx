import layoutStyle from "./layout.module.css";
import { NextPage } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { Layout, Button, Typography, Avatar, Menu } from "antd";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import SiderLayout from "../sider/Sider";
// import {}

const { Header, Footer, Content, Sider } = Layout;

type Props = {
  children: ReactNode;
};

const MasterLayout: NextPage<Props> = (props) => {
  const { children } = props;
  const { data: session } = useSession();

  return (
    // Master layout
    <Layout className={layoutStyle.layout}>
      {/* Header */}
      <Header className={layoutStyle.header}>
        <Link href="/" >
          <a className={layoutStyle.logo}>
            <Image src="/images/Logo.png" height={68} width={110} />
          </a>
        </Link>
        {!session ? (
          <Button>
            <Link href="/auth/login">Login</Link>
          </Button>
        ) : (
          <>
            {/* // ! Delet this button */}
            {/* <Button onClick={() => signOut()}>Logout</Button> */}
            <Avatar src={session.user.image} size="large" />
          </>
        )}
      </Header>
      {/* Header end */}
      {/* content Layout */}
      <Layout>
        {/* Sider */}
        {session && <SiderLayout />}
        {/* Sider end */}
        {/* content */}
        <Content className={layoutStyle.contentContainer}>{children}</Content>
        {/* content end */}
      </Layout>
      {/* content Layout end */}
      <div className={layoutStyle.sectionGameInfo}>
        <div className={layoutStyle.sectionGameInfoLogo}>
          <Image src="/images/Logo.png" height={68} width={110} />
        </div>
        <div className={layoutStyle.sectionGameInfoText}>
          <Typography.Title
            level={3}
            className={layoutStyle.sectionGameInfoTettel}
          >
            About game
          </Typography.Title>
          <Typography.Text className={layoutStyle.sectionGameInfoText}>
            Ping-pong is a game in which two or four players hit a light, hollow
            ball back and forth across a net stretched across the center of a
            table. The game is more commonly known as table tennis, reflecting
            its origin as an indoor modification of the sport of lawn tennis.
            The term ping-pong is a federally registered trademark for the game
            first issued to Parker Brothers, Inc., in 1901, and now owned by
            Escalade Sports, of Evansville, Indiana. Provide additional
            interactive capacity of editable and copyable.
          </Typography.Text>
        </div>
      </div>
      <Footer className={layoutStyle.footer}>
        <span>Ft_transcendence</span>
        <span>© 2022 1337. All rights reserved.</span>
      </Footer>
    </Layout>
    // Master layout end
  );
};
export default MasterLayout;
