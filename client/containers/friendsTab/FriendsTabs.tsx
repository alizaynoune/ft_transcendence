import style from "./friendsTabs.module.css";
import { Tabs, List, Avatar } from "antd";
// import VirtualList from 'rc-virtual-list';

import FriendsCard from "@/components/friendsList/FriendsList";

const fakeUser = {
  username: "user name",
  email: "user@gmail.com",
  avatar: "https://randomuser.me/api/portraits/med/women/94.jpg",
};

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
        <TabPane tab="Friends" key="1">
          {/* <List> */}
              <FriendsCard />
            {/* <List.Item key="1">
              <List.Item.Meta
                avatar={<Avatar src={fakeUser.avatar} size="large" />}
                title={fakeUser.username}
                description={fakeUser.email}
              />
              <div>Content</div>
            </List.Item>
            <List.Item key="2">
              <List.Item.Meta
                avatar={<Avatar src={fakeUser.avatar} size="large" />}
                title={fakeUser.username}
                description={fakeUser.email}
              />
              <div>Content</div>
            </List.Item> */}
          {/* </List> */}
        </TabPane>
        <TabPane tab="Friend requests" key="2">
          {/* <AccountPrivacy /> */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FriendsTabs;
