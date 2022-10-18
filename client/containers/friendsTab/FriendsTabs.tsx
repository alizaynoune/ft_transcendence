import style from "./friendsTabs.module.css";
import { Tabs, message, Typography } from "antd";
import Icon, { EditFilled } from "@ant-design/icons";
import FriendsList from "@/components/friendsList/FriendsList";
import Request from "@/components/RequestList/RequestList";
import { FriendsIcon, AddFriendIcon } from "@/icons/index";
import { useContext } from "react";
import { ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";

const FriendsTabs: React.FC = () => {
  const { isMyProfile } = useContext(ProfileContext) as ProfileContextType;

  const items = [
    {
      key: "1",
      label: (
        <>
          <Typography className={style.tabText}>{"Friends"}</Typography>
          <Icon component={FriendsIcon} className={style.tabIcon} />
        </>
      ),
      children: <FriendsList />,
    },
  ];

  if (isMyProfile)
    items.push({
      key: "2",
      label: (
        <>
          <Typography className={style.tabText}>{"Friend requests"}</Typography>
          <Icon component={AddFriendIcon} className={style.tabIcon} />
        </>
      ),
      children: <Request />,
    });

  return (
    <div className={style.container}>
      <Tabs
        size="large"
        items={items}
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
      />
    </div>
  );
};

export default FriendsTabs;
