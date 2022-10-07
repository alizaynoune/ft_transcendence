import style from "./userData.module.css";
import { useEffect, useState, useContext } from "react";
import { Tabs, Typography } from "antd";
import { useRouter } from "next/router";
import AccountSetting from "@/containers/accountSettingTab/AccountSettingTab";
import FriendsTabs from "@/containers/friendsTab/FriendsTabs";
import BlockedsList from "@/components/blockedsList/BlockedsList";
import LastMatches from "@/components/lastMatches/LastMatches";
import Icon from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { BlockUserIcon, SettingIcon, FriendsIcon, GameIcon } from "@/icons/index";
import { ProfileContext } from "context/profileContext";
import { UserType, ProfileContextType } from "@/types/types";

interface PropsType {
  profileId: number;
}

const { TabPane } = Tabs;
const UserData: React.FC<PropsType> = ({ profileId }) => {
  const [currentTab, setCurrentTab] = useState<string>("Friends");
  const router = useRouter();
  const { intra_id } = useAppSelector(selectAuth);
  const { checkeIsMyProfile, isMyProfile } = useContext(ProfileContext) as ProfileContextType;
  const handelUrlHash = () => {
    const hashs = ["AccountSettings", "Friends", "Blockeds", "LastMatches"];
    const hash = router.asPath.split("#")[1];
    if (hashs.includes(hash)) setCurrentTab(hash);
  };

  useEffect(() => {
    handelUrlHash();
  }, [router.asPath]);

  useEffect(() => {
    checkeIsMyProfile(profileId);
    handelUrlHash();
  }, []);

  return (
    <div className={style.container}>
      {isMyProfile ? (
        <Tabs
          centered
          size="large"
          activeKey={currentTab}
          onChange={(key) => {
            router.push(`#${key}`);
          }}
        >
          <TabPane
            tab={
              <>
                <Typography.Text className={style.tabText}>{"Friends"}</Typography.Text>
                <Icon className={style.tabIcon} component={FriendsIcon} />
              </>
            }
            key="Friends"
          >
            <FriendsTabs />
          </TabPane>
          <TabPane
            tab={
              <>
                <Typography.Text className={style.tabText}>{"Blockeds"}</Typography.Text>
                <Icon className={style.tabIcon} component={BlockUserIcon} />
              </>
            }
            key="Blockeds"
          >
            <BlockedsList />
          </TabPane>
          <TabPane
            tab={
              <>
                <Typography.Text className={style.tabText}>{"Last Matches"}</Typography.Text>
                <Icon className={style.tabIcon} component={GameIcon} />
              </>
            }
            key="LastMatches"
          >
            <LastMatches />
          </TabPane>

          <TabPane
            tab={
              <>
                <Typography.Text className={style.tabText}>{"Account Settings"}</Typography.Text>
                <Icon className={style.tabIcon} component={SettingIcon} />
              </>
            }
            key="AccountSettings"
          >
            <AccountSetting />
          </TabPane>
        </Tabs>
      ) : (
        <FriendsTabs />
      )}
    </div>
  );
};

export default UserData;
