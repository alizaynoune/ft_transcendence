import style from "./messenger.module.css";
import { useRouter } from "next/router";
// containers
import Conversations from "@/containers/Conversations/Conversations";
import BoxMessenger from "@/containers/boxMessenger/BoxMessenger";
import SettingMessenger from "@/containers/settingMessenger/SettingMessenger";
import { SetStateAction, useEffect, useState } from "react";
import { Tabs, Typography, Result, Button } from "antd";
import { SettingIcon, Messager1Icon, MessageIcon, Settings2Icon } from "@/icons/index";
import { ConversationsType } from "types/types";
import Icon, {HistoryOutlined} from "@ant-design/icons";
import Link from "next/link";

const { TabPane } = Tabs;
const Messanger: React.FC = () => {
  const [currentConversation, setCurrentConversation] =
    useState<ConversationsType | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState<string>("Conversations");
  const router = useRouter();

  const handelUrlHash = () => {
    const hashs = ["Conversations", "Message", "Settings"];
    const hash = router.asPath.split("#")[1];
    if (hashs.includes(hash)) setCurrentTab(hash);
  };
  useEffect(() => {
    handelUrlHash();
  }, []);

  return (
    <>
      <div className={`${style.md} ${style.container}`}>
        <Tabs
          centered
          size="large"
          className={style.tabsContainer}
          activeKey={currentTab}
          onChange={(key) => {
            router.push(`#${key}`);            
            setCurrentTab(key);
          }}
        >
          <TabPane
            key={"Conversations"}
            className={style.historyMessenger}
            tab={
              <>
                <Typography.Text className={style.tabText}>
                  {"Conversations"}
                </Typography.Text>
                <Icon className={style.tabIcon} component={MessageIcon} />
              </>
            }
          >
            <Conversations
              setCurrentConversation={function (
                value: SetStateAction<ConversationsType | undefined>
              ): void {
                setCurrentConversation(value);
                setCurrentTab('Message')
              }}
              {...setCurrentConversation}
            />
          </TabPane>
          <TabPane
            key={"Message"}
            className={style.boxMessenger}
          >
            {currentConversation ? (
              <BoxMessenger currentConversation={currentConversation} />
            ):null}
          </TabPane>
          <TabPane
            key={"Settings"}
            className={style.settingMessenger}
            tab={
              <>
                <Typography.Text className={style.tabText}>
                  {"Settings"}
                </Typography.Text>
                <Icon className={style.tabIcon} component={SettingIcon} />
              </>
            }
          >
            {currentConversation ? (
              <SettingMessenger conversation={currentConversation} />
            ): (
              <Result
              status="warning"
              title="No Conversation was selected."
            />
            )}
          </TabPane>
        </Tabs>
      </div>
      <div className={`${style.xxl} ${style.container}`}>
        <div className={style.historyMessenger}>
          <Conversations
            setCurrentConversation={function (
              value: SetStateAction<ConversationsType | undefined>
            ): void {
              setCurrentConversation(value);
            }}
            {...setCurrentConversation}
          />
        </div>
        <div className={style.boxMessenger}>
          {currentConversation ? (
            <BoxMessenger currentConversation={currentConversation} />
          ): (
            <Result
            status="warning"
            title="No Conversation was selected"
          />
          )}
        </div>
        <div className={style.settingMessenger}>
          {currentConversation && (
            <SettingMessenger conversation={currentConversation} />
          )}
        </div>
      </div>
    </>
  );
};

export default Messanger;
