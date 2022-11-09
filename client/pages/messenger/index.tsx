import style from "./messenger.module.css";
import { useRouter } from "next/router";
import Conversations from "@/containers/Conversations/Conversations";
import BoxMessenger from "@/containers/boxMessenger/BoxMessenger";
import SettingMessenger from "@/containers/settingMessenger/SettingMessenger";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { Tabs, Typography, Empty, Modal } from "antd";
import { SettingIcon, MessageIcon, Messager1Icon } from "@/icons/index";
import { ConversationMemberType, ConversationsType, MessageTextType, MessengerContextType } from "types/types";
import Icon from "@ant-design/icons";
import authRoute from "@/tools/protectedRoutes";
import { useWindowSize } from "@/hooks/useWindowSize";
import MessengerProvider, { MessengerContext } from "context/massengerContext";

const Messenger: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("Conversations");
  const width = useWindowSize();
  const { currentConversation } = useContext(MessengerContext) as MessengerContextType;

  useEffect(() => {
    console.log(width, "width change");
  }, [width]);
  const items = [
    {
      key: "Conversations",
      className: style.historyMessenger,
      label: (
        <>
          <Typography.Text className={style.tabText}>{"Conversations"}</Typography.Text>
          <Icon className={style.tabIcon} component={MessageIcon} />
        </>
      ),
      children: <Conversations />,
    },
    {
      key: "Messages",
      className: style.boxMessenger,
      label: (
        <>
          <Typography.Text className={style.tabText}>{"Messages"}</Typography.Text>
          <Icon className={style.tabIcon} component={Messager1Icon} />
        </>
      ),
      children: <BoxMessenger />,
      disabled: !currentConversation,
    },
    {
      key: "Settings",
      className: style.settingMessenger,
      label: (
        <>
          <Typography.Text className={style.tabText}>{"Settings"}</Typography.Text>
          <Icon className={style.tabIcon} component={SettingIcon} />
        </>
      ),
      children: <SettingMessenger />,
      disabled: !currentConversation,
    },
  ];

  useEffect(() => {
    if (!currentConversation) return;
    setCurrentTab("Messages");
  }, [currentConversation]);

  return width < 1200 ? (
    <div className={`${style.md} ${style.container}`}>
      <Tabs
        items={items}
        centered
        size="large"
        className={style.tabsContainer}
        activeKey={currentTab}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </div>
  ) : (
    <div className={`${style.xxl} ${style.container}`}>
      <div className={style.historyMessenger}>
        <Conversations />
      </div>
      <div className={style.boxMessenger}>
        <BoxMessenger />
      </div>
      <div className={style.settingMessenger}>
        <SettingMessenger />
      </div>
    </div>
  );
};

const PageMessanger: React.FC = () => {
  return (
    <MessengerProvider>
      <Messenger />
    </MessengerProvider>
  );
};

export default authRoute(PageMessanger);
