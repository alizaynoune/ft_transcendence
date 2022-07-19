import style from "./historyMessengerGroupCard.module.css";

import { Avatar, Typography, Badge, List, Popover } from "antd";

interface Props {
  data: {
    groupName: string;
    users: {
      username: string;
      avatar: string;
    }[];
    lastMessage?: string;
    messageNotReade?: number;
  };
}

const { Text, Title } = Typography;
const ConversationGroupCard: React.FC<Props> = (props) => {
  const { groupName, users, lastMessage, messageNotReade } = props.data;

  const mapUsers = () => {
    return users.map((u, index) => {
      return (
          <Avatar key={u.username} size={45} src={u.avatar} />
      );
    });
  };

  return (
    <div className={style.card_items}>
      <div className={style.card_item}>
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
                <div className={style.users}>
                <Avatar.Group
                  maxCount={2}
                  size={45}
                  maxPopoverTrigger="click"
                  maxPopoverPlacement="bottom"
                >
                  {mapUsers()}
                </Avatar.Group>
                </div>
            
            }
            title={<Text strong>{groupName}</Text>}
            description={<Text type="secondary">{lastMessage}</Text>}
          />
        </List.Item>
        <div className={style.date}>28/10/1997</div>
      </div>
    </div>
  );
};

export default ConversationGroupCard;
