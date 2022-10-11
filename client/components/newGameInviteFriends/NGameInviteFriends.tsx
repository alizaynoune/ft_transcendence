import style from "./newGameInviteFriends.module.css";
import { Avatar, Button, List, Skeleton, AutoComplete, Input, Divider, Typography } from "antd";
import Icon from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "@/config/axios";
import { SendIcon, SearchIcon } from "@/icons/index";
import { UserType } from "@/types/types";

const { Text, Paragraph, Title } = Typography;

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
  // loading: boolean;
}

// cover: "https://random.imagecdn.app/1800/800";
// created_at: "2022-10-11T14:00:35.893Z";
// email: "ali@ali.ali";
// first_name: "Ali";
// id: 1;
// img_url: "https://cdn.intra.42.fr/users/alzaynou.jpg";
// intra_id: 51111;
// last_name: "Zaynoune";
// status: "OFFLINE";
// updated_at: "2022-10-11T14:00:35.893Z";
// username: "alizay";

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const NGameInvitFriends: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserType[]>([]);
  const [list, setList] = useState<UserType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMoreData = async () => {
    console.log(data.at(-1), "last element");
    try {
      const cursor = data.at(-1)?.id || 1;
      console.log(cursor);

      const res = await axios.get(`/users/all?cursor=${cursor}`);
      // setList(res.data);
      setHasMore(res.data.length === 20);
      setData((prev) => [...prev, ...res.data]);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(data, hasMore);
  }, [data, hasMore]);

  useEffect(() => {
    loadMoreData();
  }, []);

  // const filter = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const value = e.target.value.toLowerCase();
  //   if (value.length > 3) {
  //     setLoading(true);
  //     try {
  //       console.log("fetching");

  //       const res = await fetch(fakeDataUrl);
  //       const res_1 = await res.json();
  //       console.log([...res_1.results, ...data]);
  //       const newData = data.concat(res_1.results);
  //       // setList(old => [...old, ...res_1.results])
  //       const newList = newData.filter((item) => {
  //         return (
  //           item.email.toLocaleLowerCase().includes(value) ||
  //           item.first_name.toLocaleLowerCase().includes(value) ||
  //           item.last_name.toLocaleLowerCase().includes(value)
  //         );
  //       });
  //       setList(newList);
  //       console.log(newList);

  //       setLoading(false);
  //     } catch (error) {
  //       console.log("error");

  //       setLoading(false);
  //     }
  //   }
  //   //console.log(value);
  //   else {
  //     const newList = data.filter((item) => {
  //       return (
  //         item.email.toLocaleLowerCase().includes(value) ||
  //         item.first_name.toLocaleLowerCase().includes(value) ||
  //         item.last_name.toLocaleLowerCase().includes(value)
  //       );
  //     });
  //     setList(newList);
  //   }
  // };

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
          // onChange={filter}
          suffix={<Icon component={SearchIcon} style={{ fontSize: "135%", color: "var(--light-color)" }} />}
        />
      </div>
      <div id="scrollableDiv" className={style.scrollableDiv}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore} // {data.length < 50} // ! change to length of result
          loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
          endMessage={<Divider plain>{"It is all, nothing more 🤐"}</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className={style.FriendsList}
            // loading={!hasMore}
            itemLayout="horizontal"
            dataSource={data}
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
                      avatar={<Avatar src={item.img_url} size="large" />}
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
