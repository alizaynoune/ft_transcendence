import style from "./historyMessengerCard.module.css";

import { Avatar, Typography, Badge, List, Popover } from "antd";
import Link from "next/link";

interface Props {
    username: string
    avatar: string
    lastMessage?: string
    messageNotReade?: number
}

const { Text, Title } = Typography;
const ConversationCard: React.FC<Props> = (props) => {
    const {username, avatar, lastMessage, messageNotReade} = props
  return (
    <div className={style.card}>
      <List.Item
        className={style.cardBody}
        actions={[
          <Badge
            count={messageNotReade}
            style={{
              backgroundColor: "var(--primary-color)",
            }}
          />,
        ]}
      >
        <List.Item.Meta
          avatar={
            <Badge dot offset={[-6, 6]} color='var(--success-color)'>
              <Avatar size={45} src="/images/defaultProfileAvatar.jpg" />
            </Badge>
          }
          title={<Text strong>{username}</Text>}
          description={<Text type="secondary">{lastMessage}</Text>}
        />
      </List.Item>
    </div>
  );
};

export default ConversationCard;
