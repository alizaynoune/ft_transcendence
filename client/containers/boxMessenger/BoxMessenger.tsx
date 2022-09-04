import style from "./boxMessenger.module.css";
import CardSender from "@/components/boxMessengerCardSender/BoxMessengerCardSender"; // ! remove it
import CardReceiver from "@/components/boxMessengerCardReceiver/BoxMessengerCardReceiver"; // ! remove it
import { Input, Button, List } from "antd";
import Icon from "@ant-design/icons";

import MessageText from "@/components/MessageText/MessageText";

// To Add functionnality to scroll to the end of the list of messages
import { useState, useEffect, useRef } from "react";

//Icons
import EmojiSmile from "@/icons/EmojiSmile.svg";
import Send from "@/icons/Send.svg";

const BoxMessenger: React.FC = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });

  return (
    <div className={style.container}>
      <div className={style.box}>
        <MessageText
          id="122222"
          conversationID="128"
          read={false}
          sender={{
            id: "183",
            name: {
              first: "ali",
              last: "zaynoune",
              username: "alzaynou",
            },
            email: "alzaynou@email.com",
            avatar: 'avatar',
            status: "online",
          }}
          content="test message"
          date={new Date("December 17, 1995 03:24:00")}
          deleted={false}
        />
        {/* <CardSender
          data={{
            message: {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum vel eu sed eget aliquam tellus. Egestas adipiscing duis donec amet lorem viverra. Aliquam nunc felis ultricies mauris. Quis vitae ac faucibus pretium vitae.",
              time: "3 min ago",
              status: "read",
            },
            user: {
              username: "artam",
              avatar: "hrth",
            },
          }}
        />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardSender
          data={{
            message: {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum vel eu sed eget aliquam tellus. Egestas adipiscing duis donec amet lorem viverra. Aliquam nunc felis ultricies mauris. Quis vitae ac faucibus pretium vitae.",
              time: "3 min ago",
              status: "send",
            },
            user: {
              username: "artam",
              avatar: "hrth",
            },
          }}
        /> */}

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
