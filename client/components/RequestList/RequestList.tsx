import style from "./RequestList.module.css";
import React, { useEffect, useState } from "react";
import { Empty, List } from "antd";
import UserCard from "@/components/userCard/UserCard";
import axios from "@/config/axios";
import { message } from "antd";
import { UserType, RequestFriendType } from "@/types/types";

interface PropsType {
  pushFriend: (user: UserType) => void;
}

const FriendRequestList: React.FC<PropsType> = ({ pushFriend }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RequestFriendType[]>([]);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("/friends/invites");
      console.log(res.data);
      setData(res.data.invites);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const action = async (user: UserType, action: string) => {
    try {
      const res = await axios.post(`friends/${action}`, {
        id: user.intra_id.toString(),
      });
      setData((prev) => prev.filter((i) => i.senderid !== user.intra_id));
      message.success(res.data.message);
      if (action === "acceptrequest") pushFriend(user);
    } catch (error: unknown) {
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className={style.container}>
      <List
        dataSource={data}
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
          data.length < 17
            ? false
            : {
                onChange: (page) => {
                },
                total: data.length,
                pageSize: 16,
              }
        }
        renderItem={(item) => <UserCard user={item.userInfo} type="request" action={action} />}
      />
    </div>
  );
};

export default FriendRequestList;
