import style from "./userCard.module.css";
import { List, Avatar, Button, Popover, message, Badge } from "antd";
import Icon, { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext } from "react";
import { ProfileContext } from "context/profileContext";
// Icons
import { DotsVIcon, DeleteUserIcon, BlockUserIcon, MessageIcon, PlayGameIcon, UnblockUserIcon } from "@/icons/index";
import { UserType, ProfileContextType } from "@/types/types";

interface Props {
  type: "friend" | "request" | "block";
  user: UserType;
}

const actionsList = {
  friend: [
    { icon: <Icon component={MessageIcon} style={{ fontSize: "120%" }} />, action: "message" },
    { icon: <Icon component={PlayGameIcon} style={{ fontSize: "120%" }} />, action: "game/invite" },
    { icon: <Icon component={BlockUserIcon} style={{ fontSize: "120%" }} />, action: "friends/blockfriend" },
    { icon: <Icon component={DeleteUserIcon} style={{ fontSize: "120%" }} />, action: "friends/unfriend" },
  ],
  request: [
    { icon: <CloseOutlined />, action: "friends/rejectrequest" },
    { icon: <CheckOutlined />, action: "friends/acceptrequest" },
  ],
  block: [{ icon: <Icon component={UnblockUserIcon} style={{ fontSize: "120%" }} />, action: "friends/unblock" }],
};

const UserCard: React.FC<Props> = (props) => {
  const { type, user } = props;
  const { loading, isMyProfile, actions } = useContext(ProfileContext) as ProfileContextType;

  return (
    <List.Item
      className={style.item}
      key={user.intra_id}
      actions={
        isMyProfile
          ? [
              <Popover
                content={
                  <div className={style.actionContainer}>
                    {actionsList[type].map((i, key) => (
                      <Button
                        key={key}
                        ghost
                        type="primary"
                        danger={i.action === "rejectrequest"}
                        icon={i.icon}
                        disabled={loading}
                        onClick={async () => {
                          try {
                            message.success((await actions(user, i.action)).message);
                          } catch (error) {
                            error instanceof Error && message.error(error.message);
                          }
                        }}
                      />
                    ))}
                  </div>
                }
                trigger={["click"]}
                placement="left"
              >
                <Icon component={DotsVIcon} style={{ fontSize: 24 }} />
              </Popover>,
            ]
          : undefined
      }
    >
      <List.Item.Meta
        avatar={
          <Link href={`/profile/${user.username}`}>
            <a>
              <Badge dot status={user.status === "ONLINE" ? "success" : user.status === "PLAYING" ? "warning" : "error"}>
                <Avatar src={user.img_url} size="large" />
              </Badge>
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
