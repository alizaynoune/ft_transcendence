import style from "./conversations.module.css";
import React, { useState, useEffect, SetStateAction } from "react";
import NewConversation from "@/components/newConversation/NewConversation";
import { Input, Button, List, Skeleton, Divider, Avatar, Popover, Typography, Modal } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "@/config/axios";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
// icons
import Icon from "@ant-design/icons";
import { SearchIcon, AddGroupIcon } from "@/icons/index";
// Types
import { ConversationsType, MessageTextType } from "@/types/types";
import moment from "moment";
import Socket from "@/config/socket";

type PropsType = {
  setCurrentConversation: React.Dispatch<React.SetStateAction<ConversationsType | undefined>>;
};
const { Paragraph } = Typography;
const HistroyMessenger: React.FC<PropsType> = ({ setCurrentConversation }) => {
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState<ConversationsType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { intra_id } = useAppSelector(selectAuth);

  const loadMoreData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.get("conversation");
      setData(res.data);
      setLoading(false);
      setHasMore(res.data === 20);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMoreData();
    Socket.on("updateConversations", (data: ConversationsType) => {
      setData((prev) => {
        const find = prev.find((d) => d.id === data.id);
        if (!find) return [data, ...prev];
        else {
          const filter = prev.filter((d) => d.id !== data.id);
          return [data, ...filter];
        }
      });
    });

    return () => {
      Socket.off("updateConversations");
    };
  }, []);

  const modalConversation = (conversation: ConversationsType) => {
    return Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  };

  const changeConversation = (id: number) => {
    const conv = data.find((i) => i.id === id);
    conv && setCurrentConversation(conv);
    conv && modalConversation(conv)
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Input
          style={{
            borderRadius: "5px",
          }}
          suffix={<Icon component={SearchIcon} style={{ fontSize: "120%", color: "var(--primary-color)" }} />}
          placeholder="find friends"
        />
        <Popover
          className={style.popover}
          trigger="click"
          content={
            <NewConversation
              setConversations={(value: SetStateAction<ConversationsType[]>): void => {
                setData(value);
              }}
              setCurrentConversation={(value: SetStateAction<ConversationsType | undefined>): void => {
                setCurrentConversation(value);
              }}
            />
          }
          placement="bottomRight"
        >
          <Button type="primary" size="large" icon={<Icon component={AddGroupIcon} style={{ fontSize: "120%" }} />} />
        </Popover>
      </div>
      <div id="scrollableDiv" className={style.scrollableDiv}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={style.conversationList}
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ cursor: "pointer" }} onClick={() => changeConversation(item.id)}>
                <List.Item.Meta
                  avatar={
                    item.members.length == 2 ? (
                      <Avatar src={item.members[item.members[0].userid === intra_id ? 1 : 0].users.img_url} size="large" />
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
