import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography, List } from "antd";
import { ConversationMemberType, ConversationsType } from "@/types/types";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { TrashIcon, MuteIcon, OutIcon, SpeakerIcon } from "@/icons/index";
import Link from "next/link";
type PropsType = {
  conversation: ConversationsType;
};

const SettingMessenger: React.FC<PropsType> = ({ conversation }) => {
  const { intra_id } = useAppSelector(selectAuth);
  const [members, setMembers] = useState<ConversationMemberType[]>([]);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  // const [admin, setAdmin] = useState<ConversationMemberType>()

  useEffect(() => {
    console.log(conversation);
    setMembers(conversation.members.filter((m) => m.userid !== intra_id));
    setMyInfo(conversation.members.find((m) => m.userid === intra_id));
  }, [conversation]);

  return (
    <div className={style.container}>
      {conversation.type !== "GROUP" && (
        <Avatar
          style={{
            marginBottom: "-35px",
            zIndex: 2,
          }}
          src={members[0]?.users.img_url}
          size={70}
        />
      )}
      <Card
        className={style.card}
        title={
          myInfo ? (
            <Space>
              {conversation.type === "GROUP" && <Avatar src={myInfo.users.img_url} size="large" />}
              <Space direction="vertical" align={conversation.type === "GROUP" ? "start" : "center"}>
                {conversation.type === "GROUP" ? (
                  <>
                    <Space>
                      <Typography.Text strong>{myInfo.users.username}</Typography.Text>
                      {conversation.adminid === intra_id && <Typography.Text type="success">{"admin"}</Typography.Text>}
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
        extra={conversation.type === "GROUP" ? <Icon component={OutIcon} style={{ fontSize: "20px" }} /> : null}
      >
        {conversation.type === "GROUP" ? (
          <List
            className={style.FriendsList}
            itemLayout="horizontal"
            dataSource={members}
            renderItem={(item) => (
              <List.Item
                extra={
                  conversation.adminid === intra_id ? (
                    <Space direction="vertical">
                      <Button type="primary" danger icon={<Icon component={TrashIcon} style={{ fontSize: "16px" }} />}></Button>
                      <Button
                        type="ghost"
                        icon={<Icon component={!item.mute ? MuteIcon : SpeakerIcon} style={{ fontSize: "16px" }} />}
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
            <Button type="primary" danger icon={<Icon component={TrashIcon} style={{ fontSize: "130%" }} />}>
              {"delete conversation"}
            </Button>
          </Space>
        )}
      </Card>
    </div>
  );
};

export default SettingMessenger;
