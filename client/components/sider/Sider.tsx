import style from "./sider.module.css";
import React, { useState, useRef } from "react";
import { Layout, Menu, MenuProps, Badge } from "antd";
import Icon from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/reducers/auth";

// Icons
import {
  UserIcon,
  MessageIcon,
  AchievementsIcon,
  GameIcon,
  OutIcon,
  NewGameIcon,
  MenuOpenIcon,
  MenuCloseIcon
} from "@/icons/index";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href="/profile/me">{"Profile"}</Link>,
    "profile",
    <Icon
      component={UserIcon}
      style={{ fontSize: "180%", color: "var(--light-color)" }}
    />
  ),
  getItem(
    <Link href="/messenger">{"Messenger"}</Link>,
    "messenger",
    <Badge dot offset={[-2, 4]}>
      <Icon
        component={MessageIcon}
        style={{ fontSize: "180%", color: "var(--light-color)" }}
      />
    </Badge>
  ),
  getItem(
    <Link href="/achievements">{"Achievements"}</Link>,
    "achievements",
    <Icon
      component={AchievementsIcon}
      style={{ fontSize: "180%", color: "var(--light-color)" }}
    />
  ),
  getItem(
    <Link href="/game/current">{"Current Games"}</Link>,
    "game",
    <Icon
      component={GameIcon}
      style={{ fontSize: "180%", color: "var(--light-color)" }}
    />
  ),
  getItem(
    <Link href="/game/new">{"Create Game"}</Link>,
    "gameNew",
    <Icon
      component={NewGameIcon}
      style={{ fontSize: "180%", color: "var(--light-color)" }}
    />
  ),
];

const SiderLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useAppDispatch();
  return (
    <div className={style.container}>
      <Sider
        className={style.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={style.trigger}>
          <Icon
            component={collapsed ? MenuOpenIcon : MenuCloseIcon}
            style={{
              fontSize: '40px'
            }}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <div className={style.siderItems}>
          <Menu
            className={style.menu}
            theme="dark"
            mode="inline"
            items={items}
          />
          <Menu
            className={style.menu}
            theme="dark"
            mode="inline"
            onClick={(e) => {
              dispatch(logout());
            }}
            items={[
              getItem(
                "logout",
                "1",
                <Icon
                  component={OutIcon}
                  style={{ fontSize: "180%", color: "var(--light-color)" }}
                />
              ),
            ]}
          />
        </div>
      </Sider>
    </div>
  );
};

export default SiderLayout;
