import style from "./historyMessenger.module.css";
import { useState, useEffect } from "react";
import { Input, Button, List, Skeleton, Divider, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Icon from "@ant-design/icons";

// components
import ConversationCard from "@/components/conversationCard/ConversationCard";

// icons
import searchIcon from "@/icons/search.svg";
import createGroupIcon from "@/icons/addGroup.svg";
// import { group } from "console";

// Types
import {ConversationsType} from '@/types/types'

const HistroyMessenger: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState<ConversationsType[]>([]);
  const [list, setList] = useState<ConversationsType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "http://localhost:3000/api/fake/conversations"
    )
      .then((res) => res.json())
      .then((body) => {
        setData(old => body.result);
        console.log(data);
        setLoading(false);
        setInitLoading(false)
        // window.dispatchEvent(new Event("resize"));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // const loadMore =
  // !initLoading && loading ? (
  //   <div
  //     style={{
  //       textAlign: "center",
  //       marginTop: 12,
  //       height: 32,
  //       lineHeight: "32px",
  //     }}
  //   >
  //     {/* <Button onClick={loadMoreData}>loading more</Button> */}
  //   </div>
  // ) : null;

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Input
          style={{
            borderRadius: "5px",
          }}
          suffix={
            <Icon
              component={searchIcon}
              style={{ fontSize: "120%", color: "var(--primary-color)" }}
            />
          }
          placeholder="find friends"
        />
        <Button
          type="primary"
          size="large"
          icon={
            <Icon component={createGroupIcon} style={{ fontSize: "120%" }} />
          }
        />
      </div>
      <div id="scrollableDiv" className={style.scrollableDiv}>
      <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50} // ! change to length of result
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={style.FriendsList}
            loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.members[0].avatar} size="large" />}
                    title={item.members[0].name.username}
                    description={item.lastMessage.content}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
        {/* <List
          dataSource={data}
          // itemLayout="horizontal"
          // grid={{
          //   gutter: 10,
          //   column: 2,
          // }}
          // pagination={{
          //   onChange: (page) => {
          //     console.log(page);
          //   },
          //   total: 20,
          //   pageSize: 16,
          // }}
          renderItem={(item) => <ConversationCard {...item} />}
        /> */}
      </div>
    </div>
  );
};

export default HistroyMessenger;
