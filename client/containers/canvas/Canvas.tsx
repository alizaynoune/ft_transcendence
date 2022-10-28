import style from "./canvas.module.css";
import React, { Suspense, useRef, KeyboardEvent, useEffect, useState, SetStateAction } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";
import { useInterval } from "@/hooks/useInterval";
import { GameType } from "@/types/types";
import Socket from "@/config/socket";
import { Typography } from "antd";
import { useRaquets } from "@/hooks/racquetHooks";

interface PropsType {
  game: GameType;
  IamPlayer: boolean;
  intraId: number;
}
const { Text } = Typography;
const MyCanvas: React.FC<PropsType> = ({ game, IamPlayer, intraId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [count, setCount] = useState<number>(-1);
  const [timer, setTimer] = useState(0);
  const [playerIndex, setPlayerIndex] = useState<number>(-1);
  const [playerX, playerY, moveRaquet] = useRaquets({ playerIndex, game });

  const gameSpeed: { [k: string]: number } = {
    EASY: 0.252,
    NORMAL: 0.52,
    DIFFICULT: 12,
  };

  useInterval(() => setCount((count) => count - 1), timer);
  useEffect(() => {
    console.log(count, game);
    if (IamPlayer && count < 0 && game.status === "PLAYING" && !game.started) {
      Socket.emit("startGame", { gameId: game.id });
    }
  }, [count]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (game.status !== "PLAYING" || !IamPlayer) return;
    const { code } = e;
    let action: "RIGHT" | "LEFT" | "" = "";
    switch (code) {
      case "ArrowRight":
      case "ArrowUp":
      case "KeyL":
        action = "RIGHT";
        break;
      case "ArrowLeft":
      case "ArrowDown":
      case "KeyJ":
        action = "LEFT";
        break;
      default:
        action = "";
    }
    moveRaquet(action);
  };

  useEffect(() => {
    if (!IamPlayer || game.status === "END") return;
    let player = game.players[0].users.intra_id === intraId ? 0 : 1;
    setPlayerIndex(player);
    Socket.emit("playerReady", { gameId: game.id });
    if (game.status !== "PLAYING") return;
    setCount(5);
    setTimer(1000);
  }, [game.status]);

  useEffect(() => {
    if (!IamPlayer) return;
    if (game.started && game.status === "PLAYING") {
      setTimer(0);
      canvasRef.current.focus();
      document.getElementById("canvas")?.focus();
    }
  }, [game.started]);

  return game.status !== "PLAYING" ? (
    <div className={style.container}>
      <span className={style.text}>{game.status}</span>
    </div>
  ) : (
    <>
      {count >= 0 && IamPlayer && !game.started && <span className={style.text}>{count ? count : "GO"}</span>}
      {game.status === "PLAYING" && (
        <Canvas
          className={style.container}
          // frameloop="demand"
          ref={IamPlayer ? canvasRef : undefined}
          onKeyDown={IamPlayer ? handleKeyboardEvent : undefined}
          id="canvas"
          tabIndex={0}
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, playerIndex ? 20 : -20] }}
          gl={{ toneMapping: NoToneMapping }}
          onCreated={({ gl }) => {
            gl.setClearColor("#464E5F");
          }}
        >
          <color attach="background" args={["#464E5F"]} />
          <OrbitControls />
          <ambientLight color={"#ffffff"} intensity={0.5} />
          <Suspense fallback={null}>
            <Stars radius={80} depth={40} count={9000} factor={4} saturation={0} fade speed={1} />
            <Scene
              refs={{ playerX, playerY }}
              gameId={game.id}
              gameSpeed={gameSpeed[game.level]}
              playerIndex={playerIndex}
              start={game.started}
            />
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

export default MyCanvas;
