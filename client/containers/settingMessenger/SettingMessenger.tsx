import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography, List, Modal, message, Divider, Popover } from "antd";
import { ConversationMemberType, MessengerContextType } from "@/types/types";
import { SetStateAction, useContext, useEffect, useState } from "react";
import Icon, { LogoutOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { TrashIcon, Settings2Icon, DotsVIcon } from "@/icons/index";
import ConversationFromSettings from "@/components/conversationSettingsForm/ConversationFormSettings";
import ConversationMembersActions from "@/components/ConversationMembersActions/ConversationMembersActions";
import Link from "next/link";
import { MessengerContext } from "context/massengerContext";
import ModalInviteGame from "@/components/modalInviteGame/ModalInviteGame";
import { useRouter } from "next/router";

const SettingMessenger: React.FC = () => {
  const { intra_id } = useAppSelector(selectAuth);
  const [members, setMembers] = useState<ConversationMemberType[]>([]);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { currentConversation, leaveConversation, deleteConversation } = useContext(MessengerContext) as MessengerContextType;
  const router = useRouter();
  useEffect(() => {
    if (!currentConversation) return;
    setMembers(currentConversation.members.filter((m) => m.userid !== intra_id));
    setMyInfo(currentConversation.members.find((m) => m.userid === intra_id));
  }, [currentConversation]);

  const ConfirmleaveConversation = () => {
    Modal.confirm({
      title: "Are you sure to leave this conversation",
      async onOk() {
        try {
          const res = (await leaveConversation()) as { message: string };
          message.success(res.message);
          router.push("/messenger/");
        } catch (error: any) {
          message.error(error instanceof Error ? error.message : error);
        }
      },
      onCancel() {},
    });
  };

  const ConfirmDeleteConversation = () => {
    if (!currentConversation) return;
    Modal.confirm({
      title: `Are you sure to delete this conversation "${currentConversation?.title}"`,
      async onOk() {
        try {
          const res = (await deleteConversation()) as { message: string };
          message.success(res.message);
          router.push("/messenger/");
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  return currentConversation && myInfo ? (
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
                      {myInfo.isadmin && <Typography.Text type="success">{"Admin"}</Typography.Text>}
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
          ) : null
        }
        extra={
          currentConversation.type === "GROUP" ? (
            <Space direction="vertical">
              <Button type="primary" danger ghost icon={<LogoutOutlined />} onClick={ConfirmleaveConversation}></Button>
              {myInfo.isadmin && (
                <Popover
                  open={openPopover}
                  placement="bottomRight"
                  content={
                    <ConversationFromSettings
                      setOpenPopover={(value: SetStateAction<boolean>): void => {
                        setOpenPopover(value);
                      }}
                    />
                  }
                >
                  <Button
                    type="primary"
                    ghost
                    icon={<Icon component={Settings2Icon} style={{ fontSize: "15px" }} />}
                    onClick={() => setOpenPopover(!openPopover)}
                  />
                </Popover>
              )}
            </Space>
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
                actions={[item.isadmin && <Typography.Text type="success">{"Admin"}</Typography.Text>]}
                extra={
                  myInfo?.isadmin && item.active ? (
                    <Popover trigger="click" placement="left" content={<ConversationMembersActions member={item} />}>
                      <Button ghost type="primary" icon={<Icon component={DotsVIcon} style={{ fontSize: "16px" }} />} />
                    </Popover>
                  ) : (
                    <ModalInviteGame user={item.users} buttonProps={{ type: "primary", ghost: true }} />
                  )
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
        ) : currentConversation.id ? (
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Button
              type="primary"
              danger
              icon={<Icon component={TrashIcon} style={{ fontSize: "130%" }} />}
              onClick={ConfirmDeleteConversation}
            >
              {"delete conversation"}
            </Button>
          </Space>
        ) : null}
      </Card>
    </div>
  ) : null;
};

export default SettingMessenger;
