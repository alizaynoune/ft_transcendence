import style from "./canvas.module.css";
import { Suspense, useRef, KeyboardEvent, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";
import { racquetSize, planeSize } from "@/tools/globalVariable";
import { useInterval } from "@/hooks/useInterval";
import { GameType } from "@/types/types";
import Socket from "@/config/socket";

interface PropsType {
  game: GameType;
  IamPlayer: boolean;
}

const MyCanvas: React.FC<PropsType> = ({ game, IamPlayer }) => {
  const racquet = useRef<THREE.Mesh>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const racquetMaxStep = planeSize[0] / 2 - racquetSize[0] / 2;
  const [count, setCount] = useState<number>(4);
  const [timer, setTimer] = useState(0);
  const [collided, setCollided] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(game.players[0].ready && game.players[1].ready);

  const gameSpeed = 0.25;

  useInterval(() => setCount((count) => count - 1), timer);
  useEffect(() => {
    console.log(count);
    if (count < 0 && ready) {
      setTimer(0);
      setStart(true);
    }
  }, [count]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (count !== -1) return;
    const { code } = e;
    console.log(code);
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
    console.log(ready, 'ready>>>>>>>>>>');
    
    if (!IamPlayer) return;
    Socket.emit("playerReady", { gameId: game.id });
    if (!ready) return;
    canvasRef.current.focus();
    document.getElementById("canvas")?.focus();
    setCount(3);
    setTimer(1000);
  }, []);

  useEffect(() => {
    if (!collided) return;
    setStart(false);
    setCount(0);
    setCollided(false);
    setTimer(1000);
  }, [collided]);

  return game.status !== "PLAYING" ? (
    <span className={style.text}>{game.status}</span>
  ) : (
    <>
      {count >= 0 && <span className={style.text}>{count === 4 ? "Waiting" : count ? count : "GO"}</span>}
      <Canvas
        className={style.container}
        frameloop="demand"
        ref={IamPlayer ? canvasRef : undefined}
        onKeyDown={IamPlayer ? handleKeyboardEvent : undefined}
        id="canvas"
        tabIndex={0}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 20] }}
        gl={{ toneMapping: NoToneMapping }}
        onCreated={({ gl }) => {
          gl.setClearColor("#ffffff");
        }}
      >
        <color attach="background" args={["#464E5F"]} />
        <OrbitControls />
        <ambientLight color={"#ffffff"} intensity={0.5} />
        <Suspense fallback={null}>
          <Stars radius={80} depth={40} count={9000} factor={4} saturation={0} fade speed={1} />
          <Scene
            ref={racquet}
            gameSpeed={gameSpeed}
            start={start}
            setCollided={(value: boolean): void => {
              setCollided(value);
            }}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default MyCanvas;
