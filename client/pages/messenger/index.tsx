import style from "./messenger.module.css";
import { useRouter } from "next/router";
import Conversations from "@/containers/Conversations/Conversations";
import BoxMessenger from "@/containers/boxMessenger/BoxMessenger";
import SettingMessenger from "@/containers/settingMessenger/SettingMessenger";
import { SetStateAction, useEffect, useState } from "react";
import { Tabs, Typography, Empty, Modal } from "antd";
import { SettingIcon, MessageIcon } from "@/icons/index";
import { ConversationMemberType, ConversationsType, MessageTextType } from "types/types";
import Icon from "@ant-design/icons";
import authRoute from "@/tools/protectedRoutes";
import { useWindowSize } from "@/hooks/useWindowSize";

const Messanger: React.FC = () => {
  const [currentConversation, setCurrentConversation] = useState<ConversationsType | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState<string>("Conversations");
  const width = useWindowSize();
  const router = useRouter();

  const changeConversation = (conversation: ConversationsType) => {
    return Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  };

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
      children: (
        <Conversations
          setCurrentConversation={(value: SetStateAction<ConversationsType | undefined>): void => {
            setCurrentConversation(value);
            setCurrentTab("Message");
          }}
          {...setCurrentConversation}
        />
      ),
    },
    {
      key: "Message",
      className: style.boxMessenger,
      label: null,
      children: currentConversation ? <BoxMessenger currentConversation={currentConversation} /> : null,
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
      children: currentConversation ? (
        <SettingMessenger conversation={currentConversation} />
      ) : (
        <Empty description="No Conversation was selected." />
      ),
    },
  ];
  const handelUrlHash = () => {
    const hashs = ["Conversations", "Message", "Settings"];
    const hash = router.asPath.split("#")[1];
    if (hashs.includes(hash)) setCurrentTab(hash);
  };
  useEffect(() => {
    handelUrlHash();
  }, []);

  return width < 1200 ? (
    <div className={`${style.md} ${style.container}`}>
      <Tabs
        items={items}
        centered
        size="large"
        className={style.tabsContainer}
        activeKey={currentTab}
        onChange={(key) => {
          router.push(`#${key}`);
          setCurrentTab(key);
        }}
      />
    </div>
  ) : (
    <div className={`${style.xxl} ${style.container}`}>
      <div className={style.historyMessenger}>
        <Conversations
          setCurrentConversation={(value: SetStateAction<ConversationsType | undefined>): void => {
            setCurrentConversation(value);
          }}
          {...setCurrentConversation}
        />
      </div>
      <div className={style.boxMessenger}>
        {currentConversation ? (
          <BoxMessenger currentConversation={currentConversation} />
        ) : (
          <Empty description="No Conversation was selected." />
        )}
      </div>
      <div className={style.settingMessenger}>
        {currentConversation ? <SettingMessenger conversation={currentConversation} /> : null}
      </div>
    </div>
  );
};

export default authRoute(Messanger);
