import style from "./userCard.module.css";
import { List, Avatar, Button, Popover } from "antd";
import Icon, { CloseOutlined, CheckOutlined } from "@ant-design/icons";

// Icons
import {
  DotsVIcon,
  DeleteUserIcon,
  BlockUserIcon,
  MessageIcon,
  PlayGameIcon,
} from "@/icons/index";

interface DataType {
  id: number,
  intra_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  img_url: string;
  cover: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  type: "friend" | "request" | "block";
  user: DataType;
  action : (id: number, action: string) => void;
}

const deleteFriend = (id: number) => {
console.log(id);
};

const RequestButtons = (id: number, action: (id: number, action: string) => void) => (
  <div className={style.actionContainer}>
    <Button
      ghost
      danger
      type="primary"
      icon={<CloseOutlined />}
      onClick={() => action(id, 'rejectrequest')}
    />
    <Button
      ghost
      type="primary"
      icon={<CheckOutlined />}
      onClick={() => action(id, 'acceptrequest')}
    />
  </div>
);

const FriendButtons = (id: number) => (
  <div className={style.actionContainer}>
    <Button
      ghost
      type="primary"
      icon={<Icon component={MessageIcon} style={{ fontSize: "120%" }} />}
      onClick={() => deleteFriend(id)}
    />
    <Button
      ghost
      type="primary"
      icon={<Icon component={PlayGameIcon} style={{ fontSize: "120%" }} />}
      onClick={() => deleteFriend(id)}
    />
    <Button
      ghost
      type="primary"
      icon={<Icon component={BlockUserIcon} style={{ fontSize: "120%" }} />}
      onClick={() => deleteFriend(id)}
    />
    <Button
      ghost
      type="primary"
      icon={<Icon component={DeleteUserIcon} style={{ fontSize: "120%" }} />}
      onClick={() => deleteFriend(id)}
    />
  </div>
);

const BlockButtons = (id: number) => (
  <div className={style.actionContainer}>
    <Button type="primary" onClick={() => deleteFriend(id)}>
      {"Unblock"}
    </Button>
  </div>
);

const UserCard: React.FC<Props> = (props) => {
  const { type, user } = props;

  return (
    <List.Item
      className={style.item}
      key={user.intra_id}
      actions={[
        <Popover
          content={
            type === "friend"
              ? FriendButtons(user.intra_id)
              : type === "request"
              ? RequestButtons(user.intra_id, props.action)
              : BlockButtons(user.intra_id)
          }
          trigger="click"
          placement="left"
        >
          <Icon component={DotsVIcon} style={{ fontSize: "140%" }} />
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={user.img_url} size="large" />}
        title={`${user.first_name} ${user.last_name}`}
        description={user.username}
      />
    </List.Item>
  );
};

export default UserCard;
