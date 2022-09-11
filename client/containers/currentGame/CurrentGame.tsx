import style from "./currentGame.module.css";
import { Space, Skeleton, List, Divider, Typography } from "antd";
import axios from "@/config/axios";
import CurrentGameCard from "@/components/currentGameCard/CurrentGameCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface PlayerType {
  id: string;
  username: string;
  avatar: string;
  score: number;
}
interface DataType {
  id: string;
  users: [PlayerType, PlayerType];
}

const { Paragraph } = Typography;
const CurrentGame: React.FC = () => {
  const [data, setData] = useState<DataType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<DataType[] | []>([]);
  const loadMoreData = async () => {
      console.log('load more data');
    if (loading) {
      return;
    }
    setLoading(true);
    try {
        const res = await axios.get("api/fake/currentGames")
        console.log(res.data);
        setData(old => [...old, ...res.data])
        setLoading(false)
    } catch (error) {
        console.log('error');
        setLoading(false)
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    setList((old) => [...old, ...data]);
    console.log(data);
  }, [data]);

  return (
    <div
    id="scrollableDiv"
    style={{
      height: 900,
      overflow: 'auto',
      padding: '0 16px',
      border: '1px solid rgba(140, 140, 140, 0.35)',
    }} // romve it
  >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50} // ! change to length of result
        loader={<Skeleton avatar paragraph={{ rows: 2 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        {data.length ? (
          <List
            className={style.conversationList}
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: "pointer" }}
              >
                  <CurrentGameCard {...item} />
                {/* <List.Item.Meta
                  avatar={item.users[0].avatar}
                  title={item.users[0].username}
                  description={
                    <Paragraph
                      ellipsis
                      type="secondary"
                      style={{ width: "90%" }}
                    >
                      {"done"}
                    </Paragraph>
                  }
                /> */}
              </List.Item>
            )}
          />
        ): null}
      </InfiniteScroll>
      </div>
  );
};

export default CurrentGame;
