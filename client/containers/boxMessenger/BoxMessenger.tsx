import style from "./boxMessenger.module.css";
import { Input, Button, List, message, Form, InputRef, Divider, Avatar, Empty } from "antd";
import Icon, { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import MessageText from "@/components/messageText/MessageText";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "@/config/axios";
import { MessageTextType, UserType, ConversationMemberType, ConversationsType, MessengerContextType } from "types/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import Socket from "@/config/socket";
import InfiniteScroll from "react-infinite-scroll-component";
//Icons
import { EmojiSmileIcon, SendIcon } from "@/icons/index";
import { MessengerContext } from "context/massengerContext";

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
const BoxMessenger: React.FC = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);
  // const [messages, setMessages] = useState<DataType[]>([]);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  const [form] = Form.useForm();
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const { currentConversation, loadMessages, messages, hasMoreMessages, sendMessage } = useContext(
    MessengerContext
  ) as MessengerContextType;

  const loadMoreData = async () => {
    console.log("loading.....");
    bottomRef.current?.scroll({
      top: bottomRef.current.scrollHeight,
    });
    try {
      await loadMessages();
    } catch (error) {
      message.error(error instanceof Error ? error.message : (error as string));
    }
  };

  useEffect(() => {
    console.log(currentConversation, "current");
    setMyInfo(currentConversation?.members.find((m) => m.userid === intra_id));

    loadMoreData();
  }, [currentConversation]);

  const onFinish = async (values: { new_message: string }) => {
    const { new_message } = values;
    try {
      await sendMessage(new_message);
      form.resetFields(["new_message"]);
      setShowEmoji(false);
      console.log(inputRef.current);
      inputRef.current?.focus();
      console.log(inputRef.current);
    } catch (error) {
      message.error(error instanceof Error ? error.message : (error as string));
    }
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    const value = (form.getFieldValue("new_message") || "").concat(emojiObject.emoji);
    form.setFields([{ name: "new_message", value, errors: [] }]);
  };

  return currentConversation ? (
    <div className={style.container}>
      <div id="scrollableBoxMessages" style={{ flexDirection: "column-reverse" }} ref={bottomRef} className={style.box}>
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMoreData}
          hasMore={hasMoreMessages}
          loader={""}
          scrollableTarget="scrollableBoxMessages"
          inverse={true}
        >
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => <MessageText message={item} IamSender={item.users.intra_id === intra_id} />}
          />
        </InfiniteScroll>
      </div>
      {showEmoji ? (
        <div className={style.Picker}>
          <CloseOutlined
            onClick={() => {
              setShowEmoji(false);
              inputRef.current?.focus();
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
              rules={[{ required: true, message: "Please input your message" }]}
              style={{
                width: "calc(100% - 40px)",
              }}
            >
              <Input
                ref={inputRef}
                placeholder="Input your message"
                className={style.Input}
                size="large"
                prefix={<Icon component={EmojiSmileIcon} style={{ fontSize: 20 }} onClick={() => setShowEmoji(!showEmoji)} />}
                onFocus={() => setShowEmoji(false)}
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
  ) : (
    <Empty description="No Conversation was selected." />
  );
};

export default BoxMessenger;
