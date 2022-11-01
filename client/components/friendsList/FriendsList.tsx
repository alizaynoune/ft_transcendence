import style from "./friendsList.module.css";
import React, { useEffect, useState, useContext } from "react";
import { Empty, List } from "antd";
import UserCard from "@/components/userCard/UserCard";
import { ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";
import { useAppSelector } from "@/hooks/reduxHooks";

const FriendsCard: React.FC = () => {
  const { friendsList, loading, isMyProfile, loadFriends, actions } = useContext(ProfileContext) as ProfileContextType;

  useEffect(() => {
    loadFriends()
  }, []);

  return (
    <div className={style.container}>
      <List
        className={style.list}
        dataSource={friendsList}
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
          friendsList.length < 17
            ? false
            : {
                onChange: (page) => {},
                total: friendsList.length,
                pageSize: 16,
              }
        }
        renderItem={(item) => <UserCard type="friend" user={item}/>}
      />
    </div>
  );
};

export default FriendsCard;
