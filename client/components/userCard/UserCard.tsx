import style from "./userCard.module.css";
import { List, Avatar, Button, Popover } from "antd";
import Icon, { CloseOutlined, CheckOutlined } from "@ant-design/icons";

// Icons
import DotsVIcon from "@/icons/DotsV.svg";
import DeleteUserIcon from "@/icons/DeleteUser.svg";
import BlockUserIcon from "@/icons/BlockUser.svg";
import MessageIcon from "@/icons/message.svg";
import PlayGameIcon from "@/icons/PlayGame.svg";

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
}

interface Props {
  type: "friend" | "request" | "block";
  user: DataType;
}

const deleteFriend = (id: string) => {
  console.log(id);
};

const RequestButtons = (id: string) => (
  <div className={style.actionContainer}>
    <Button
      ghost
      danger
      type="primary"
      icon={<CloseOutlined />}
      onClick={() => deleteFriend(id)}
    />
    <Button
      ghost
      type="primary"
      icon={<CheckOutlined />}
      onClick={() => deleteFriend(id)}
    />
  </div>
);

const FriendButtons = (id: string) => (
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

const BlockButtons = (id: string) => (
  <div className={style.actionContainer}>
    <Button
      type="primary"
      onClick={() => deleteFriend(id)}
    >
      Unblock
    </Button>
  </div>
);

const UserCard: React.FC<Props> = (props) => {
  const { type, user } = props;

  return (
    <List.Item
      className={style.item}
      key={user.login.uuid}
      actions={[
        <Popover
          content={
            type === "friend"
              ? FriendButtons(user.login.uuid)
              : type === "request"
              ? RequestButtons(user.login.uuid)
              : BlockButtons(user.login.uuid)
          }
          trigger="click"
          placement="left"
        >
          <Icon component={DotsVIcon} style={{ fontSize: "140%" }} />
        </Popover>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={user.picture.large} size="large" />}
        title={`${user.name.first} ${user.name.last}`}
        description={user.login.username}
      />
    </List.Item>
  );
};

export default UserCard;
