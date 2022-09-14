import style from "./boxMessenger.module.css";
import { Input, Button, List, message, Form } from "antd";
import Icon from "@ant-design/icons";
import type { FormInstance } from "antd/es/form";
import Picker from 'emoji-picker-react';

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
  const [showEmoji, setShowEmoji] = useState<boolean>(false)
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

  const onSubmit = () => {
    console.log(value);
    setMessages(old => [...old, {id: 'test', conversationID: currentConversation.id, read: false, content: value, date: new Date, sender: currentConversation.members[0], deleted: false}])
    setValue("")
    setShowEmoji(false)
  };

  const onEmojiClick = (event : any, emojiObject : any) => {
    console.log(emojiObject);
    setValue(old => old.concat(emojiObject.emoji))
    
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
      {showEmoji &&(
        <Picker onEmojiClick={onEmojiClick}
      disableSearchBar={true}
      pickerStyle={{
        margin: '5px',
        with: '100%',
      }}
      />
      )}
      
      <Form name="message" onFinish={onSubmit}>
        <Input.Group compact>
          <Input
            className={style.Input}
            size="large"
            style={{ width: "calc(100% - 40px)" }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            prefix={
              <Icon
                component={EmojiSmileIcon}
                style={{ fontSize: 20, color: "var(--primary-color)" }}
                onClick={() => setShowEmoji(!showEmoji)}
              />
            }
          />
          <Button
            size="large"
            ghost
            type="primary"
            htmlType="submit"
            icon={
              <Icon
                component={SendIcon}
                style={{ fontSize: 20, color: "var(--primary-color)" }}
              />
            }
          />
        </Input.Group>
      </Form>
      {/* <i className="twa twa-railway-car"></i> */}
      <span style={{fontSize: 25}}>{String.fromCodePoint(parseInt("1f93c-200d-2640-fe0f",16))}</span>
      {/* <Picker data={data} onEmojiSelect={console.log} /> */}
    </div>
  );
};

export default BoxMessenger;
