import style from "./currentGame.module.css";
import { Space, Skeleton, List, Divider, Typography } from "antd";
import axios from "@/config/axios";
import CurrentGameCard from "@/components/currentGameCard/CurrentGameCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {GameType} from '@/types/types'

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
  const [data, setData] = useState<GameType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true)
  // const [list, setList] = useState<DataType[] | []>([]);
  const loadMoreData = async () => {
    setLoading(true)
    const cursor = (data.at(-1)?.id || 0) + 1
    try {
      const res = await axios.get(`/game/current?cursor=${cursor}`)
      console.log(res.data);
      setHasMore(res.data.length === 40)
      setLoading(false)
      setData(prev => [...prev, ...res.data])
      
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    console.log(hasMore);
    
  }, [hasMore]);

  return (
    <div id="scrollableDiv" className={style.container}>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={hasMore} // ! change to length of result
        loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        {/* {data.length ? ( */}
          <List
            className={style.list}
            loading={loading}
            itemLayout="horizontal"
            dataSource={data}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 3,
              xxl: 3,
            }}
            renderItem={(item) => (
              <List.Item style={{ cursor: "pointer" }}>
                <CurrentGameCard {...item} />
              </List.Item>
            )}
          />
        {/* ) : null} */}
      </InfiniteScroll>
    </div>
  );
};

export default CurrentGame;
