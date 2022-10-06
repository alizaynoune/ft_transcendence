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
  message,
} from "antd";
import type { MenuProps } from "antd";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import { _42Icon } from "@/icons/index";
import { useEffect } from "react";

interface PropsType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  disabled: Boolean,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    disabled,
    children,
    label,
  } as MenuItem;
}

const { Text } = Typography;
const Header: React.FC<PropsType> = (props) => {
  const { collapsed, setCollapsed } = props;
  const { isAuth, img_url, notifications, error} = useAppSelector(selectAuth);

  useEffect(() => {
    error && message.error(error.message);
  }, [error]);
  useEffect(() => {
      // randomNotif();
  }, [isAuth]);

  const items: MenuItem[] = notifications?.map((i) =>
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
      <Avatar src={i.user.avatar} />
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
        <form method="GET" action={`${process.env.NEXT_PUBLIC_URL_API || 'http://localhost:5000'}/auth`}>
          <Button
            htmlType="submit"
            shape="round"
            ghost
            icon={<Icon component={_42Icon} style={{ fontSize: 20 }} />}
          >
            Login
          </Button>
        </form>
      ) : (
        <div className={style.rightDiv}>
          <Dropdown overlay={menu} trigger={["click"]} disabled={notifications.length ? false :true}>
            <Badge count={ notifications.length}>
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
              <Avatar src={img_url} size={55} />
            </a>
          </Link>
        </div>
      )}
    </Layout.Header>
  );
};

export default Header;
