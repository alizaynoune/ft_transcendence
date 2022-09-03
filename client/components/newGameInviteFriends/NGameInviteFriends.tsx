import style from "./newGameInviteFriends.module.css";
import { Avatar, Button, List, Skeleton, AutoComplete, Input, Divider } from "antd";
import Icon from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import SendIcon from "@/icons/Send.svg";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const NGameInvitFriends: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const loadMoreData = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        {/* <Button onClick={loadMoreData}>loading more</Button> */}
      </div>
    ) : null;

  const filter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.toLowerCase();
    console.log(value);

    const newList = data.filter((item) => {
      return (
        item.email?.toLocaleLowerCase()?.includes(value) ||
        item.name?.first?.toLocaleLowerCase()?.includes(value) ||
        item.name?.last?.toLocaleLowerCase()?.includes(value)
      );
    });
    setList(newList);
  };

  return (
    <div className={style.container}
    >
      {/* <h1>{'Invite Freinds'}</h1> */}
      <Input.Search
        className={style.search}
        size="large"
        placeholder="Invite Freinds"
        onChange={filter}
      />
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
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} size="large" />}
                  title={item.name?.first + " " + item.name?.last}
                  description={item.email}
                />
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
