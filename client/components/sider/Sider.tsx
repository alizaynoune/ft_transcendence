import style from "./sider.module.css";
import React, { useState, useEffect } from "react";
import { Layout, Menu, MenuProps, message } from "antd";
import Icon, { HomeFilled } from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/reducers/auth";
import { useRouter } from "next/router";
import Socket from "@/config/socket";

// Icons
import {
  UserIcon,
  MessageIcon,
  AchievementsIcon,
  GameIcon,
  OutIcon,
  NewGameIcon,
  MenuOpenIcon,
  MenuCloseIcon,
} from "@/icons/index";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
interface PropsType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href="/">{"Home"}</Link>,
    "Home",
    <HomeFilled
      style={{
        fontSize: 25,
        color: "var(--light-color)",
      }}
    />
  ),
  getItem(
    <Link href="/profile/me">{"Profile"}</Link>,
    "profile",
    <Icon component={UserIcon} style={{ fontSize: 25, color: "var(--light-color)" }} />
  ),
  getItem(
    <Link href="/messenger">{"Messenger"}</Link>,
    "messenger",
    <Icon component={MessageIcon} style={{ fontSize: 25, color: "var(--light-color)" }} />
  ),
  getItem(
    <Link href="/achievements">{"Achievements"}</Link>,
    "achievements",
    <Icon component={AchievementsIcon} style={{ fontSize: 25, color: "var(--light-color)" }} />
  ),
  getItem(
    <Link href="/game/current">{"Current Games"}</Link>,
    "game",
    <Icon component={GameIcon} style={{ fontSize: 25, color: "var(--light-color)" }} />
  ),
  getItem(
    <Link href="/game/new">{"Create Game"}</Link>,
    "gameNew",
    <Icon component={NewGameIcon} style={{ fontSize: 25, color: "var(--light-color)" }} />
  ),
  getItem("logout", "logout", <Icon component={OutIcon} style={{ fontSize: 25, color: "var(--light-color)" }} />),
];

const SiderLayout: React.FC<PropsType> = (props) => {
  const { collapsed, setCollapsed } = props;
  const [currentPage, setCurrentPage] = useState<string>("/");
  const dispatch = useAppDispatch();
  const route = useRouter();

  useEffect(() => {
    const split = route.asPath.split("/");
    if (split[1] === "game" && split[2] === "new") setCurrentPage("gameNew");
    else setCurrentPage(split[1]);
  }, [route]);

  return (
    <div className={`${style.container} ${!collapsed ? style.open : ""}`}>
      <Sider className={style.sider} trigger={null} collapsible collapsed={collapsed}>
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
        <div className={style.siderItems}>
          <Menu
            defaultSelectedKeys={[currentPage]}
            selectedKeys={[currentPage]}
            className={style.menu}
            theme="dark"
            mode="inline"
            items={items}
            onSelect={(e) => {
              if (e.key === "logout") {
                dispatch(logout());
                Socket.disconnect();
                route.push("/");
                message.warning("success logout");
              }
            }}
          />
        </div>
      </Sider>
    </div>
  );
};

export default SiderLayout;
