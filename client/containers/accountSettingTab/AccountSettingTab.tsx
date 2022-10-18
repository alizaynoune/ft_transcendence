import style from "./accountSettingTab.module.css";
import { Tabs, Typography } from "antd";
import { EditFilled, FileProtectOutlined } from "@ant-design/icons";

// components
import AccountEdit from "@/components/accountEdit/AccountEdit";
import AccountPrivacy from "@/components/accountPrivacy/AccountPrivacy";

const items = [
  {
    key: "1",
    label: (
      <>
        <Typography className={style.tabText}>{"Edit"}</Typography>
        <EditFilled className={style.tabIcon} />
      </>
    ),
    children: <AccountEdit />,
  },
  {
    key: "2",
    label: (
      <>
        <Typography className={style.tabText}>{"Privacy"}</Typography>
        <FileProtectOutlined className={style.tabIcon} />
      </>
    ),
    children: <AccountPrivacy />,
  },
];

const AccountSettingTab: React.FC = () => {
  return (
    <div className={style.container}>
      <Tabs
        items={items}
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
      />
    </div>
  );
};

export default AccountSettingTab;
