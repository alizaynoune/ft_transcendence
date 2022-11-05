import style from "./boxMessenger.module.css";
import { Input, Button, List, message, Form, InputRef, Divider, Avatar } from "antd";
import Icon, { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import MessageText from "@/components/messageText/MessageText";
import { useState, useEffect, useRef } from "react";
import axios from "@/config/axios";
import { MessageTextType, UserType, ConversationMemberType, ConversationsHistory } from "types/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import Socket from "@/config/socket";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const inputRef = useRef<InputRef>(null);
  const [messages, setMessages] = useState<DataType[]>([]);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);
  const [myInfo, setMyInfo] = useState<ConversationMemberType>();
  const [form] = Form.useForm();
  const [hasMore, setHasMore] = useState<boolean>(true);
  // const [firstMessagId, setFirstMessageId] = useState<number>(0)

  // useEffect(() => {
  //   bottomRef.current?.scroll({
  //     top: bottomRef.current.scrollHeight,
  //   });
  // }, [currentConversation]);

  const loadMoreData = async () => {
    console.log("loading.....");
    bottomRef.current?.scroll({
      top: bottomRef.current.scrollHeight,
    });

    try {
      const pageSize = 50;
      const url =
        messages.length && messages[0].conversationid === currentConversation.id
          ? `conversation/${currentConversation.id}/messages?cursor=${messages[0].id}&pageSize=${pageSize}`
          : `conversation/${currentConversation.id}/messages?pageSize=${pageSize}`;
      const res = (await axios.get(url)) as { data: DataType[] };
      console.log(res.data, "loading done");
      const reversData = res.data.reverse();
      setMessages((prev) => [...reversData, ...prev]);
      setHasMore(reversData.length === pageSize);
    } catch (error) {
      console.log(error);
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    console.log(messages, "update");
  }, [messages]);

  useEffect(() => {
    console.log(currentConversation, "current");
    setMyInfo(currentConversation.members.find((m) => m.userid === intra_id));
    
    loadMoreData();
    Socket.on("newMessage", (data: DataType) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      setMessages([]);
      Socket.off("newMessage");
    };
  }, [currentConversation]);

  const onFinish = (values: { new_message: string }) => {
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
      inputRef.current?.focus();
    });
    form.resetFields(["new_message"]);
    setShowEmoji(false);
    console.log(inputRef);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    const value = (form.getFieldValue("new_message") || "").concat(emojiObject.emoji);
    form.setFields([{ name: "new_message", value, errors: [] }]);
  };

  return (
    <div className={style.container}>
      <div id="scrollableBoxMessages" style={{ flexDirection: "column-reverse" }} ref={bottomRef} className={style.box}>
        {/* {!loading && <LoadingOutlined twoToneColor="#eb2f96" style={{ fontSize: 20, color: "var(--primary-color)" }} />} */}
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={""}
          scrollableTarget="scrollableBoxMessages"
          inverse={true}
        >
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(item) => (
              <>
                <h3>{item.id}</h3>
                <MessageText message={item} IamSender={item.members.users.intra_id === intra_id} />
              </>
            )}
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
              rules={[{ required: true, message: "Please select atlest on member!" }]}
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
  );
};

export default BoxMessenger;
