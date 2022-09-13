import style from "./friendsTabs.module.css";
import { Tabs, List, Avatar, Typography } from "antd";
import Icon, {EditFilled} from "@ant-design/icons";

import FriendsList from "@/components/friendsList/FriendsList";
import Request from "@/components/RequestList/RequestList";

import {FriendsIcon, AddFriendIcon} from "@/icons/index"

const { TabPane } = Tabs;
const FriendsTabs: React.FC = () => {
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
        key="1">
          <FriendsList />
        </TabPane>
        <TabPane 
        tab={
          <>
          <Typography className={style.tabText}>{"Friend requests"}</Typography>
          <Icon component={AddFriendIcon} className={style.tabIcon} />
          </>
        }
        key="2">
          <Request />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FriendsTabs;
