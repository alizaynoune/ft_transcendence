import style from "./lastMatches.module.css";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState, useEffect } from "react";
import moment from "moment";

interface UserType {
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
  };
}

interface DataType {
  key: number;
  user: string;
  result: string;
  gamelevel: string;
  date: Date;
  duration: number;
  avatar: string;
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const LastMatches: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture,login&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setUsers(body.results);
        setLoading(false);
        //   console.log(body.results);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const creatData = () => {
    let levels: Array<string> = ["easier", "medium", "difficult"];
    let result: Array<string> = ["winn", "loss"];
    let D: DataType[] = [];
    users.forEach((u, i) => {
      D.push({
        key: i,
        user: u.login.username,
        result: result[Math.floor(Math.random() * 2)],
        gamelevel: levels[Math.floor(Math.random() * 3)],
        date: randomDate(new Date(2012, 0, 1), new Date()),
        duration: Math.floor(Math.random() * 10) + 1,
        avatar: u.picture.large,
      });
    });
    setData(D);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    if (!users.length) return;
    creatData();
  }, [users]);

  useEffect(() => {
    console.group("data");
    console.log(data);
    console.groupEnd();
  }, [data]);
//   moment(item.createdAt).fromNow()
  const columns: ColumnsType<DataType> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: result => <Tag key={result}
      color={result === 'winn' ? 'var(--success-color)' : 'var(--error-color)'}
      >
          {result.toUpperCase()}
      </Tag>
    },
    {
      title: "Level",
      dataIndex: "gamelevel",
      key: "level",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: date => <span>{moment(date).fromNow()}</span>
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default LastMatches;
