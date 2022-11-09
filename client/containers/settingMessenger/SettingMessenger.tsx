import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography, List, Modal, message, Divider, Popover, Form, Input } from "antd";
import { ConversationMemberType, ConversationsType, MessengerContextType } from "@/types/types";
import { useContext, useEffect, useState } from "react";
import Icon from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { TrashIcon, MuteIcon, OutIcon, SpeakerIcon, Settings2Icon, BlockUserIcon } from "@/icons/index";
import ConversationFromSettings from "@/components/conversationSettingsForm/ConversationFormSettings";
import Link from "next/link";
import axios from "@/config/axios";
import { MessengerContext } from "context/massengerContext";

type PropsType = {
  conversation: ConversationsType;
};

const SettingMessenger: React.FC = () => {
  const { intra_id } = useAppSelector(selectAuth);
  const [members, setMembers] = useState<ConversationMemberType[]>([]);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  const { currentConversation } = useContext(MessengerContext) as MessengerContextType;

  useEffect(() => {
    console.log(currentConversation);
    if (!currentConversation) return;
    setMembers(currentConversation.members.filter((m) => m.userid !== intra_id));
    setMyInfo(currentConversation.members.find((m) => m.userid === intra_id));
  }, [currentConversation]);

  const leaveConversation = () => {
    console.log("leave");
    Modal.confirm({
      title: "Are you sure to leave this conversation",
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log("Oops errors!3");
        }
      },
      onCancel() {},
    });
  };

  const deleteConversation = () => {
    console.log("leave");
    if (!currentConversation) return;
    Modal.confirm({
      title: "Are you sure to delete this conversation",
      async onOk() {
        try {
          const res = await axios.put("conversation/leave", { conversationId: currentConversation.id });
          console.log(res);
          message.success("success leave");
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
      onCancel() {},
    });
  };
  const deleteUser = () => {
    console.log("leave");
    Modal.confirm({
      title: "Are you sure to delete this user from conversation",
      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log("Oops errors!1");
        }
      },
      onCancel() {},
    });
  };

  const toggleMuteUser = () => {
    console.log("leave");
    Modal.confirm({
      title: "Are you sure to delete this toggle mute user conversation",
      async onOk() {
        try {
          // put conversation/togglemute
          //   {
          //     "conversationId": 2,
          //     "memberId": 2,
          //     "mute": false
          // }
          return await new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          });
        } catch {
          return console.log("Oops errors!2");
        }
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    console.log("redering settings message");
  }, []);

  return currentConversation ? (
    <div className={style.container}>
      {currentConversation.type !== "GROUP" && (
        <Avatar
          style={{
            marginBottom: "-35px",
            zIndex: 2,
          }}
          src={members[0]?.users.img_url}
          size={70}
        />
      )}
      {currentConversation.title && currentConversation.type === "GROUP" && (
        <Divider>
          <Typography.Text strong type="success">
            {currentConversation.title}
          </Typography.Text>
        </Divider>
      )}
      <Card
        className={style.card}
        title={
          myInfo ? (
            <Space>
              {currentConversation.type === "GROUP" && <Avatar src={myInfo.users.img_url} size="large" />}
              <Space direction="vertical" align={currentConversation.type === "GROUP" ? "start" : "center"}>
                {currentConversation.type === "GROUP" ? (
                  <>
                    <Space>
                      <Typography.Text strong>{myInfo.users.username}</Typography.Text>
                      {myInfo.isadmin && <Typography.Text type="success">{"admin"}</Typography.Text>}
                    </Space>
                    <Typography.Text type="secondary">{myInfo.users.email}</Typography.Text>
                  </>
                ) : (
                  <>
                    <Typography.Text strong>
                      {<Link href={`/profile/${members[0].users.username}`}>{members[0].users.username}</Link>}
                    </Typography.Text>
                    <Typography.Text type="secondary">{members[0].users.email}</Typography.Text>
                  </>
                )}
              </Space>
            </Space>
          ) : // </Space>
          null
        }
        extra={
          currentConversation.type === "GROUP" ? (
            <Popover trigger="click" placement="bottomRight" content={<ConversationFromSettings />}>
              <Button type="primary" shape="circle" icon={<Icon component={Settings2Icon} style={{ fontSize: "15px" }} />} />
            </Popover>
          ) : null
        }
      >
        {currentConversation.type === "GROUP" ? (
          <List
            className={style.FriendsList}
            itemLayout="horizontal"
            dataSource={members}
            renderItem={(item) => (
              <List.Item
                extra={
                  myInfo?.isadmin ? (
                    <Space direction="vertical">
                      <Button
                        type="primary"
                        danger
                        icon={<Icon component={TrashIcon} style={{ fontSize: "16px" }} />}
                        onClick={deleteUser}
                      ></Button>
                      <Button
                        type="ghost"
                        icon={<Icon component={!item.mute ? MuteIcon : SpeakerIcon} style={{ fontSize: "16px" }} />}
                        onClick={toggleMuteUser}
                      ></Button>
                    </Space>
                  ) : null
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.users.img_url} size="large" />}
                  title={<Link href={`/profile/${item.users.username}`}>{item.users.username}</Link>}
                  description={item.users.email}
                />
              </List.Item>
            )}
          />
        ) : (
          <Space direction="vertical">
            <Button
              type="primary"
              danger
              icon={<Icon component={TrashIcon} style={{ fontSize: "130%" }} />}
              onClick={deleteConversation}
            >
              {"delete conversation"}
            </Button>
          </Space>
        )}
      </Card>
    </div>
  ) : null;
};

export default SettingMessenger;
