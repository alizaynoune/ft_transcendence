import style from "./historyMessenger.module.css";
import { useState, useEffect } from "react";
import { Input, Button, List, Skeleton, Divider, Avatar, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Icon, { BoldOutlined } from "@ant-design/icons";
import moment from "moment";

// icons
import searchIcon from "@/icons/search.svg";
import createGroupIcon from "@/icons/addGroup.svg";
// import { group } from "console";

// Types
import { ConversationsType } from "@/types/types";
import Link from "next/link";


const {Paragraph} = Typography
const HistroyMessenger: React.FC = () => {
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
        console.log(body.result, 'result');
        
        // window.dispatchEvent(new Event("resize"));
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
            className={style.conversationList}
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  {/* <Link href='#'> */}
                  <List.Item.Meta
                    avatar={
                      item.members.length == 2 ? (
                        <Avatar src={item.members[Math.floor(Math.random() * 2)].avatar} size="large" />
                        ) : (
                          <Avatar.Group maxCount={2} maxPopoverTrigger='click'>
                          {item.members.map((m, key) => (
                            <Avatar src={m.avatar} key={key} />
                            ))}
                        </Avatar.Group>
                      )
                    }
                    title={item.members[0].name.username}
                    description={<Paragraph ellipsis type="secondary" style={{width: '100%'}} >{item.lastMessage.content}</Paragraph>}
                    />
                  <Paragraph type="secondary">{moment(item.lastMessage.date).fromNow()}</Paragraph>
                    {/* </Link> */}
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default HistroyMessenger;
