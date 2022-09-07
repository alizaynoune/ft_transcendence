import style from "./messenger.module.css";

// containers
import Conversations from "@/containers/Conversations/Conversations";
import BoxMessenger from "@/containers/boxMessenger/BoxMessenger";
import SettingMessenger from "@/containers/settingMessenger/SettingMessenger";
import { SetStateAction, useEffect, useState } from "react";

import { ConversationsType } from "types/types";

const Messanger: React.FC = () => {
  const [currentConversation, setCurrentConversation] =
    useState<ConversationsType>();

  useEffect(() => {
    console.log("rerander");
  }, []);
  return (
    <div className={style.container}>
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
        <SettingMessenger />
      </div>
    </div>
  );
};

export default Messanger;
