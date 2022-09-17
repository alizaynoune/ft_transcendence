import style from "./accountSettingTab.module.css";
import { Tabs, Typography } from "antd";
import Icon, { EditFilled, FileProtectOutlined } from "@ant-design/icons";

// components
import AccountEdit from "@/components/accountEdit/AccountEdit";
import AccountPrivacy from "@/components/accountPrivacy/AccountPrivacy";

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
          padding: "0 40px",
          color: "var(--light-color)",
        }}
      >
        <TabPane
          tab={
            <>
              <Typography className={style.tabText}>{"Edit"}</Typography>
              <EditFilled className={style.tabIcon} />
            </>
          }
          key="1"
        >
          <AccountEdit />
        </TabPane>
        <TabPane
          tab={
            <>
              <Typography className={style.tabText}>{"Privacy"}</Typography>
              <FileProtectOutlined className={style.tabIcon} />
            </>
          }
          key="2"
        >
          
          <AccountPrivacy />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AccountSettingTab;
