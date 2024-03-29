import style from "./search.module.css";
import { Avatar, Badge, Input, List, Divider, Skeleton, message } from "antd";
import Icon from "@ant-design/icons";
import { SearchIcon } from "@/icons/index";
import { useEffect, useRef, useState, RefObject } from "react";
import { UserType } from "@/types/types";
import axios from "@/config/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};
const Search: React.FC = () => {
  const { intra_id } = useAppSelector(selectAuth);
  const [data, setData] = useState<UserType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const Ref = useRef<HTMLDivElement>(null);

  const clickOutsidehandler = () => {
    setVisible(false);
  };
  useOnClickOutside(Ref, clickOutsidehandler);

  const loadMoreData = async () => {
    setLoading(true);
    try {
      const cursor = data.at(-1)?.id || 1;
      const res = await axios.get(`/users/all?findBy=${filter}&cursor=${cursor}`);
      setHasMore(res.data.length === 20);
      setData((prev) => [...prev, ...res.data.filter((d: UserType) => d.intra_id !== intra_id)]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    if (visible) loadMoreData();
  }, [visible, filter]);

  return (
    <div className={style.container} ref={Ref}>
      <Input
        className={style.search}
        size="large"
        placeholder="Search"
        suffix={<Icon component={SearchIcon} style={{ fontSize: "135%", color: "var(--light-color)" }} />}
        onFocus={() => setVisible(true)}
        onChange={(e) => {
          setData([]);
          setFilter(e.target.value);
        }}
      />
      {visible && (
        <div id="scrollableDivListUsers" className={style.scrollableDiv}>
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>{"It is all, nothing more 🤐"}</Divider>}
            scrollableTarget="scrollableDivListUsers"
          >
            <List
              bordered
              dataSource={data}
              loading={loading}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Link href={`/profile/${item.username}`}>
                        <a>
                          <Badge
                            dot
                            status={item.status === "ONLINE" ? "success" : item.status === "PLAYING" ? "warning" : "error"}
                          >
                            <Avatar src={item.img_url} size="large" />
                          </Badge>
                        </a>
                      </Link>
                    }
                    title={<Link href={`/profile/${item.username}`}>{item.username}</Link>}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Search;
