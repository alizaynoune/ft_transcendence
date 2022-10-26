import { invalidate, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { planeSize, racquetSize } from "@/tools/globalVariable";
import Socket from "@/config/socket";
import { message } from "antd";

interface PropsType {
  racquet: any;
  gameSpeed: number;
  start: boolean;
  playerIndex: number;
  setCollided: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useGame = (props: PropsType) => {
  const { racquet, gameSpeed, start, setCollided, playerIndex } = props;
  const planeHalfW = planeSize[0] / 2;
  const planeHalfL = planeSize[1] / 2;
  const racquetHalf = racquetSize[0] / 2;
  const ball = useRef<THREE.Mesh>(null!);
  const step = { x: 0, z: gameSpeed };
  const [pause, setPause] = useState<boolean>(false);
  const playerPossition = playerIndex !== -1 ? (playerIndex ? 1 : -1) : 0;

  useEffect(() => {
    Socket.on("ballPosition", (data) => {
      console.log(data);
      ball.current.position.x = data.x;
      ball.current.position.y = data.y;
    });
    return () => {
      Socket.off("ballPosition");
    };
  }, []);

  useFrame((state) => {
    console.log(pause, start, "<<<<<<<<<<<<<<<<<<<<<<");

    if (pause) return;
    if (start) {
      invalidate();
      if (Math.abs(ball.current.position.z) >= planeHalfL) step.z *= -1;
      if (Math.abs(ball.current.position.x) >= planeHalfW) step.x *= -1;
      ball.current.position.x += step.x; // Left Right
      if (playerPossition && (ball.current.position.z + step.z) * playerPossition >= planeHalfL - 0.3) {
        if (
          ball.current.position.x >= racquet.current.position.x - racquetHalf &&
          ball.current.position.x <= racquet.current.position.x + racquetHalf
        ) {
          step.z *= -1;
          ball.current!.position.z += step.z;
          console.log("collision"); //! add sockit to emit current position
          step.x +=
            ((racquet.current.position.x - racquetHalf + (racquet.current.position.x + racquetHalf)) / 2 - ball.current.position.x) / 10;
        } else {
          console.log("none"); //! add sockit emit to current position
          setCollided(true);
          ball.current!.position.z = 0; // Front Back
          ball.current.position.x = 0;
          step.x = 0;
        }
      } else ball.current!.position.z += step.z; // Front Back
    }
  });

  return [ball];
};
