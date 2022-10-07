import style from "./friendsList.module.css";
import React, { useEffect, useState } from "react";
import { Empty, List, message } from "antd";
import UserCard from "@/components/userCard/UserCard";
import { UserType, FriendActions } from "@/types/types";

interface PropsType {
  friends: UserType[];
  action: FriendActions
}

const FriendsCard: React.FC<PropsType> = ({ friends, action }) => {
  console.log(friends);

  return (
    <div className={style.container}>
      <List
        className={style.list}
        dataSource={friends}
        itemLayout="horizontal"
        locale={{ emptyText: <Empty description={"You have no friends"} image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        pagination={
          friends.length < 17
            ? false
            : {
                onChange: (page) => {},
                total: friends.length,
                pageSize: 16,
              }
        }
        renderItem={(item) => <UserCard type="friend" user={item} action={action} />}
      />
    </div>
  );
};

export default FriendsCard;
