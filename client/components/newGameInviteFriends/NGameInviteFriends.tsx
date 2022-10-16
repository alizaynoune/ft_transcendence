import style from "./newGameInviteFriends.module.css";
import { Avatar, List, Skeleton, Input, Divider, Typography, Badge } from "antd";
import Icon from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "@/config/axios";
import { SearchIcon } from "@/icons/index";
import { UserType } from "@/types/types";

const { Title } = Typography;
const { Search } = Input;
const NGameInvitFriends: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const loadMoreData = async () => {
    setLoading(true);
    try {
      const cursor = data.at(-1)?.id || 1;
      const res = await axios.get(`/users/all?status=ONLINE&findBy=${filter}&cursor=${cursor}`);
      setHasMore(res.data.length === 20);
      setData((prev) => [...prev, ...res.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    loadMoreData()
  }, [filter])

  return (
    <div className={style.container}>
      <div className={style.searchContainer}>
        <Title
          level={5}
          italic
          type="secondary"
          style={{
            textAlign: "center",
            color: "var(--light-color)",
          }}
        >
          {"Invite Friend"}
        </Title>
        <Input
          className={style.search}
          size="large"
          placeholder="Enter name or email"
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value.length > 3){
              setData([])
              setFilter(e.target.value)
            }
          }}
          suffix={<Icon component={SearchIcon} style={{ fontSize: "135%", color: "var(--light-color)" }} />}
        />
      </div>
      <div id="scrollableDiv" className={style.scrollableDiv}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
          endMessage={<Divider plain>{"It is all, nothing more 🤐"}</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={style.FriendsList}
            itemLayout="horizontal"
            dataSource={data}
            loading={loading}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={loading} active>
                  <div
                    onClick={() => {
                      console.log(item.intra_id);
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot status={item.status === "ONLINE" ? "success" : item.status === "PLAYING" ? "warning" : "error"}>
                          <Avatar src={item.img_url} size="large" />
                        </Badge>
                      }
                      title={`${item.first_name} ${item.last_name}`}
                      description={item.email}
                    />
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default NGameInvitFriends;
