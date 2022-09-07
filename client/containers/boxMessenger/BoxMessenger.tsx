import style from "./boxMessenger.module.css";
import CardSender from "@/components/boxMessengerCardSender/BoxMessengerCardSender"; // ! remove it
import CardReceiver from "@/components/boxMessengerCardReceiver/BoxMessengerCardReceiver"; // ! remove it
import { Input, Button, List } from "antd";
import Icon from "@ant-design/icons";

import MessageText from "@/components/messageText/MessageText";

// To Add functionnality to scroll to the end of the list of messages
import { useState, useEffect, useRef } from "react";

import {ConversationsType} from 'types/types'

//Icons
import EmojiSmile from "@/icons/EmojiSmile.svg";
import Send from "@/icons/Send.svg";

type PropsType = {
  currentConversation: ConversationsType | null
}

const BoxMessenger: React.FC<PropsType> = ({currentConversation}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView();
  // });

  return (
    <div className={style.container}>
      <div className={style.box}>
        <MessageText currentConversation={currentConversation} />
        <div ref={bottomRef} />
      </div>
      <Input
        className={style.Input}
        size='large'
        prefix={
          <Icon
            component={EmojiSmile}
            style={{ fontSize: "120%", color: "var(--primary-color)" }}
          />
        }
        suffix={
          <Icon
            component={Send}
            style={{ fontSize: "120%", color: "var(--primary-color)" }}
          />
        }
        placeholder="Message"
      />
    </div>
  );
};

export default BoxMessenger;
