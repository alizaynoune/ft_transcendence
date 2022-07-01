import style from "./userData.module.css";
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useRouter } from 'next/router'
import Link from "next/link";
import AccountSetting from '@/containers/accountSettingTab/AccountSettingTab'
import FriendsTabs from '@/containers/friendsTab/FriendsTabs'
import BlockedsList from "@/components/blockedsList/BlockedsList";
import LastMatches from "@/components/lastMatches/LastMatches";

interface Props {
  name: {
    first: string;
    last: string;
  };
  username: string;
  email: string;
  phone: string;
  location: string;
  birthday: Date;
  gender: string;
}

const { TabPane } = Tabs;
const UserData: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('AccountSettings')
  const router = useRouter()

  const handelUrlHash = () => {
    const hashs = ['AccountSettings', 'Friends', 'Blockeds', 'LastMatches']
    const hash = router.asPath.split('#')[1]
    if (hashs.includes(hash)) setCurrentTab(hash);
    
  }

  useEffect(() => {
    handelUrlHash()
    
  }, [router.asPath])

  useEffect(() => {
    handelUrlHash()
  }, [])



  return (
    <div className={style.container}>
      <Tabs centered size="large" 
      activeKey={currentTab}
      onChange={(key) => {
        router.push(`#${key}`)
      }}
      tabBarStyle={{
        width: '100%',
        margin: 'auto',

      }} >
        <TabPane tab="Account Settings" key="AccountSettings">
          <AccountSetting />
        </TabPane>
        <TabPane tab="Friends" key="Friends">
          <FriendsTabs />
        </TabPane>
        <TabPane tab="Blockeds" key="Blockeds">
          <BlockedsList />
        </TabPane>
        <TabPane tab="Last Matches" key="LastMatches">
          <LastMatches />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserData;
