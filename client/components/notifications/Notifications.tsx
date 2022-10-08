import style from "./notifications.module.css";
import moment from "moment";
import { Dropdown, Menu, Space, Typography, Avatar, Badge } from "antd";
import Icon, { BellFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, pushNotification, readNotification } from "@/reducers/auth";
import { useEffect, useState } from "react";
import { NotificationType } from "@/types/types";
import Link from "next/link";

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
const Notifications: React.FC = () => {
  const [notificationsList, setNotificationsList] = useState<NotificationType[]>([]);
  const { notifications } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNotificationsList(notifications);
  }, [notifications]);
  const items: MenuItem[] = notificationsList?.map((i) =>
    getItem(
      <Space>
        {/* <Link href={`/profile/${i.users_notification_fromidTousers.username}`}>
          <a> */}
            <Space direction="vertical">
              <Text strong>{i.users_notification_fromidTousers.username}</Text>
              <Text type="secondary">{"Invet you to play a game"}</Text>
            </Space>
            <Text type="secondary">{moment(i.createdat).fromNow()}</Text>
          {/* </a>
        </Link> */}
      </Space>,
      i.read,
      i.id,
      <Avatar src={i.users_notification_fromidTousers.img_url} />
    )
  );
  const menu = (
    <Menu
      className={style.notifList}
      items={items}
      onClick={(e) => {
        dispatch(readNotification(e.key));
      }}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} disabled={notifications.length ? false : true}>
      <Badge count={notifications.length}>
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
  );
};

export default Notifications;
