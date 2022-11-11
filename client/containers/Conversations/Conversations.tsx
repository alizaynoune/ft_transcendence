import style from "./conversations.module.css";
import React, { useState, useEffect, SetStateAction, useContext } from "react";
import NewConversation from "@/components/newConversation/NewConversation";
import {
  Input,
  Button,
  List,
  Skeleton,
  Divider,
  Avatar,
  Popover,
  Typography,
  Modal,
  message,
  Form,
  Select,
  Space,
  TypographyProps,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
// icons
import Icon, { ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchIcon, AddGroupIcon } from "@/icons/index";
// Types
import { ConversationMemberType, ConversationsType, MessengerContextType, PromiseReturn } from "@/types/types";
import moment from "moment";
import { MessengerContext } from "context/massengerContext";
import axios from "@/config/axios";
import type { SelectProps } from "antd";

const labelConversations = (members: ConversationMemberType[]) => {
  return members.map((m, key) => {
    return <Avatar key={key} src={m.users.img_url} />;
  });
};
const { Text } = Typography;
const { Paragraph } = Typography;
const HistroyMessenger: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { intra_id } = useAppSelector(selectAuth);
  const [form] = Form.useForm();
  const [search, setSearch] = useState<SelectProps["options"]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [joinPassword, setJoinPassword] = useState<string>();
  const { conversations, hasMoreConversations, loadConversations, changeCurrentConversation, joinConversation } = useContext(
    MessengerContext
  ) as MessengerContextType;

  const loadMoreData = async () => {
    try {
      setLoading(true);
      await loadConversations();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleJoinConversation = (conv: ConversationsType) => {
    Modal.confirm({
      title: `Are you sure to join this conversation ${conv.title}`,
      content: conv.protected ? (
        <Form form={form}>
          <Form.Item name={"password"}>
            <Input />
          </Form.Item>
        </Form>
      ) : null,
      async onOk() {
        try {
          const res = (await joinConversation(conv.id, form.getFieldValue("password"))) as string;
          message.success(res);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
      onCancel() {},
    });
  };

  const searchConversations = async (value: string) => {
    try {
      const url = `conversation/search?title=${value}&pageSize=${40}&cursor=${search?.at(-1)?.value || 1}`;
      const res = (await axios.get(url)) as { data: ConversationsType[] };
      console.log(res.data);

      const data = res.data.map((item: ConversationsType) => ({
        value: item.id,
        label: (
          <Space style={{ justifyContent: "space-between", width: "100%" }}>
            <Avatar.Group maxCount={2} maxPopoverTrigger="click">
              {labelConversations(item.members)}
            </Avatar.Group>
            <Text>{item.title}</Text>
            <Button type="primary" onClick={() => handleJoinConversation(item)}>
              Join
            </Button>
          </Space>
        ),
      })) as SelectProps["options"];
      setSearch(data);
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  const changeConversation = async (conversation: ConversationsType) => {
    if (conversation.protected) {
      Modal.info({
        title: "Do you want to delete these items?",
        closable: true,
        content: (
          <Form form={form}>
            <Form.Item name="password" rules={[{ required: true, min: 6, max: 20 }]}>
              <Input />
            </Form.Item>
          </Form>
        ),
        async onOk() {
          try {
            const res = await changeCurrentConversation(conversation.id, form.getFieldValue("password"));
            console.log(res, "error");
          } catch (error: any) {
            message.error(error instanceof Error ? error.message : error);
          }
        },
        onCancel() {},
      });
    } else {
      try {
        const res = await changeCurrentConversation(conversation.id);
        console.log("done");
      } catch (error: any) {
        message.error(error instanceof Error ? error.message : error);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Select
          showSearch
          size="large"
          style={{ width: "100%", borderRadius: "5px" }}
          placeholder="find public conversations"
          defaultActiveFirstOption={false}
          showArrow={false}
          value={null}
          filterOption={false}
          onSearch={searchConversations}
          notFoundContent={null}
          options={search}
        />
        <Popover className={style.popover} trigger="click" content={<NewConversation />} placement="bottomRight">
          <Button type="primary" size="large" icon={<Icon component={AddGroupIcon} style={{ fontSize: "120%" }} />} />
        </Popover>
      </div>
      <div id="scrollableDiv" className={style.scrollableDiv}>
        <InfiniteScroll
          dataLength={conversations.length}
          next={loadMoreData}
          hasMore={hasMoreConversations}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={style.conversationList}
            loading={loading}
            itemLayout="horizontal"
            dataSource={conversations}
            renderItem={(item) => (
              <List.Item style={{ cursor: "pointer" }} onClick={() => changeConversation(item)}>
                <List.Item.Meta
                  avatar={
                    item.type === "DIRECT" || item.members.length === 1 ? (
                      <Avatar
                        src={item.members[item.type === "DIRECT" && item.members[0].userid === intra_id ? 1 : 0].users.img_url}
                        size="large"
                      />
                    ) : (
                      <Avatar.Group maxCount={2} maxPopoverTrigger="click">
                        {item.members.map((m, key) => m.userid !== intra_id && <Avatar src={m.users.img_url} key={key} />)}
                      </Avatar.Group>
                    )
                  }
                  title={
                    item.type === "GROUP" ? item.title : item.members[item.members[0].userid === intra_id ? 1 : 0].users.username
                  }
                  // description={
                  //   <Paragraph ellipsis type="secondary" style={{ width: "90%" }}>
                  //     {item.message[0]?.message}
                  //   </Paragraph>
                  // }
                />
                <Paragraph type="secondary">{moment(item.updated_at).fromNow()}</Paragraph>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default HistroyMessenger;
