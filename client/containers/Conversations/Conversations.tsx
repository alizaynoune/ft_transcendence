import style from "./conversations.module.css";
import React, { useState, useEffect } from "react";
import NewConversation from "@/components/newConversation/NewConversation";
import {
  Input,
  Button,
  List,
  Skeleton,
  Divider,
  Avatar,
  Typography,
  Popover,
  Space,
  Badge,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
// icons
import Icon from "@ant-design/icons";
import { SearchIcon, AddGroupIcon } from "@/icons/index";
// Types
import { ConversationsType } from "@/types/types";

const { Paragraph } = Typography;
type PropsType = {
  setCurrentConversation: React.Dispatch<
    React.SetStateAction<ConversationsType | undefined>
  >;
};

const HistroyMessenger: React.FC<PropsType> = ({ setCurrentConversation }) => {
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState<ConversationsType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch("http://localhost:3000/api/fake/conversations")
      .then((res) => res.json())
      .then((body) => {
        setData((old) => [...old, ...body.result]);
        setLoading(false);
        setInitLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
    //
  }, []);

  const changeConversation = (id: string) => {
    const conv = data.find((i) => i.id === id);
    conv && setCurrentConversation(conv);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Input
          style={{
            borderRadius: "5px",
          }}
          suffix={
            <Icon
              component={SearchIcon}
              style={{ fontSize: "120%", color: "var(--primary-color)" }}
            />
          }
          placeholder="find friends"
        />
        <Popover
          className={style.popover}
          trigger="click"
          content={<NewConversation />}
          placement="bottomRight"
        >
          <Button
            type="primary"
            size="large"
            icon={
              <Icon component={AddGroupIcon} style={{ fontSize: "120%" }} />
            }
          />
        </Popover>
      </div>
      <div id="scrollableDiv" className={style.scrollableDiv}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50} // ! change to length of result
          loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={style.conversationList}
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => changeConversation(item.id)}
              >
                <List.Item.Meta
                  avatar={
                    item.members.length == 2 ? (
                      <Avatar
                        src={item.members[Math.floor(Math.random() * 2)].avatar}
                        size="large"
                      />
                    ) : (
                      <Avatar.Group maxCount={2} maxPopoverTrigger="click">
                        {item.members.map((m, key) => (
                          <Avatar src={m.avatar} key={key} />
                        ))}
                      </Avatar.Group>
                    )
                  }
                  title={
                    item.type === "group"
                      ? item.name
                      : item.members[0].name.username // ! change to reciver name
                  }
                  description={
                    <Paragraph
                      ellipsis
                      type="secondary"
                      style={{ width: "90%" }}
                    >
                      {item.lastMessage.content}
                    </Paragraph>
                  }
                />
                <Space direction="vertical" style={{ alignItems: "flex-end" }}>
                  <Badge count={3} style={{backgroundColor: 'var(--primary-color)'}} />
                  <Paragraph type="secondary">
                    {moment(item.lastMessage.date).fromNow()}
                  </Paragraph>
                </Space>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default HistroyMessenger;
