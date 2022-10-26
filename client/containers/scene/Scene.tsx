import style from "./scene.module.css";
import { useEffect, useRef } from "react";
import { Box, Ball, Wall } from "@/components/r3jObjects/R3jObjects";
import React from "react";
import { useGame } from "@/hooks/gameHooks";
import { planeSize, racquetSize } from "@/tools/globalVariable";
import Socket from '@/config/socket'

interface PropsType {
  gameSpeed: number;
  start: boolean;
  playerIndex: number;
  setCollided: React.Dispatch<React.SetStateAction<boolean>>;
  refs: refType
}

interface refType{
  playerX: React.Ref<THREE.Mesh>
  playerY: React.Ref<THREE.Mesh>
}

const Scene = React.forwardRef((props: PropsType) => {
  const { gameSpeed, start, setCollided, playerIndex, refs } = props;
  const {playerX, playerY} = refs

  const [ball] = useGame({ racquet: playerX, gameSpeed, start, setCollided, playerIndex });
  console.log(refs, 'racquet');
  



  return (
    <>
      {/* <axesHelper /> */}
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      {/* Raquet */}
      <Box
        ref={playerX}
        mesh={{ position: [0, 0.15, (planeSize[1] / 2 - 0.2) * -1] }}
        box={{ args: racquetSize }}
        meshMaterial={{ color: "#50cd89" }}
      />
      <Ball position={[0, 0.2, 0]} ref={ball} />
      {/* Raquet */}
      <Box
        ref={playerY}
        mesh={{ position: [0, 0.15, planeSize[1] / 2 - 0.2] }}
        box={{ args: racquetSize }}
        meshMaterial={{ color: "#3699ff" }}
      />
      {/* Floor*/}
      <Wall
        plane={{
          args: planeSize,
          rotation: [1.5 * Math.PI, 0, 0],
          position: [0, 0, 0],
        }}
        meshMaterial={{ color: "#464E5F", flatShading: true }}
      />
      <Wall
        plane={{
          args: planeSize,
          rotation: [-(1.5 * Math.PI), 0, 0],
          position: [0, -0.001, 0],
        }}
        meshMaterial={{ color: "#464E5F", flatShading: true }}
      />
      {/* Center Wall */}
      <Box mesh={{ position: [0, 0, 0] }} box={{ args: [planeSize[0], 0.1, 0.2] }} meshMaterial={{ color: "#ffffff" }} />
      {/* Right Wall */}
      <Wall
        plane={{
          args: [planeSize[1], 1, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [planeSize[0] / 2, 0.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
      {/* Left Wall */}
      <Wall
        plane={{
          args: [planeSize[1], 1, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [(planeSize[0] / 2) * -1, 0.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
    </>
  );
});

export default Scene;
