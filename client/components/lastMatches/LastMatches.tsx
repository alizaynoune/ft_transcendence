import style from "./lastMatches.module.css";
import { Space, Table, Tag, Avatar } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Link from "next/link";
import { LastMachesType, ProfileContextType } from "@/types/types";
import axios from "@/config/axios";
import { ProfileContext } from "context/profileContext";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const LastMatches: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  // const [users, setUsers] = useState<UserType[]>([]);
  // const [data, setData] = useState<DataType[]>([]);
  const { lastMatches, loadLastMatches } = useContext(ProfileContext) as ProfileContextType;
  const { intra_id } = useAppSelector(selectAuth);

  const loadData = async () => {
    try {
      const res = await axios.get("game/history");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // loadLastMatches()
    console.log(lastMatches);
  }, [lastMatches]);

  // useEffect(() => {
  //   if (!users.length) return;
  //   creatData();
  // }, [users]);

  const columns: ColumnsType<LastMachesType> = [
    {
      title: "User",
      dataIndex: "players",
      key: "players",
      render: (players) => (
        <Link href={`/profile/${players[1].users.username}`}>
          <a className={style.avatar}>
            <Avatar src={players[1].users.img_url} size="large" />
            <span className={style.username}>{players[1].users.username}</span>
          </a>
        </Link>
      ),
    },
    {
      title: "Result",
      dataIndex: "players",
      key: "Result",
      render: (players) => (
        <Tag color={players[0].score > players[1].score ? "var(--success-color)" : "var(--error-color)"}>
          {players[0].score > players[1].score ? 'WINNER' : 'LOSSER'}
        </Tag>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "Level",
      responsive: ["xl", "xxl"],
    },
    {
      title: "Date",
      dataIndex: "updatedat",
      key: "Date",
      responsive: ["md", "lg", "xl", "xxl"],
      render: (updatedat) => <span>{moment(updatedat).fromNow()}</span>,
    },
    {
      title: "Duration",
      // dataIndex: "",
      key: "duration",
      responsive: ["lg", "xl", "xxl"],
      render: (_, game) => <span>{moment(moment(game.updatedat).diff(game.createdat)).format('mm[min]:ss[ss]')}</span>,
    },
  ];

  return (
    <div className={style.container}>
      <Table
        className={style.table}
        rowClassName={(record, index) => (index % 2 === 0 ? style.tableRowLight : style.tableRowDark)}
        columns={columns}
        dataSource={lastMatches}
        rowKey={(record) => record.id}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default LastMatches;
