import style from "./game.module.css";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Space, Spin, Typography, Tag } from "antd";
import Icon, { EyeFilled } from "@ant-design/icons";
import Canvas from "@/containers/canvas/Canvas";
import {OutIcon} from '@/icons/index'

interface GameType {
  id: string;
  watching: number;
  players: { id: string; username: string; avatar: string; scor: number }[];
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
          scor: Math.floor(Math.random() * 10),
        })
      )
    );
}

const { Text, Title } = Typography;
const Games: React.FC = () => {
  const [gameData, setGameData] = useState<GameType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUserList()
      .then((res) => {
        console.log(res);
        setGameData({
          id: "id",
          watching: Math.floor(Math.random() * 100),
          players: res,
        });
        setLoading(false);
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
            <Space className={style.header} split={<Title style={{
              color: 'var(--error-color)',
              fontStyle: 'italic'
            }}>{'VS'}</Title>}>
              <Space>
                <Space direction="vertical">
                  <Avatar src={gameData?.players[0].avatar} size={50} style={{border: 'solid var(--success-color) 4px'}}/>
                  <Text className={style.username}strong   style={{color: 'var(--success-color)'}} >{gameData?.players[0].username}</Text>
                </Space>
                <Title  style={{color: 'var(--success-color)'}}>{gameData?.players[0].scor}</Title>
              </Space>
              <Space >
                <Title style={{color: 'var(--primary-color)'}}>{gameData?.players[1].scor}</Title>
                <Space direction="vertical" align="end">
                  <Avatar src={gameData?.players[1].avatar}  size={50} style={{border: 'solid var(--primary-color) 4px'}} />
                  <Text className={style.username} strong  style={{color: 'var(--primary-color)'}} >{gameData?.players[1].username}</Text>
                </Space>
              </Space>
            </Space>
            <Canvas />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Tag icon={<EyeFilled />} color="var(--primary-color)" style={{padding: '6px 8px'}}> {gameData?.watching}</Tag>
              <Button type="primary" danger icon={<Icon component={OutIcon} />} >Leave</Button>
            </div>
          </>
        )}
      </div>
    </Spin>
  );
};

export default Games;
