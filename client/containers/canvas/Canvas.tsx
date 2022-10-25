import style from "./canvas.module.css";
import React, { Suspense, useRef, KeyboardEvent, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";
import { racquetSize, planeSize } from "@/tools/globalVariable";
import { useInterval } from "@/hooks/useInterval";
import { GameType } from "@/types/types";
import Socket from "@/config/socket";
import { message, Typography } from "antd";

interface PropsType {
  game: GameType;
  IamPlayer: boolean;
}
const { Text } = Typography;
const MyCanvas: React.FC<PropsType> = ({ game, IamPlayer }) => {
  const racquet = useRef<THREE.Mesh>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const racquetMaxStep = planeSize[0] / 2 - racquetSize[0] / 2;
  const [count, setCount] = useState<number>(-1);
  const [timer, setTimer] = useState(0);
  const [collided, setCollided] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  const gameSpeed: { [k: string]: number } = {
    EASY: 0.25,
    NORMAL: 0.5,
    DIFFICULT: 1,
  };

  useInterval(() => setCount((count) => count - 1), timer);
  useEffect(() => {
    console.log(count, game);
    if (IamPlayer && count < 0 && game.status === "PLAYING" && !game.started) {
      Socket.emit("startGame", { gameId: game.id });
    }
  }, [count]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (game.status !== "PLAYING") return;
    const { code } = e;
    let step = 0;
    switch (code) {
      case "ArrowRight":
      case "ArrowUp":
      case "KeyL":
        step = 0.8;
        break;
      case "ArrowLeft":
      case "ArrowDown":
      case "KeyJ":
        step = -0.8;
        break;
      default:
        step = 0;
    }
    if (Math.abs(racquet.current.position.x + step) <= racquetMaxStep) racquet.current.position.x += step;
    else {
      step = racquetMaxStep - Math.abs(racquet.current.position.x);
      racquet.current.position.x += step;
    }
  };

  useEffect(() => {
    console.log(game);

    if (!IamPlayer) return;
    if (!game.players[1].ready) Socket.emit("playerReady", { gameId: game.id });
    else Socket.emit("reConnection", { gameId: game.id });
    if (game.status !== "PLAYING") return;
    setCount(5);
    setTimer(1000);
  }, [game.status]);

  useEffect(() => {
    console.log(start, "<<<<<<<<<start");
  }, [start]);

  useEffect(() => {
    if (game.started && game.status === "PLAYING") {
      setTimer(0);
      setStart(true);
      canvasRef.current.focus();
      document.getElementById("canvas")?.focus();
    }
  }, [game.started]);

  // useEffect(() => {
  //   if (!collided) return;
  //   setStart(false);
  //   setCount(0);
  //   setCollided(false);
  //   setTimer(1000);
  // }, [collided]);

  useEffect(() => {
    if (!IamPlayer) return;
    Socket.on("ProblemConnection", () => {
      console.log("problem connection");
      message.warning("problem connection");

      setPause(true);
    });
    Socket.on("ReConnection", () => {
      console.log("reconnection");

      setPause(false);
    });

    return () => {
      Socket.off("ProblemConnection");
      Socket.off("ReConnection");
    };
  }, []);

  return game.status !== "PLAYING" ? (
    <div className={style.container}>
      <span className={style.text}>{game.status}</span>
    </div>
  ) : (
    <>
      {count >= 0 && IamPlayer && !game.started && (
        <div className={style.container}>
          <span className={style.text}>{count ? count : "GO"}</span>
        </div>
      )}
      {pause && <Text type="danger">{`${game.players[0].users.username} has problem connection`}</Text>}
      {game.started && game.status === "PLAYING" && (
        <Canvas
          className={style.container}
          // frameloop="demand"
          ref={IamPlayer ? canvasRef : undefined}
          onKeyDown={IamPlayer ? handleKeyboardEvent : undefined}
          id="canvas"
          tabIndex={0}
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 20] }}
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
              ref={racquet}
              gameSpeed={gameSpeed[game.level]}
              start={start && !pause}
              setCollided={(value: boolean): void => {
                setCollided(value);
              }}
            />
          </Suspense>
        </Canvas>
      )}
    </>
  );
};

export default MyCanvas;
