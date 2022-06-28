import style from "./accountSettingTab.module.css";
import { Tabs } from "antd";

import AccountEdit from "@/components/accountEdit/AccountEdit";

const { TabPane } = Tabs;
const AccountSettingTab: React.FC = () => {
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
          padding: "0 20px",
        }}
      >
        <TabPane tab="Edit" key="1">
            <AccountEdit />
        </TabPane>
        <TabPane tab="Privacy" key="2">
          Privacy
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AccountSettingTab;
