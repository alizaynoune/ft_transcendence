import layoutStyle from "./layout.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
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
} from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, logout } from "@/reducers/auth";
import logoutIcon from "@/icons/out.svg";
import Icon from "@ant-design/icons";


type MenuItem = Required<MenuProps>["items"][number];
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  type?: "group",
  // disabled?: boolean,
  // children?: []
) => {
  return {
    label,
    key,
    type,
    // disabled,
    // children,
  } as MenuItem;
};

const { Header, Footer, Content, Sider } = Layout;
const {Meta} = Card

type Props = {
  children: ReactNode;
  footer?: boolean;
};

const MasterLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter()
  const { isAuth, avatar, email, name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch()
  // console.log(isAuth);
  console.log(router.asPath);
  

  const items: MenuProps["items"] = [

    getItem(
      <Card
      // style={{cursor: 'initial'}}
      bordered={false}
      actions={[
        <Icon component={logoutIcon} style={{ fontSize: "120%" }} onClick={(e) => {dispatch(logout())}} />,
        <Link href='/profile/me#AccountSettings'><SettingOutlined key="setting" /></Link>,
      ]}
    >
      <Meta
        avatar={<Avatar src={avatar} size='large' />}
        title={name.first + ' ' + name.last}
        description={email}
      />
    </Card>,
      "1",
      "group",
      // true,
      // []
    ),
  ];

  return (
    // Master layout
    <Layout className={layoutStyle.layout}>
      {/* Header */}
      <Header className={layoutStyle.header}>
        <Link href="/">
          <a className={layoutStyle.logo}>
            <Image src="/images/Logo.png" height={68} width={110} />
          </a>
        </Link>
        {!isAuth ? (
          <Button>
            <Link href="/auth/login">Login</Link>
          </Button>
        ) : (
          // <>
          <Dropdown overlay={<Menu items={items}  />} trigger={["click"]}
          >
            <a>
              <Avatar src={avatar} size={55} />
            </a>
          </Dropdown>
          // </>
        )}
      </Header>
      {/* Header end */}
      {/* content Layout */}
      <Layout>
        {/* Sider */}
        {isAuth && <SiderLayout />}
        {/* Sider end */}
        {/* content */}
        <Content className={layoutStyle.contentContainer}>{children}</Content>
        {/* content end */}
      </Layout>
      {/* content Layout end */}
        { router.asPath === '/' && (
      <div className={layoutStyle.sectionGameInfo}>
        <div className={layoutStyle.sectionGameInfoLogo}>
          <Link href="/">
            <a>
              <Image src="/images/Logo.png" height={68} width={110} />
            </a>
          </Link>
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
        )}
      <Footer className={layoutStyle.footer}>
        <span>ft_transcendence</span>
        <span>© 2022 1337. All rights reserved.</span>
      </Footer>
    </Layout>
    // Master layout end
  );
};
export default MasterLayout;
