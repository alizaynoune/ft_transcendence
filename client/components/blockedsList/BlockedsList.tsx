import style from "./blockedsList.module.css";
import React, { useContext, useEffect, useState } from "react";
import { List } from "antd";
import UserCard from "@/components/userCard/UserCard";
import { BlockedListType, ProfileContextType } from "@/types/types";
import axios from "@/config/axios";
import { ProfileContext } from "context/profileContext";

const BlockedsList: React.FC = () => {
  const { blockedsList, loadBlockeds } = useContext(ProfileContext) as ProfileContextType;

  useEffect(() => {
    loadBlockeds();
  }, []);

  useEffect(() => {
    console.log(blockedsList);
  }, [blockedsList]);

  return (
    <div className={style.container}>
      <List
        dataSource={blockedsList}
        itemLayout="horizontal"
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
          blockedsList.length < 17
            ? false
            : {
                onChange: (page) => {},
                total: BlockedsList.length,
                pageSize: 16,
              }
        }
        renderItem={(item) => <UserCard type="block" user={item} />}
      />
    </div>
  );
};

export default BlockedsList;
