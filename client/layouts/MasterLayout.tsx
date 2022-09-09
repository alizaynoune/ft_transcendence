import style from "./layout.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import {
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
} from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, logout } from "@/reducers/auth";
import Icon from "@ant-design/icons";

import { OutIcon, NotifIcon, SearchIcon } from "@/icons/index";

type MenuItem = Required<MenuProps>["items"][number];
const getItem = (label: React.ReactNode, key: React.Key, type?: "group") => {
  return {
    label,
    key,
    type,
  } as MenuItem;
};

const { Header, Footer, Content, Sider } = Layout;
const { Meta } = Card;

type Props = {
  children: ReactNode;
  footer?: boolean;
};

const MasterLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuth, avatar, email, name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  // console.log(isAuth);
  console.log(router.asPath);

  const items: MenuProps["items"] = [
    getItem(
      <Card
        // style={{cursor: 'initial'}}
        bordered={false}
        actions={[
          <Icon
            component={OutIcon}
            style={{ fontSize: "120%" }}
            onClick={(e) => {
              dispatch(logout());
            }}
          />,
          <Link href="/profile/me#AccountSettings">
            <SettingOutlined key="setting" />
          </Link>,
        ]}
      >
        <Meta
          avatar={<Avatar src={avatar} size="large" />}
          title={name.first + " " + name.last}
          description={email}
        />
      </Card>,
      "1",
      "group"
      // true,
      // []
    ),
  ];

  return (
    // Master layout
    <Layout className={style.layout}>
      {/* Header */}
      <Header className={style.header}>
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
            <Dropdown overlay={<Menu items={items} />} trigger={["click"]}>
              <a>
                <Avatar src={avatar} size={55} />
              </a>
            </Dropdown>
          </div>
        )}
      </Header>
      {/* Header end */}
      {/* content Layout */}
      <Layout>
        {/* Sider */}
        {isAuth && <SiderLayout />}
        {/* Sider end */}
        {/* content */}
        <Content className={style.contentContainer}>{children}</Content>
        {/* content end */}
      </Layout>
      {/* content Layout end */}
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
            <Typography.Title level={3} className={style.sectionGameInfoTettel}>
              About game
            </Typography.Title>
            <Typography.Text className={style.sectionGameInfoText}>
              Ping-pong is a game in which two or four players hit a light,
              hollow ball back and forth across a net stretched across the
              center of a table. The game is more commonly known as table
              tennis, reflecting its origin as an indoor modification of the
              sport of lawn tennis. The term ping-pong is a federally registered
              trademark for the game first issued to Parker Brothers, Inc., in
              1901, and now owned by Escalade Sports, of Evansville, Indiana.
              Provide additional interactive capacity of editable and copyable.
            </Typography.Text>
          </div>
        </div>
      )}
      <Footer className={style.footer}>
        <span>ft_transcendence</span>
        <span>© 2022 1337. All rights reserved.</span>
      </Footer>
    </Layout>
    // Master layout end
  );
};
export default MasterLayout;
