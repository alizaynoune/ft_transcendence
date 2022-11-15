import style from "./scene.module.css";
import { Box, Ball, Wall } from "@/components/r3jObjects/R3jObjects";
import React from "react";
import { useGame } from "@/hooks/gameHooks";
import { planeSize, racquetSize } from "@/tools/globalVariable";
import { Mesh, BufferGeometry, Material } from "three";
import { invalidate, useFrame } from "@react-three/fiber";

interface PropsType {
  gameSpeed: number;
  start: boolean;
  playerIndex: number;
  gameId: number;
  colors: { raquetXColor: string; raquetYColor: string; ballColor: string; planColor: string; wallColor: string };
  refs: refType;
}

interface refType {
  playerX: React.MutableRefObject<Mesh<BufferGeometry, Material | Material[]>>;
  playerY: React.MutableRefObject<Mesh<BufferGeometry, Material | Material[]>>;
}

const Scene = React.forwardRef((props: PropsType, ref) => {
  const { gameSpeed, start, playerIndex, refs, gameId, colors } = props;
  const { playerX, playerY } = refs;
  const [ball] = useGame({ racquet: !playerIndex ? playerX : playerY, gameSpeed, start, playerIndex, gameId });

  return (
    <>
      {/* <axesHelper /> */}
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      {/* Raquet playerX */}
      <Box
        ref={playerX}
        mesh={{ position: [0, 0.15, (planeSize[1] / 2 - 0.2) * -1] }}
        box={{ args: racquetSize }}
        meshMaterial={{ color: colors.raquetXColor }}
      />
      <Ball position={[0, 0.2, 0]} ref={ball} meshMaterial={{ color: colors.ballColor }} />
      {/* Raquet playerY */}
      <Box
        ref={playerY}
        mesh={{ position: [0, 0.15, planeSize[1] / 2 - 0.2] }}
        box={{ args: racquetSize }}
        meshMaterial={{ color: colors.raquetYColor }}
      />
      {/* Floor*/}
      <Wall
        plane={{
          args: planeSize,
          rotation: [1.5 * Math.PI, 0, 0],
          position: [0, 0, 0],
        }}
        meshMaterial={{ color: colors.planColor, flatShading: true }}
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
        meshMaterial={{ color: colors.wallColor, wireframe: true }}
      />
      {/* Left Wall */}
      <Wall
        plane={{
          args: [planeSize[1], 1, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [(planeSize[0] / 2) * -1, 0.5, 0],
        }}
        meshMaterial={{ color: colors.wallColor, wireframe: true }}
      />
    </>
  );
});

export default Scene;
