import style from "./game.module.css";
import { Suspense, useRef, KeyboardEvent } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import { NoToneMapping } from "three";
import Scene from "@/containers/scene/Scene";

const Games: React.FC = () => {
  const racquet = useRef<THREE.Mesh>(null!);
  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    const { code } = e;
    console.log(code);

    const step =
      code === "ArrowRight" || code === "ArrowUp" || code === "KeyL"
        ? 0.5
        : code === "ArrowLeft" || code === "ArrowDown" || code === "KeyJ"
        ? -0.5
        : 0;
    // console.log(racquet.current);
    if (Math.abs(racquet.current.position.x + step) <= 6)
      racquet.current.position.x += step;
  };
  return (
    <div className={style.container}>
      <Canvas
        onKeyDown={handleKeyboardEvent}
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
          <Scene racquet={racquet} ref={racquet} />
          {/* <Scene2 /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Games;
