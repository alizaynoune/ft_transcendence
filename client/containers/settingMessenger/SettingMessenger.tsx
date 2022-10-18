import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography, Popover } from "antd";
import { ConversationsType } from "@/types/types";
import { useEffect } from "react";
import Icon from "@ant-design/icons";

import {
  Settings2Icon,
  UserIcon,
  PlayGameIcon,
  LevelIcon,
  TrashIcon,
  BlockUserIcon,
  MuteIcon,
  OutIcon,
} from "@/icons/index";
import type { UserType } from "@/types/types";
import Item from "antd/lib/list/Item";
type PropsType = {
  conversation: ConversationsType;
};

const CardGridStyle: React.CSSProperties = {
  width: "100%",
  cursor: "pointer",
  color: "var(--secondary-color)",
};

const CardGrid = (
  item: { lable: string; icon: any; hoverable: boolean },
  key: number,
  id: string
) => {
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

const getCardGridItem = (id: string) => {
  return CardSettingText.map((i, key) => CardGrid(i, key, id));
};

const handelClick = (id: string) => {
  console.log(id);
};

const CardMembers = (members: UserType[]) => {
  return members.map((m, key) => (
    <Popover
      key={key}
      content={
        <>
          {getCardGridItem(m.id)}
          {CardGrid(
            { lable: "Delete user", icon: TrashIcon, hoverable: true },
            1,
            m.id
          )}
        </>
      }
      title={
        <Space>
          <Avatar src={m.avatar} size="large" />
          <Space direction="vertical">
            <Typography.Text>{m.name.username}</Typography.Text>
            <Typography.Text type="secondary">{m.email}</Typography.Text>
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
          <Avatar src={m.avatar} size="large" />
          <Space direction="vertical">
            <Typography.Text>{m.name.username}</Typography.Text>
            <Typography.Text type="secondary">{m.email}</Typography.Text>
          </Space>
        </Space>
      </Card.Grid>
    </Popover>
  ));
};

const SettingMessenger: React.FC<PropsType> = ({ conversation }) => {

  return (
    <div className={style.container}>
      {conversation.type !== "group" && (
        <Avatar
          style={{
            marginBottom: "-35px",
            zIndex: 2,
          }}
          src={conversation.members[1].avatar}
          size={70}
        />
      )}
      <Card
        className={style.card}
        title={
          <Space>
            {conversation.type === "group" && (
              <Avatar src={conversation.members[0].avatar} size="large" />
            )}
            <Space
              direction="vertical"
              align={conversation.type === "group" ? "start" : "center"}
            >
              {conversation.type === "group" ? (
                <Space>
                  <Typography.Text strong>
                    {conversation.members[1].name.username}
                  </Typography.Text>
                  <Typography.Text type="success">{"admin"}</Typography.Text>
                </Space>
              ) : (
                <Typography.Text strong>
                  {conversation.members[1].name.username}
                </Typography.Text>
              )}

              <Typography.Text type="secondary">
                {conversation.members[1].email}
              </Typography.Text>
            </Space>
          </Space>
        }
        extra={
          conversation.type === "group" ? (
            <Popover
              placement="bottomRight"
              content={
                <>
                  {CardGrid(
                    { lable: "Leave group", icon: OutIcon, hoverable: true },
                    0,
                    conversation.id
                  )}
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
        {conversation.type === "group" ? (
          CardMembers(conversation.members)
        ) : (
          <>
            {getCardGridItem(conversation.members[1].id)}
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
