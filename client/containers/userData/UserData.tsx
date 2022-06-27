import style from "./userData.module.css";
import { Tabs } from "antd";
import AccountSetting from 'components/accountSetting/AccountSetting'

const { TabPane } = Tabs;

const UserData: React.FC = () => {
  return (
    <div className={style.container}>
      <Tabs centered size="large" tabBarStyle={{
        width: '100%',
        margin: 'auto',

      }} >
        <TabPane tab="Account Settings" key="1">
          <AccountSetting />
        </TabPane>
        <TabPane tab="Friends" key="2">
          Friends
        </TabPane>
        <TabPane tab="Blockeds" key="3">
          Blockeds
        </TabPane>
        <TabPane tab="Last Matches" key="4">
          Last Matches
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserData;
