import style from "./game.module.css";
import { Suspense, useRef, KeyboardEvent, useEffect, useState } from "react";
import { Canvas} from "@react-three/fiber";
import { Stats, OrbitControls, Stars, Loader } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";
import { racquetSize, planeSize } from "@/tools/globalVariable";
import { useInterval } from "@/hooks/useInterval";
import {Message} from '@/components/r3jObjects/R3jObjects'

const Games: React.FC = () => {
  const racquet = useRef<THREE.Mesh>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const racquetMaxStep = planeSize[0] / 2 - racquetSize[0] / 2;
  const [count, setCount] = useState<number>(3);
  const [timer, setTimer] = useState(1000);
  const [collided, setCollided] = useState<boolean>(false)

  const gameSpeed = 0.30

  useInterval(() => setCount((count) => count - 1), timer);
  useEffect(() => {
    console.log(count);
    if (count < 0) setTimer(0);
  }, [count]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    if (count !== -1) return
    const { code } = e;
    console.log(code);
    const step =
      code === "ArrowRight" || code === "ArrowUp" || code === "KeyL"
        ? 0.5
        : code === "ArrowLeft" || code === "ArrowDown" || code === "KeyJ"
        ? -0.5
        : 0;
    if (Math.abs(racquet.current.position.x + step) <= racquetMaxStep)
      racquet.current.position.x += step;
  };

  useEffect(() => {
    canvasRef.current.focus();
    document.getElementById("canvas")?.focus();
    setCount(10);
    setTimer(1000);
  }, []);

  return (
    // <div className={style.container}>
    <>
      <Canvas
      //  concurrent 
      //  shadowMap
        ref={canvasRef}
        onKeyDown={handleKeyboardEvent}
        id="canvas"
        tabIndex={0}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 20] }}
        gl={{ toneMapping: NoToneMapping }}
        onCreated={({ gl }) => {
          gl.setClearColor("#9a9a9a");
        }}
      >
        <color attach="background" args={["#464E5F"]} />
        <Stats />
        <OrbitControls />
        <ambientLight color={"#ffffff"} intensity={0.5} />
        <Suspense fallback={null}>
          <Stars
            radius={80}
            depth={40}
            count={9000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
            <Scene ref={racquet} gameSpeed={gameSpeed} collided={collided} setCollided={(value: boolean): void => {setCollided(value)}} />
            <Message text={count} mesh={{position:[0, 3.3, 2],  rotation: [-1, 0, 0],}} />
        </Suspense>
      </Canvas>
        <Loader /></>
    // </div>
  );
};

export default Games;
