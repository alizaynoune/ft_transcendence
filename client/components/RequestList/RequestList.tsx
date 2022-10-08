import style from "./RequestList.module.css";
import React, { useEffect, useState, useContext } from "react";
import { Empty, List } from "antd";
import UserCard from "@/components/userCard/UserCard";
import axios from "@/config/axios";
import { message } from "antd";
import { UserType, RequestFriendType, ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";


const FriendRequestList: React.FC= () => {
//   const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RequestFriendType[]>([]);
  const {invitesList, loadInvites, loading, actions} = useContext(ProfileContext) as ProfileContextType

  useEffect(() => {
    // loadMoreData();
    loadInvites()
  }, []);

  return (
    <div className={style.container}>
      <List
        dataSource={invitesList}
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
          invitesList.length < 17
            ? false
            : {
                onChange: (page) => {
                },
                total: invitesList.length,
                pageSize: 16,
              }
        }
        renderItem={(item) => <UserCard user={item.userInfo} type="request" />}
      />
    </div>
  );
};

export default FriendRequestList;
