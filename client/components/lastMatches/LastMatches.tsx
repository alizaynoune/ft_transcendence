import style from "./lastMatches.module.css";
import { Table, Tag, Avatar, Badge } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React, { useContext } from "react";
import moment from "moment";
import Link from "next/link";
import { GameType, ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";

const LastMatches: React.FC = () => {
  const { lastMatches } = useContext(ProfileContext) as ProfileContextType;
  const columns: ColumnsType<GameType> = [
    {
      title: "User",
      dataIndex: "players",
      key: "players",
      render: (players) => (
        <Link href={`/profile/${players[1].users.username}`}>
          <a className={style.avatar}>
            <Badge
              dot
              status={
                players[0].users.status === "ONLINE" ? "success" : players[0].users.status === "PLAYING" ? "warning" : "error"
              }
            >
              <Avatar src={players[1].users.img_url} size="large" />
            </Badge>
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
        <Tag
          color={
            players[0].score > players[1].score
              ? "var(--success-color)"
              : players[0].score < players[1].score
              ? "var(--error-color)"
              : "var(--warning-color)"
          }
        >
          {players[0].score > players[1].score ? "WINNER" : players[0].score < players[1].score ? "LOSSER" : "N/N"}
        </Tag>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "Level",
      responsive: ["xl", "xxl"],
      render: (level) => <span>{`${level.slice(0, 1)}${level.slice(1).toLowerCase()}`}</span>,
    },
    {
      title: "Date",
      dataIndex: "updated_at",
      key: "Date",
      responsive: ["md", "lg", "xl", "xxl"],
      render: (updated_at) => <span>{moment(updated_at).fromNow()}</span>,
    },
    {
      title: "Duration",
      key: "duration",
      responsive: ["lg", "xl", "xxl"],
      render: (_, game) => <span>{moment(moment(game.updated_at).diff(game.created_at)).format("mm[min]:ss[ss]")}</span>,
    },
  ];

  return (
    <div className={style.container}>
      <Table
        className={style.table}
        rowClassName={(_, index) => (index % 2 === 0 ? style.tableRowLight : style.tableRowDark)}
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
