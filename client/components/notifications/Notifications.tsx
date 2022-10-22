import style from "./notifications.module.css";
import moment from "moment";
import { Dropdown, Menu, Space, Typography, Avatar, Badge, Modal, message } from "antd";
import Icon, { BellFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, pushNotification, readNotification, setNotifications } from "@/reducers/auth";
import { useEffect, useState } from "react";
import { NotificationType } from "@/types/types";
import { useRouter } from "next/router";
import axios from "@/config/axios";
import socket from "@/config/socket";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(label: React.ReactNode, disabled: Boolean, key?: React.Key | null, icon?: React.ReactNode): MenuItem {
  return {
    key,
    icon,
    disabled,
    label,
  } as MenuItem;
}
const { Text } = Typography;
const Notifications: React.FC = () => {
  const [notificationsList, setNotificationsList] = useState<NotificationType[]>([]);
  const { notifications } = useAppSelector(selectAuth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getNotifications = async () => {
    try {
      const res = await axios.get("/notifications/get");
      dispatch(setNotifications(res.data));
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    getNotifications();
    socket.on("error_notification", (error) => {
      message.error(error.message);
    });
    socket.on("newNotification", (data: NotificationType) => {
      message.info(`${data.users_notification_fromidTousers.username} ${data.content}`, 4);
      dispatch(pushNotification(data));
    });
    return () => {
      socket.off("error_notification");
      socket.off("newNotification");
    };
  }, []);

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
          message.success("success accepted");
          socket.emit("readNotification", { id: request.id });
          dispatch(readNotification(request.id));
          router.push(`/game/${res.data.gameid}`);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
      async onCancel() {
        try {
          const res = await axios.delete("/game/invite/reject", { data: { inviteId: request.targetid } });
          socket.emit("readNotification", { id: request.id });
          dispatch(readNotification(request.id));
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
        if (n && n.type === "FRIEND_REQUEST") {
          socket.emit("readNotification", { id: n.id });
          dispatch(readNotification(n.id));
          router.push(`/profile/${n.users_notification_fromidTousers.username}`);
        } else if (n && n.type === "GAME_INVITE") handelGameRequest(n);
        else if (n && n.type === "GAME_ACCEPTE") {
          socket.emit("readNotification", { id: n.id });
          dispatch(readNotification(n.id));
          router.push(`/game/${n.targetid}`);
        }
      }}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} disabled={notifications.length ? false : true}>
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
