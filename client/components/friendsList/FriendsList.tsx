import style from "./friendsList.module.css";
import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import UserCard from "@/components/userCard/UserCard";
import { UserType } from "@/types/types";

interface PropsType {
  friends: UserType[];
  action: (id: number, action: string) => void
}

const FriendsCard: React.FC<PropsType> = ({friends, action}) => {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<UserType[]>([]);

  // const loadMoreData = async () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const res = await axios.get("friends");
  //     console.log(res);
  //     setData(res.data.friends ? res.data.friends : []);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     error instanceof Error && message.error(error.message);
  //   }
  // };

  // const action = async (id: number, action: string) => {
  //   console.log(action);
  //   try {
  //     const res = await axios.post(`friends/${action}`, {
  //       id: id.toString(),
  //     });
  //     message.success(res.data.message);
  //     if (action === "blockfriend")
  //       setData((prev) => prev.filter((i) => i.userInfo.intra_id !== id));
  //   } catch (error) {
  //     error instanceof Error && message.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  // useEffect(() => {
  //   console.log(data);
    
  // }, [data])

  return (
    <div className={style.container}>
      <List
        className={style.list}
        dataSource={friends}
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
        pagination={{
          onChange: (page) => {
            //console.log(page);
          },
          total: friends.length,
          pageSize: 16,
        }}
        renderItem={(item) => (
          <UserCard type="friend" user={item.userInfo} action={action} />
        )}
      />
    </div>
  );
};

export default FriendsCard;
