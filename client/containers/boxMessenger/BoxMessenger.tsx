import style from "./boxMessenger.module.css";
import { Input, Button, List, message, Form } from "antd";
import Icon, { CloseOutlined } from "@ant-design/icons";
import MessageText from "@/components/messageText/MessageText";
import { useState, useEffect, useRef } from "react";
import axios from "@/config/axios";
import { ConversationsType, MessageTextType, UserType, ConversationMemberType, ConversationsHistory } from "types/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import Socket from "@/config/socket";
//Icons
import { EmojiSmileIcon, SendIcon } from "@/icons/index";

type PropsType = {
  currentConversation: ConversationsHistory;
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
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  const [form] = Form.useForm();
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
    Socket.on("newMessage", (data) => {
      console.log(data, "newMessage");
    });
    return () => {
      Socket.off("newMessage");
    };
  }, [currentConversation]);

  const onFinish = (values: { new_message: string }) => {
    // console.log(values);
    const { new_message } = values;
    if (new_message.length === 0) return;
    const body = {
      message: new_message,
      conversationId: currentConversation.id,
    };
    Socket.emit("sendMessage", body, (res: any) => {
      const { data, error } = res;
      if (error) message.error(error.message);
      if (data) setMessages((prev) => [...prev, data]);
    });
    form.resetFields(["new_message"]);
    setShowEmoji(false);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    const value = (form.getFieldValue("new_message") || "").concat(emojiObject.emoji);
    form.setFields([{ name: "new_message", value, errors: [] }]);
  };

  return (
    <div className={style.container}>
      <div ref={bottomRef} className={style.box}>
        {messages.map((m, key) => {
          return <MessageText message={m} key={key} IamSender={m.members.users.intra_id === intra_id} />;
        })}
      </div>
      {showEmoji ? (
        <div className={style.Picker}>
          <CloseOutlined
            onClick={() => {
              setShowEmoji(false);
            }}
          />
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
      {currentConversation.active && myInfo?.active && !myInfo?.mute && (
        <Form name="message_form" onFinish={onFinish} form={form}>
          <Input.Group compact>
            <Form.Item
              hasFeedback={true}
              name="new_message"
              rules={[{ required: true, message: "Please select atlest on member!" }]}
              style={{
                width: "calc(100% - 40px)",
              }}
            >
              <Input
                // disabled={!(myInfo?.active && !myInfo?.mute)}
                placeholder="Input your message"
                className={style.Input}
                size="large"
                prefix={<Icon component={EmojiSmileIcon} style={{ fontSize: 20 }} onClick={() => setShowEmoji(!showEmoji)} />}
              />
            </Form.Item>
            <Form.Item noStyle={true}>
              <Button
                size="large"
                ghost
                type="primary"
                htmlType="submit"
                icon={<Icon component={SendIcon} style={{ fontSize: 20, color: "var(--primary-color)" }} />}
              />
            </Form.Item>
          </Input.Group>
        </Form>
      )}
    </div>
  );
};

export default BoxMessenger;
