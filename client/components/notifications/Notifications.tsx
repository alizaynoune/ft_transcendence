import style from "./notifications.module.css";
import moment from "moment";
import { Dropdown, Space, Typography, Avatar, Badge, Modal, message, notification } from "antd";
import { BellFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, pushNotification, readNotification, setNotifications } from "@/reducers/auth";
import { useEffect } from "react";
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
  const notificationsList = useAppSelector(selectAuth).notifications;
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

  const handelGameRequest = (request: NotificationType) => {
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

  const openNotification = (notif: NotificationType) => {
    
    if (notif.type === "FRIEND_REQUEST") {
      socket.emit("readNotification", { id: notif.id });
      dispatch(readNotification(notif.id));
      router.push(`/profile/${notif.users_notification_fromidTousers.username}`);
    } else if (notif.type === "GAME_INVITE") handelGameRequest(notif);
    else if (notif.type === "GAME_ACCEPTE") {
      socket.emit("readNotification", { id: notif.id });
      dispatch(readNotification(notif.id));
      router.push(`/game/${notif.targetid}`);
    }
  };

  useEffect(() => {
    getNotifications();
    socket.on("error_notification", (error) => {
      message.error(error.message);
    });
    socket.on("newNotification", (data: NotificationType) => {
      dispatch(pushNotification(data));
      notification.open({
        key: data.id.toString(),
        message: data.type,
        description: `${data.users_notification_fromidTousers.username} ${data.content}`,
        onClick: () => {
          openNotification(data);
          notification.close(data.id.toString());
        },
      });
    });
    return () => {
      socket.off("error_notification");
      socket.off("newNotification");
    };
  }, []);

  const items: MenuItem[] = notificationsList?.map((i) =>
    getItem(
      <Space>
        <Space direction="vertical">
          <Text strong>{i.users_notification_fromidTousers.username}</Text>
          <Text type="secondary">{i.content}</Text>
        </Space>
        <Text type="secondary">{moment(i.created_at).fromNow()}</Text>
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

  const notifOnClick: MenuProps["onClick"] = (e) => {
    const n = notificationsList.find((n) => n.id === Number(e.key));
    if (n) openNotification(n);
  };

  return (
    <Dropdown
      overlayClassName={style.notifList}
      menu={{
        items,
        onClick: notifOnClick,
      }}
      trigger={["click"]}
      disabled={notificationsList.length ? false : true}
    >
      <Badge count={notificationsList.filter((n) => !n.read).length}>
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
