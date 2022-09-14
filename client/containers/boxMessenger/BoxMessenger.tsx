import style from "./boxMessenger.module.css";
import { Input, Button, List, message, Form } from "antd";
import Icon from "@ant-design/icons";
import { LoremIpsum } from "lorem-ipsum"; //!delete it

import MessageText from "@/components/messageText/MessageText";

// To Add functionnality to scroll to the end of the list of messages
import { useState, useEffect, useRef } from "react";

import { ConversationsType, MessageTextType, UserType } from "types/types";

//Icons
import { EmojiSmileIcon, SendIcon } from "@/icons/index";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

type PropsType = {
  currentConversation: ConversationsType;
};

const fakeMessage = (id: string, sender: UserType): MessageTextType => {
  return {
    id: "message id",
    conversationID: id,
    read: Math.random() < 0.5,
    content: lorem.generateSentences(1),
    date: new Date(),
    sender,
    deleted: false,
  };
};

const BoxMessenger: React.FC<PropsType> = ({ currentConversation }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageTextType[]>([]);
  const [value, setValue] = useState<string>("sdfas");
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });

  useEffect(() => {
    const newMessage: MessageTextType[] = [];
    const count = Math.floor(Math.random() * 100);
    for (let i = 0; i < count; i++) {
      newMessage.push(
        fakeMessage(
          currentConversation.id,
          currentConversation.members[
            Math.floor(Math.random() * currentConversation.members.length)
          ]
        )
      );
    }
    setMessages([...newMessage]);
  }, [currentConversation]);

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className={style.container}>
      <div className={style.box}>
        {messages.map((m, key) => {
          return (
            <MessageText
              message={m}
              key={key}
              number={m.sender.id === currentConversation.members[0].id ? 1 : 0}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>
      <Form name="form" onFinish={onSubmit}>
        <Form.Item name="message" >
          {/* <Input.Group compact> */}
          <Input
            style={{ width: "100%" }}
            className={style.Input}
            size="large"
            // value={value}
            // onChange={onChange}
            placeholder="Message"
            prefix={
              <Icon
                component={EmojiSmileIcon}
                style={{ fontSize: 20, color: "var(--primary-color)" }}
              />
            }
            suffix={
              <Icon
                component={SendIcon}
                style={{ fontSize: 20, color: "var(--primary-color)" }}
              />
            }
          />
          {/* <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </Input.Group> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default BoxMessenger;
