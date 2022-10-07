import style from "./userCard.module.css";
import { List, Avatar, Button, Popover } from "antd";
import Icon, { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext } from "react";
import { ProfileContext } from "context/profileContext";
// Icons
import { DotsVIcon, DeleteUserIcon, BlockUserIcon, MessageIcon, PlayGameIcon } from "@/icons/index";
import { UserType, FriendActions, ProfileContextType } from "@/types/types";

interface Props {
  type: "friend" | "request" | "block";
  user: UserType;
  action: FriendActions;
}

const deleteFriend = (user: UserType) => {
  console.log(user.id);
};

const RequestButtons = (user: UserType, action: FriendActions) => (
  <div className={style.actionContainer}>
    <Button ghost danger type="primary" icon={<CloseOutlined />} onClick={() => action && action(user, "rejectrequest")} />
    <Button ghost type="primary" icon={<CheckOutlined />} onClick={() => action && action(user, "acceptrequest")} />
  </div>
);

const FriendButtons = (user: UserType, action: FriendActions) => (
  <div className={style.actionContainer}>
    <Button
      ghost
      type="primary"
      icon={<Icon component={MessageIcon} style={{ fontSize: "120%" }} />}
      onClick={() => action && action(user, "message")}
    />
    <Button
      ghost
      type="primary"
      icon={<Icon component={PlayGameIcon} style={{ fontSize: "120%" }} />}
      onClick={() => action && action(user, "playeGame")}
    />
    <Button
      ghost
      type="primary"
      icon={<Icon component={BlockUserIcon} style={{ fontSize: "120%" }} />}
      onClick={() => action && action(user, "blockfriend")}
    />
    <Button
      ghost
      type="primary"
      icon={<Icon component={DeleteUserIcon} style={{ fontSize: "120%" }} />}
      onClick={() => action && action(user, "deleteUser")}
    />
  </div>
);

const BlockButtons = (user: UserType) => (
  <div className={style.actionContainer}>
    <Button type="primary" onClick={() => deleteFriend(user)}>
      {"Unblock"}
    </Button>
  </div>
);

const UserCard: React.FC<Props> = (props) => {
  const { type, user } = props;
  const { loading, isMyProfile, actions } = useContext(ProfileContext) as ProfileContextType;
  const action = isMyProfile ? actions : undefined;

  return (
    <List.Item
      className={style.item}
      key={user.intra_id}
      actions={
        isMyProfile
          ? [
              <Popover
                content={
                  type === "friend" ? FriendButtons(user, action) : type === "request" ? RequestButtons(user, action) : BlockButtons(user)
                }
                trigger="click"
                placement="left"
              >
                <Icon component={DotsVIcon} style={{ fontSize: "140%" }} />
              </Popover>,
            ]
          : undefined
      }
    >
      <List.Item.Meta
        avatar={
          <Link href={`/profile/${user.username}`}>
            <a>
              <Avatar src={user.img_url} size="large" />
            </a>
          </Link>
        }
        title={<Link href={`/profile/${user.username}`}>{user.username}</Link>}
        description={`${user.first_name} ${user.last_name}`}
      />
    </List.Item>
  );
};

export default UserCard;
