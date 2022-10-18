import style from "./notifications.module.css";
import moment from "moment";
import { Dropdown, Menu, Space, Typography, Avatar, Badge, Modal, message } from "antd";
import Icon, { BellFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, pushNotification, readNotification } from "@/reducers/auth";
import { useEffect, useState } from "react";
import { NotificationType } from "@/types/types";
import { useRouter } from "next/router";
import axios from "@/config/axios";

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
  const router = useRouter();

  const handelGameRequest = (request: NotificationType) => {
    console.log(request);
    Modal.confirm({
      title: `${request.users_notification_fromidTousers.username} ${request.content}`,
      okText: "Accepte",
      okButtonProps: { type: "primary" },
      cancelText: "Reject",
      cancelButtonProps: { danger: true, type: "primary" },
      async onOk() {
        try {
          const res = await axios.put("/game/invite/accepte", { inviteId: request.targetid });
          router.push(`/game/${res.data.gameid}`);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
      async onCancel() {
        try {
          const res = await axios.delete("/game/invite/reject", { data: { inviteId: request.targetid } });
          message.success(res.data.message);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
    });
  };

  useEffect(() => {
    setNotificationsList(notifications);
  }, [notifications]);
  const items: MenuItem[] = notificationsList?.map((i) =>
    getItem(
      <Space>
        <Space direction="vertical">
          <Text strong>{i.users_notification_fromidTousers.username}</Text>
          <Text type="secondary">{i.content}</Text>
        </Space>
        <Text type="secondary">{moment(i.createdat).fromNow()}</Text>
      </Space>,
      i.read,
      i.id,
      <Badge
        dot
        status={
          i.users_notification_fromidTousers.status === "ONLINE"
            ? "success"
            : i.users_notification_fromidTousers.status === "PLAYING"
            ? "warning"
            : "error"
        }
      >
        <Avatar src={i.users_notification_fromidTousers.img_url} />
      </Badge>
    )
  );
  const menu = (
    <Menu
      className={style.notifList}
      items={items}
      onClick={(e) => {
        const n = notifications.find((n) => n.id === Number(e.key));
        if (n && n.type === "FRIEND_REQUEST") router.push(`/profile/${n.users_notification_fromidTousers.username}`);
        // dispatch(readNotification(e.key));
        else if (n && n.type === "GAME_INVITE") handelGameRequest(n);
      }}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} disabled={notifications.filter((n) => !n.read).length ? false : true}>
      <Badge count={notifications.filter((n) => !n.read).length}>
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
