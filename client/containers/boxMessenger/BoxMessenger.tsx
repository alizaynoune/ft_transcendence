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

import dynamic from "next/dynamic";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const messageStatus = ["send", "read", "delivered", "failer", "waiting"];
// const {} = Picker
const fakeMessage = (id: string, sender: UserType): MessageTextType => {
  return {
    id: "message id",
    conversationID: id,
    content: lorem.generateSentences(1),
    date: new Date(),
    sender,
    deleted: false,
    status: messageStatus[Math.floor(Math.random() * 5)],
  };
};

const BoxMessenger: React.FC<PropsType> = ({ currentConversation }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageTextType[]>([]);
  const [value, setValue] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    bottomRef.current?.scroll({
      top: bottomRef.current.scrollHeight,
    });
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
    if (value.length === 0) {
      setError(true);
      return;
    }

    setMessages((old) => [
      ...old,
      {
        id: "test",
        conversationID: currentConversation.id,
        content: value,
        date: new Date(),
        sender: currentConversation.members[0],
        deleted: false,
        status: messageStatus[Math.floor(Math.random() * 5)],
      },
    ]);
    setValue("");
    setShowEmoji(false);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    error && setError(false)
    setValue((old) => old.concat(emojiObject.emoji));
  };

  return (
    <div className={style.container}>
      <div ref={bottomRef} className={style.box}>
        {messages.map((m, key) => {
          return (
            <MessageText
              message={m}
              key={key}
              number={m.sender.id === currentConversation.members[0].id ? 1 : 0}
            />
          );
        })}
      </div>
      {showEmoji ? (
        <div>
          <Picker
            onEmojiClick={onEmojiClick}
            disableSearchBar={true}
            disableAutoFocus={true}
            disableSkinTonePicker={true}
            pickerStyle={{
              margin: "5px",
              with: "100%",
            }}
          />
        </div>
      ) : null}

      <Form name="message" onFinish={onSubmit}>
        <Input.Group compact>
          <Input
            className={style.Input}
            status={error ? "error" : undefined}
            size="large"
            style={{ width: "calc(100% - 40px)" }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              error && setError(false)
            }}
            prefix={
              <Icon
                component={EmojiSmileIcon}
                style={{ fontSize: 20}}
                onClick={() => setShowEmoji(!showEmoji)}
              />
            }
          />
          <Button
            size="large"
            ghost
            danger={error}
            disabled={value.length === 0}
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
    </div>
  );
};

export default BoxMessenger;
