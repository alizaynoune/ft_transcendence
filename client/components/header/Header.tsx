import { MenuOpenIcon, MenuCloseIcon, SearchIcon } from "@/icons/index";
import Icon, { BellFilled } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import style from "./header.module.css";
import {
  Layout,
  Input,
  Button,
  Badge,
  Avatar,
  Dropdown,
  Space,
  Menu,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import { useEffect, useState } from "react";

interface PropsType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

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
  disabled: Boolean,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    disabled,
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
const { Text } = Typography;
const Header: React.FC<PropsType> = (props) => {
  const { collapsed, setCollapsed } = props;
  const { isAuth, avatar, email, name } = useAppSelector(selectAuth);
  const [notif, setNotif] = useState<NotifType[]>([]);

  const randomNotif = () => {
    fetchUserList()
      .then((res) => {
        const notif = res.map((i) => {
          return {
            id: "",
            isRead: false,
            content: "message",
            user: i,
            createAt: new Date(),
          };
        });
        setNotif(notif);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    randomNotif();
  }, []);

  useEffect(() => {
    console.log(notif, "notif");
  }, [notif]);

  const items: MenuItem[] = notif.map((i) =>
    getItem(
      <Space>
        <Space direction="vertical">
          <Text strong>{i.user.username}</Text>
          <Text type="secondary">{"Invet you to play a game"}</Text>
        </Space>
        <Text type="secondary">{moment(i.createAt).fromNow()}</Text>
      </Space>,
      i.isRead,
      i.user.id,
      <Avatar src={i.user.avatar} />,
      // [getItem("accept", false), getItem('delete', false)]
    )
  );

  const menu = <Menu className={style.notifList} items={items} />;

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
          <Link href="/auth/login">{"Login"}</Link>
        </Button>
      ) : (
        <div className={style.rightDiv}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Badge count={notif.length}>
              <BellFilled
                style={{
                  fontSize: "180%",
                  color: "var(--light-color)",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              />
            </Badge>
          </Dropdown>

          <Link href={"/profile/me"}>
            <a>
              <Avatar src={avatar} size={55} />
            </a>
          </Link>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
