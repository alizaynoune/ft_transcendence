import style from "./game.module.css";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Space, Spin, Typography, Tag, message, Modal } from "antd";
import Icon, { EyeFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import Canvas from "@/containers/canvas/Canvas";
import { OutIcon } from "@/icons/index";
import authRoute from "@/tools/protectedRoutes";
import { useRouter } from "next/router";
import { GameType } from "@/types/types";
import axios from "@/config/axios";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import Socket from "@/config/socket";

interface RefType {
  parentMoveRaquet: (action: "RIGHT" | "LEFT") => void;
}
const { Text, Title } = Typography;
const Games: React.FC = () => {
  const [gameData, setGameData] = useState<GameType>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { query, isReady } = router;
  const { intra_id } = useAppSelector(selectAuth);
  const [IamPlayer, setIamPlayer] = useState<boolean>(false);
  const [watchers, setWatchers] = useState<number>(0);
  const canvasRef = useRef<RefType>(null!);

  const loadGame = async () => {
    try {
      const res = await axios.get<GameType>(`/game/?gameId=${query.game}`);
      const { data } = res;
      if (data.players[0].users.intra_id === intra_id || data.players[1].users.intra_id === intra_id) setIamPlayer(true);
      setGameData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error instanceof Error && message.error(error.message);
    }
  };

  const leaveGame = async () => {
    Modal.confirm({
      title: "Are you sure to leave this game",
      okButtonProps: { danger: true },
      cancelButtonProps: { type: "primary" },
      async onOk() {
        try {
          const res = await axios.put("/game/leaveGame", { gameId: gameData?.id });
          // Socket.emit("leaveGame", { gameId: gameData?.id });
          message.success(res.data.message);
          router.push("/game/new");
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
    });
  };

  useEffect(() => {
    Socket.on("updateGame", (data) => {
      setGameData(data);
    });
    Socket.on("updateScore", (data: any) => {
      setGameData((prev) => {
        if (prev) return { ...prev, players: data };
      });
    });
    return () => {
      Socket.off("updateGame");
    };
  }, []);

  useEffect(() => {
    if (query.game) loadGame();
  }, [isReady, query.game]);

  useEffect(() => {
    if (gameData && !IamPlayer) {
      Socket.emit("joinWatcher", { gameId: gameData.id });
      return () => {
        Socket.emit("leaveWatcher", { gameId: gameData.id });
      };
    }
  }, [gameData]);

  useEffect(() => {
    Socket.on("countWatchers", (data) => {
      setWatchers(data.total);
    });
    return () => {
      Socket.off("countWatchers");
    };
  }, []);

  return (
    <Spin spinning={loading} delay={500}>
      <div className={style.container}>
        {!loading && gameData && (
          <>
            <Space
              className={style.header}
              split={
                <Title
                  style={{
                    color: "var(--error-color)",
                    fontStyle: "italic",
                  }}
                >
                  {"VS"}
                </Title>
              }
            >
              <Space>
                <Space direction="vertical">
                  <Avatar
                    src={gameData.players[0].users.img_url}
                    size={50}
                    style={{ border: "solid var(--success-color) 4px" }}
                  />
                  <Text className={style.username} strong style={{ color: "var(--success-color)" }}>
                    {gameData.players[0].users.username}
                  </Text>
                </Space>
                <Title style={{ color: "var(--success-color)" }}>{gameData?.players[0].score}</Title>
              </Space>
              <Space>
                <Title style={{ color: "var(--primary-color)" }}>{gameData.players[1].score}</Title>
                <Space direction="vertical" align="end">
                  <Avatar
                    src={gameData.players[1].users.img_url}
                    size={50}
                    style={{ border: "solid var(--primary-color) 4px" }}
                  />
                  <Text className={style.username} strong style={{ color: "var(--primary-color)" }}>
                    {gameData.players[1].users.username}
                  </Text>
                </Space>
              </Space>
            </Space>
            <Canvas game={gameData} IamPlayer={IamPlayer} intraId={intra_id} ref={canvasRef} />
            {gameData.status !== "END" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Tag icon={<EyeFilled />} color="var(--primary-color)" style={{ padding: "6px 8px" }}>
                  {watchers}
                </Tag>
                {IamPlayer && (
                  <Button type="primary" danger icon={<Icon component={OutIcon} />} onClick={() => leaveGame()}>
                    {"Leave"}
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Space className={style.buttons} style={{ width: "100%", justifyContent: "space-around", padding: "20px 0" }}>
        <Button size="large" type="primary" icon={<LeftOutlined />} onClick={() => canvasRef.current.parentMoveRaquet("LEFT")} />
        <Button
          size="large"
          type="primary"
          icon={<RightOutlined />}
          onClick={() => canvasRef.current.parentMoveRaquet("RIGHT")}
        />
      </Space>
    </Spin>
  );
};

export default authRoute(Games);
