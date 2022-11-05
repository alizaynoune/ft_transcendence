import style from "./boxMessenger.module.css";
import { Input, Button, List, message, Form } from "antd";
import Icon from "@ant-design/icons";
import MessageText from "@/components/messageText/MessageText";
import { useState, useEffect, useRef } from "react";
import axios from "@/config/axios";
import { ConversationsType, MessageTextType, UserType, ConversationMemberType } from "types/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import Socket from "@/config/socket";
//Icons
import { EmojiSmileIcon, SendIcon } from "@/icons/index";

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
type DataType = MessageTextType & {
  members: {
    users: UserType;
  };
};
const BoxMessenger: React.FC<PropsType> = ({ currentConversation }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<DataType[]>([]);
  const [value, setValue] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  useEffect(() => {
    bottomRef.current?.scroll({
      top: bottomRef.current.scrollHeight,
    });
  });

  const loadMoreData = async () => {
    try {
      const res = (await axios.get(`conversation/${currentConversation.id}/messages`)) as { data: DataType[] };
      setMessages(res.data.reverse());
    } catch (error) {
      console.log(error);
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    console.log(currentConversation, "current");
    setMyInfo(currentConversation.members.find((m) => m.userid === intra_id));

    loadMoreData();
    Socket.emit("joinChatRom", currentConversation.id);
    Socket.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      console.log("of new message");

      Socket.off("newMessage");
    };
  }, [currentConversation]);

  const onSubmit = () => {
    if (value.length === 0) {
      setError(true);
      return;
    }
    const body = {
      message: value,
      conversationId: currentConversation.id,
    };
    Socket.emit("sendMessage", body, (res: any) => {
      const { data, error } = res;
      if (error) message.error(error.message);
      if (data) setMessages((prev) => [...prev, data]);
    });
    setValue("");
    setShowEmoji(false);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    error && setError(false);
    setValue((old) => old.concat(emojiObject.emoji));
  };

  return (
    <div className={style.container}>
      <div ref={bottomRef} className={style.box}>
        {messages.map((m, key) => {
          return <MessageText message={m} key={key} IamSender={m.members.users.intra_id === intra_id} />;
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
            disabled={!(myInfo?.active && !myInfo?.mute)}
            placeholder="Input your message"
            className={style.Input}
            status={error ? "error" : undefined}
            size="large"
            style={{ width: "calc(100% - 40px)" }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              error && setError(false);
            }}
            prefix={<Icon component={EmojiSmileIcon} style={{ fontSize: 20 }} onClick={() => setShowEmoji(!showEmoji)} />}
          />
          <Button
            size="large"
            ghost
            danger={error}
            disabled={value.length === 0}
            type="primary"
            htmlType="submit"
            icon={<Icon component={SendIcon} style={{ fontSize: 20, color: "var(--primary-color)" }} />}
          />
        </Input.Group>
      </Form>
    </div>
  );
};

export default BoxMessenger;
