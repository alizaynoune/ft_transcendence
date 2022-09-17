import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography } from "antd";

import { ConversationsType } from "@/types/types";
import { ReactNode, useEffect } from "react";
import Icon from "@ant-design/icons";

import {
  Settings2Icon,
  UserIcon,
  PlayGameIcon,
  LevelIcon,
  TrashIcon,
  BlockUserIcon,
  SpeakerIcon,
  MuteIcon,
  SettingIcon,
} from "@/icons/index";

import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import type { UserType } from "@/types/types";
type PropsType = {
  conversation: ConversationsType;
};

const CardGridStyle: React.CSSProperties = {
  width: "100%",
  cursor: "pointer",
  color: "var(--secondary-color)",
};

const CardGrid = (icon: any, label: string, key: number) => {
  return (
    <Card.Grid style={CardGridStyle} key={key}>
      <Space>
        <Icon component={icon} style={{ fontSize: "130%" }} />
        <Typography.Text>{label}</Typography.Text>
      </Space>
    </Card.Grid>
  );
};

const CardSettingText = [
  {
    lable: "View profile",
    icon: UserIcon,
  },
  {
    lable: "Invet to play a game",
    icon: PlayGameIcon,
  },
  {
    lable: "Level 42",
    icon: LevelIcon,
  },
  {
    lable: "Delete conversation",
    icon: TrashIcon,
  },
  {
    lable: "Block",
    icon: BlockUserIcon,
  },
  {
    lable: "Mute",
    icon: SpeakerIcon,
  },
];

const getCardGridItem = () => {
  return CardSettingText.map((i, key) => CardGrid(i.icon, i.lable, key));
};

const handelClick = (id: string) => {
//console.log(id);
};

const CardMembers = (members: UserType[]) => {
  return members.map((m, key) => (
    <Card.Grid
      style={CardGridStyle}
      key={key}
      onClick={(e) => handelClick(m.id)}
    >
      <Space>
        <Avatar src={m.avatar} size="large" />
        <Space direction="vertical">
          <Typography.Text>{m.name.username}</Typography.Text>
          <Typography.Text type="secondary">{m.email}</Typography.Text>
        </Space>
      </Space>
    </Card.Grid>
  ));
};

const SettingMessenger: React.FC<PropsType> = ({ conversation }) => {
  useEffect(() => {
//console.log(conversation.id);
  }, [conversation]);

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
                  {" "}
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
            <Button
              type="link"
              icon={<Icon component={Settings2Icon} />}
            />
          ) : null
        }
      >
        {conversation.type === "group"
          ? CardMembers(conversation.members)
          : getCardGridItem()}
      </Card>
    </div>
  );
};

export default SettingMessenger;
