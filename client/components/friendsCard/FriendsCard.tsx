import style from "./friendsCard.module.css";
import React, { useEffect, useState } from "react";
import { List, Avatar, Space } from "antd";
import Icon, {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  MoreOutlined,
} from "@ant-design/icons";
// import InfiniteScroll from 'react-infinite-scroll-component';
import DotsV from "@/icons/DotsV.svg";

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const FriendsCard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=16&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData(body.results);
        setLoading(false);
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
      <List
        dataSource={data}
        itemLayout="horizontal"
        grid={{
          gutter: 100,
          column: 2,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          total: 20,
          pageSize: 16,
        }}
        renderItem={(item) => (
          <List.Item
            key={item.email}
            actions={[
              <Icon
                component={DotsV}
                style={{ fontSize: "140%" }}
                onClick={(v) => console.log(v)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={item.name.last}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default FriendsCard;
