import style from "./friendsTabs.module.css";
import { Tabs, message, Typography } from "antd";
import Icon, { EditFilled } from "@ant-design/icons";
import FriendsList from "@/components/friendsList/FriendsList";
import Request from "@/components/RequestList/RequestList";
import { FriendsIcon, AddFriendIcon } from "@/icons/index";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { useEffect, useState } from "react";
import { UserType } from "@/types/types";
import axios from '@/config/axios'

const { TabPane } = Tabs;
interface PropsType {
  profileId: number;
}
const FriendsTabs: React.FC<PropsType> = ({ profileId }) => {
  const { intra_id } = useAppSelector(selectAuth);
  const [friends, setFriends] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false)

//   const 
  const filterFriends = (id: number) => {

  }

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("friends");
      console.log(res);
      setFriends(res.data.friends ? res.data.friends : []);
      setLoading(false);
    } catch (error) {
      console.log(error);
      error instanceof Error && message.error(error.message);
    }
  };

  const action = async (id: number, action: string) => {
    console.log(action);
    try {
      const res = await axios.post(`friends/${action}`, {
        id: id.toString(),
      });
      message.success(res.data.message);
      if (action === "blockfriend")
        setFriends((prev) => prev.filter((i) => i.userInfo.intra_id !== id));
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className={style.container}>
      <Tabs
        size="large"
        tabBarStyle={{
          backgroundColor: "#464E5F",
          width: "100%",
          margin: "auto",
          borderRadius: "6px",
          fontWeight: "bold",
          boxShadow: "0px 0px 8px rgba(154, 154, 154, 0.5)",
          padding: "0 40px",
          color: "var(--light-color)",
        }}
      >
        <TabPane
          tab={
            <>
              <Typography className={style.tabText}>{"Friends"}</Typography>
              <Icon component={FriendsIcon} className={style.tabIcon} />
            </>
          }
          key="1"
        >
          <FriendsList friends={friends} action={action} />
        </TabPane>
        {intra_id === profileId && (
          <TabPane
            tab={
              <>
                <Typography className={style.tabText}>{"Friend requests"}</Typography>
                <Icon component={AddFriendIcon} className={style.tabIcon} />
              </>
            }
            key="2"
          >
            <Request />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default FriendsTabs;
