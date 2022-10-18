import style from "./userData.module.css";
import { useEffect, useState, useContext } from "react";
import { Tabs, Typography } from "antd";
import { useRouter } from "next/router";
import AccountSetting from "@/containers/accountSettingTab/AccountSettingTab";
import FriendsTabs from "@/containers/friendsTab/FriendsTabs";
import BlockedsList from "@/components/blockedsList/BlockedsList";
import LastMatches from "@/components/lastMatches/LastMatches";
import Icon from "@ant-design/icons";
import { BlockUserIcon, SettingIcon, FriendsIcon } from "@/icons/index";
import { ProfileContext } from "context/profileContext";
import { ProfileContextType } from "@/types/types";

const items = [
  {
    key: "Friends",
    label: (
      <>
        <Typography.Text className={style.tabText}>{"Friends"}</Typography.Text>
        <Icon className={style.tabIcon} component={FriendsIcon} />
      </>
    ),
    children: <FriendsTabs />,
  },
  {
    key: "Blockeds",
    label: (
      <>
        <Typography.Text className={style.tabText}>{"Blockeds"}</Typography.Text>
        <Icon className={style.tabIcon} component={BlockUserIcon} />
      </>
    ),
    children: <BlockedsList />,
  },
  {
    key: "LastMatches",
    label: (
      <>
        <Typography.Text className={style.tabText}>{"Account Settings"}</Typography.Text>
        <Icon className={style.tabIcon} component={SettingIcon} />
      </>
    ),
    children: <LastMatches />,
  },
  {
    key: "AccountSettings",
    label: (
      <>
        <Typography.Text className={style.tabText}>{"Account Settings"}</Typography.Text>
        <Icon className={style.tabIcon} component={SettingIcon} />
      </>
    ),
    children: <AccountSetting />,
  },
];

const UserData: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("Friends");
  const router = useRouter();
  const { isMyProfile } = useContext(ProfileContext) as ProfileContextType;
  const handelUrlHash = () => {
    const hashs = ["AccountSettings", "Friends", "Blockeds", "LastMatches"];
    const hash = router.asPath.split("#")[1];
    if (hashs.includes(hash)) setCurrentTab(hash);
  };

  useEffect(() => {
    handelUrlHash();
  }, [router.asPath]);

  useEffect(() => {
    handelUrlHash();
  }, []);

  return (
    <div className={style.container}>
      {isMyProfile ? (
        <Tabs
          items={items}
          centered
          size="large"
          activeKey={currentTab}
          onChange={(key) => {
            router.push(`#${key}`);
          }}
        />
      ) : (
        <FriendsTabs />
      )}
    </div>
  );
};

export default UserData;
