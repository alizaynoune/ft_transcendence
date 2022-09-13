import style from "./friendsList.module.css";
import React, { useEffect, useState } from "react";
import { List } from "antd";
import UserCard from "@/components/userCard/UserCard";




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
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }
}


const FriendsCard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=16&inc=name,gender,email,nat,picture,login&noinfo"
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
         className={style.list}
        dataSource={data}
        itemLayout="horizontal"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          total: 20,
          pageSize: 16,
        }}
        renderItem={(item) => (
          <UserCard type="friend" user={item} />
        )}
      />
    </div>
  );
};

export default FriendsCard;
