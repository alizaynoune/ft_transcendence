import style from "./game.module.css";
import { Suspense, useRef, KeyboardEvent, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { racquetSize, planeSize } from "@/tools/globalVariable";
import { useInterval } from "@/hooks/useInterval";

const Games: React.FC = () => {
  const racquet = useRef<THREE.Mesh>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [gameSpeed, setGameSpeed] = useState<number>(-0.25);
  // const ballPosition = useState<{x: Number, y: Number}>({x : 0, y: 0})
  const racquetMaxStep = planeSize[0] / 2 - racquetSize[0] / 2;

  const [count, setCount] = useState<number>(10);
  const [timer, setTimer] = useState(1000);
  useInterval(() => setCount((count) => count - 1), timer);

  useEffect(() => {
    console.log(count);
    if (count <= 0) setTimer(0);
  }, [count]);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
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
  }, []);

  return (
    <div className={style.container}>
      <Canvas
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
        <Suspense fallback={"loading...."}>
          <Stars
            radius={80}
            depth={40}
            count={9000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Physics gravity={[0, -10, 0]}>
            <Scene ref={racquet} gameSpeed={gameSpeed} />
          </Physics>
          {/* <Scene2 /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Games;
