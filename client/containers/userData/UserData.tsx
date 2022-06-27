import style from "./userData.module.css";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const UserData: React.FC = () => {
  return (
    <div className={style.container}>
      <Tabs centered size="large" type="card">
        <TabPane tab="Account Settings" key="1">
          Account Settings
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
