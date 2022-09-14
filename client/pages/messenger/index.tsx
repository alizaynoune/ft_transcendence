import style from "./messenger.module.css";
import { useRouter } from "next/router";
// containers
import Conversations from "@/containers/Conversations/Conversations";
import BoxMessenger from "@/containers/boxMessenger/BoxMessenger";
import SettingMessenger from "@/containers/settingMessenger/SettingMessenger";
import { SetStateAction, useEffect, useState } from "react";
import { Tabs } from "antd";
import { ConversationsType } from "types/types";

const { TabPane } = Tabs;
const Messanger: React.FC = () => {
  const [currentConversation, setCurrentConversation] =
    useState<ConversationsType>();
  const [layoutTabs, setLayoutTabs] = useState<Boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("Conversations");
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      setLayoutTabs(window.innerWidth < 1200);
    });
  });

  const handelUrlHash = () => {
    const hashs = ["Conversations", "Message", "Settings"];
    const hash = router.asPath.split("#")[1];
    if (hashs.includes(hash)) setCurrentTab(hash);
    console.log(hash);
  };
  // useEffect(() => {
  //   handelUrlHash();
  //   setLayoutTabs(window.innerWidth < 1200);
  // }, []);
  return (
    <div className={style.container}>
      {/* {layoutTabs ? (
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
            tab={"Conversations"}
            key={"Conversations"}
            className={style.historyMessenger}
          >
            <Conversations
              setCurrentConversation={function (
                value: SetStateAction<ConversationsType | undefined>
              ): void {
                setCurrentConversation(value);
              }}
              {...setCurrentConversation}
            />
          </TabPane>
          <TabPane tab="Message" key={"Message"}>
            <div className={style.boxMessenger}>
              {currentConversation && (
                <BoxMessenger currentConversation={currentConversation} />
              )}
            </div>
          </TabPane>
          <TabPane tab="Settings" key={"Settings"}>
            <div className={style.settingMessenger}>
              {currentConversation && (
                <SettingMessenger conversation={currentConversation} />
              )}
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <> */}
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
            {currentConversation && (
              <BoxMessenger currentConversation={currentConversation} />
            )}
          </div>
          <div className={style.settingMessenger}>
            {currentConversation && (
              <SettingMessenger conversation={currentConversation} />
            )}
          </div>
        {/* </>
      )} */}
    </div>
  );
};

export default Messanger;
