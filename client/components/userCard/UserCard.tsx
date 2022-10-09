import style from "./userCard.module.css";
import { List, Avatar, Button, Popover, Menu, Dropdown, Space, message } from "antd";
import type { MenuProps, ButtonProps } from "antd";
import Icon, { CloseOutlined, CheckOutlined, DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useContext } from "react";
import { ProfileContext } from "context/profileContext";
// Icons
import { DotsVIcon, DeleteUserIcon, BlockUserIcon, MessageIcon, PlayGameIcon } from "@/icons/index";
import { UserType, FriendActions, ProfileContextType } from "@/types/types";

interface Props {
  type: "friend" | "request" | "block";
  user: UserType;
}

const actionsList = {
  friend: [
    { icon: <Icon component={MessageIcon} style={{ fontSize: "120%" }} />, action: "message" },
    { icon: <Icon component={PlayGameIcon} style={{ fontSize: "120%" }} />, action: "playGame" },
    { icon: <Icon component={BlockUserIcon} style={{ fontSize: "120%" }} />, action: "blockfriend" },
    { icon: <Icon component={DeleteUserIcon} style={{ fontSize: "120%" }} />, action: "deletefriend" },
  ],
  request: [
    { icon: <CloseOutlined />, action: "rejectrequest" },
    { icon: <CheckOutlined />, action: "acceptrequest" },
  ],
  block: [{ icon: <Icon>{"Unblock"}</Icon>, action: "Unblock" }],
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
