import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography } from "antd";

import { ConversationsType } from "@/types/types";
import { ReactNode, useEffect } from "react";
import Icon from "@ant-design/icons";

import SettingIcon from "@/icons/Settings2.svg";
import UserIcon from "@/icons/user.svg";
import InvetGameIcon from "@/icons/PlayGame.svg";
import LevelIcon from "@/icons/level.svg";
import TrashIcon from "@/icons/Trash.svg";
import BlockIcon from "@/icons/BlockUser.svg";
import SpeakerIcon from "@/icons/speaker.svg";
import MuteIcon from "@/icons/mute.svg";
import SettingsIcon from "@/icons/Setting.svg";

import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import type {UserType} from '@/types/types'
type PropsType = {
  conversation: ConversationsType;
};

const CardGridStyle: React.CSSProperties = {
  width: "100%",
  cursor: "pointer",
  color: "var(--secondary-color)",
};

const CardGrid = (icon: any, label: string) => {
  return (
    <Card.Grid style={CardGridStyle}>
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
    icon: InvetGameIcon,
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
    icon: BlockIcon,
  },
  {
    lable: "Mute",
    icon: SpeakerIcon,
  },
];

const getCardGridItem = () => {
  return CardSettingText.map((i) => CardGrid(i.icon, i.lable));
};

const CardMembers = (members:UserType[]) => {
  return members.map(m =>
    <Card.Grid style={CardGridStyle}>
      <Space>
        <Avatar src={m.avatar} size='large' />
        <Space direction="vertical">
          <Typography.Text>{m.name.username}</Typography.Text>
          <Typography.Text type="secondary">{m.email}</Typography.Text>
        </Space>
      </Space>
    </Card.Grid>
    )
}

const SettingMessenger: React.FC<PropsType> = ({ conversation }) => {
  useEffect(() => {
    console.log(conversation.id);
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
            <Space direction="vertical" align={conversation.type === 'group' ? "start" : 'center'}>
              
              <Typography.Text strong>
                {conversation.type === "group"
                  ? conversation.name
                  : conversation.members[1].name.username}
              </Typography.Text>
              <Typography.Text type="secondary">
                {conversation.members[1].email}
              </Typography.Text>
            </Space>
          </Space>
        }
        extra={
          conversation.type === "group" ? (
            <Button type="link" ghost icon={<Icon component={SettingIcon} />} />
          ) : null
        }
      >
        {conversation.type === 'group' ? CardMembers(conversation.members) : getCardGridItem()}
      </Card>
    </div>
  );
};

export default SettingMessenger;
