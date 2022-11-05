import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography, Popover } from "antd";
import { ConversationMemberType, ConversationsType, MessageTextType } from "@/types/types";
import { useEffect, useState } from "react";
import Icon from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { Settings2Icon, UserIcon, PlayGameIcon, LevelIcon, TrashIcon, BlockUserIcon, MuteIcon, OutIcon } from "@/icons/index";
type PropsType = {
  conversation: ConversationsType;
};

const CardGridStyle: React.CSSProperties = {
  width: "100%",
  cursor: "pointer",
  color: "var(--secondary-color)",
};

const CardGrid = (item: { lable: string; icon: any; hoverable: boolean }, key: number, id: number) => {
  return (
    <Card.Grid
      style={CardGridStyle}
      key={key}
      hoverable={item.hoverable}
      onClick={(e) => {
        if (item.hoverable) console.log(item.lable, id);
      }}
    >
      <Space>
        <Icon component={item.icon} style={{ fontSize: "130%" }} />
        <Typography.Text>{item.lable}</Typography.Text>
      </Space>
    </Card.Grid>
  );
};

const CardSettingText = [
  {
    lable: "Level 42",
    icon: LevelIcon,
    hoverable: false,
  },
  {
    lable: "View profile",
    icon: UserIcon,
    hoverable: true,
  },
  {
    lable: "Invet to play a game",
    icon: PlayGameIcon,
    hoverable: true,
  },
  {
    lable: "Block",
    icon: BlockUserIcon,
    hoverable: true,
  },
  {
    lable: "Mute",
    icon: MuteIcon,
    hoverable: true,
  },
];

const getCardGridItem = (id: number) => {
  return CardSettingText.map((i, key) => CardGrid(i, key, id));
};

const handelClick = (id: number) => {
  console.log(id);
};

const CardMembers = (members: ConversationMemberType[]) => {
  return members.map((m, key) => (
    <Popover
      key={key}
      content={
        <>
          {getCardGridItem(m.users.id)}
          {CardGrid({ lable: "Delete user", icon: TrashIcon, hoverable: true }, 1, m.id)}
        </>
      }
      title={
        <Space>
          <Avatar src={m.users.img_url} size="large" />
          <Space direction="vertical">
            <Typography.Text>{m.users.username}</Typography.Text>
            <Typography.Text type="secondary">{m.users.email}</Typography.Text>
          </Space>
        </Space>
      }
      trigger="click"
      onOpenChange={(e) => {
        console.log(e);
      }}
    >
      <Card.Grid style={CardGridStyle} onClick={(e) => handelClick(m.id)}>
        <Space>
          <Avatar src={m.users.img_url} size="large" />
          <Space direction="vertical">
            <Typography.Text>{m.users.username}</Typography.Text>
            <Typography.Text type="secondary">{m.users.email}</Typography.Text>
          </Space>
        </Space>
      </Card.Grid>
    </Popover>
  ));
};

const SettingMessenger: React.FC<PropsType> = ({ conversation }) => {
  const { intra_id } = useAppSelector(selectAuth);
  const [members, setMembers] = useState<ConversationMemberType[]>([]);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();

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
                  <Space>
                    <Typography.Text strong>{myInfo.users.username}</Typography.Text>
                    {conversation.adminid === intra_id && <Typography.Text type="success">{"admin"}</Typography.Text>}
                  </Space>
                ) : (
                  <Typography.Text strong>{myInfo.users.username}</Typography.Text>
                )}

                <Typography.Text type="secondary">{myInfo.users.email}</Typography.Text>
              </Space>
            </Space>
          ) : null
        }
        extra={
          conversation.type === "GROUP" ? (
            <Popover
              placement="bottomRight"
              content={
                <>
                  {CardGrid({ lable: "Leave group", icon: OutIcon, hoverable: true }, 0, conversation.id)}
                  {CardGrid(
                    {
                      lable: "Delete conversation",
                      icon: TrashIcon,
                      hoverable: true,
                    },
                    1,
                    conversation.id
                  )}
                </>
              }
              trigger="click"
              onOpenChange={(e) => {
                console.log(e);
              }}
            >
              <Button type="link" icon={<Icon component={Settings2Icon} />} />
            </Popover>
          ) : null
        }
      >
        {conversation.type === "GROUP" ? (
          CardMembers(members)
        ) : (
          <>
            {getCardGridItem(conversation.members[0].id)}
            {CardGrid(
              {
                lable: "Delete conversation",
                icon: TrashIcon,
                hoverable: true,
              },
              1,
              conversation.id
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default SettingMessenger;
