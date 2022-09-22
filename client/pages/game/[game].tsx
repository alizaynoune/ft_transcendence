import style from "./game.module.css";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Space, Spin } from "antd";
import Icon, { EyeFilled } from "@ant-design/icons";

import Canvas from "@/containers/canvas/Canvas";

interface GameType {
  id: string;
  watching: number;
  players: { id: string; username: string; avatar: string; point: number }[];
}

async function fetchUserList() {
  return fetch("https://randomuser.me/api/?results=2&inc=picture,login&noinfo")
    .then((response) => response.json())
    .then((body) =>
      body.results.map(
        (user: {
          login: { username: string; uuid: string };
          picture: { large: string };
        }) => ({
          id: user.login.uuid,
          username: user.login.username,
          avatar: user.picture.large,
          point: Math.floor(Math.random() * 10),
        })
      )
    );
}

const Games: React.FC = () => {
  const [gameData, setGameData] = useState<GameType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetchUserList()
      .then((res) => {
        console.log(res);
        setGameData({
          id: "id",
          watching: Math.floor(Math.random() * 100),
          players: res,
        });
        setLoading(false)
      })
      .catch((err) => {
        console.log(err, "error<<<<<<");
      });
  }, []);

  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  return (
    <Spin spinning={loading} delay={500}>
      <div className={style.container}>
        {!loading && (
          <>
          <div>Header</div>
            <Canvas />
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', padding: 10}}>
              <Button type="primary" icon={<EyeFilled />}>{gameData?.watching}</Button>
              <Button type="primary">Leave</Button>
            </div>
          </>
        )}
      </div>
    </Spin>
  );
};

export default Games;
