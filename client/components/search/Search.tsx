import style from "./search.module.css";
import { Dropdown, Menu, Typography, Avatar, Badge, Input, List, Divider, Skeleton } from "antd";
import type { MenuProps } from "antd";
import Icon from "@ant-design/icons";
import { SearchIcon } from "@/icons/index";
import { useEffect, useState } from "react";
import { UserType } from "@/types/types";
import axios from "@/config/axios";
import InfiniteScroll from "react-infinite-scroll-component";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  disabled: Boolean,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    disabled,
    children,
    label,
  } as MenuItem;
}

const Search: React.FC = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMoreData = async () => {
    try {
      const cursor = data.at(-1)?.id || 1;
      const res = await axios.get(`/users/all?status=ONLINE&findBy=${filter}&cursor=${cursor}`);
      setHasMore(res.data.length === 20);
      setData((prev) => [...prev, ...res.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (visible) loadMoreData();
  }, [visible, filter]);

  return (
    <div className={style.container}>
      <Input
        className={style.search}
        size="large"
        placeholder="Search"
        suffix={<Icon component={SearchIcon} style={{ fontSize: "135%", color: "var(--light-color)" }} />}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
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
                      <Badge dot status="success">
                        <Avatar src={item.img_url} size="large" />
                      </Badge>
                    }
                    title={item.username}
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
