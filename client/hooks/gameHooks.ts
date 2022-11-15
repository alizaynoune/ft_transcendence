import { invalidate, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { planeSize } from "@/tools/globalVariable";
import Socket from "@/config/socket";
import { Mesh, BufferGeometry, Material } from "three";

interface PropsType {
  racquet: React.MutableRefObject<Mesh<BufferGeometry, Material | Material[]>>;
  gameSpeed: number;
  start: boolean;
  gameId: number;
  playerIndex: number;
}

export const useGame = (props: PropsType) => {
  const { racquet, gameSpeed, start, playerIndex, gameId } = props;
  const planeHalfW = planeSize[0] / 2;
  const planeHalfL = planeSize[1] / 2;
  const ball = useRef<THREE.Mesh>(null!);
  const step = useRef({ x: 0, z: gameSpeed });
  const pause = useRef(true);
  const playerPosition = playerIndex !== -1 ? (playerIndex ? 1 : -1) : 0;

  useEffect(() => {
    Socket.emit("streamGame", { gameId });
    Socket.on("ballPosition", (data: { ballPosition: any; currentStep: any }) => {
      const { ballPosition, currentStep } = data;
      ball.current.position.x = ballPosition.x;
      ball.current.position.z = ballPosition.y;
      step.current.x = currentStep.x;
      step.current.z *= currentStep.y;
      pause.current = false;
    });
    Socket.on("streamGame", () => {
      Socket.emit("ballRacquetPosition", {
        ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
        currentStep: { x: step.current.x < 0 ? -1 : 1, y: step.current.z < 0 ? -1 : 1 },
        racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
        gameId,
      });
      pause.current = false;
    });
    return () => {
      Socket.off("ballPosition");
      Socket.off("streamGame");
    };
  }, []);

  useFrame((state) => {
    if (pause.current) return;
    if (start) {
      invalidate();
      if (Math.abs(ball.current.position.x + step.current.x) >= planeHalfW) {
        step.current.x *= -1;
      }
      ball.current.position.x += step.current.x; // Left Right
      if (playerPosition) {
        if (Math.abs(ball.current.position.z + step.current.z) >= planeHalfL - 0.4) {
          pause.current = true; // for test
          if (playerPosition > 0 && ball.current.position.z + step.current.z >= planeHalfL - 0.4) {
            ball.current.position.z = (planeHalfL - 0.4) * playerPosition;

            Socket.emit("gameCalculation", {
              ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
              racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
              gameId,
            });
          } else if (playerPosition < 0 && (ball.current.position.z + step.current.z) * -1 >= planeHalfL - 0.4) {
            ball.current.position.z = (planeHalfL - 0.4) * playerPosition;

            Socket.emit("gameCalculation", {
              ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
              racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
              gameId,
            });
          }
        } else ball.current!.position.z += step.current.z; // Front Back
      }
    }
  });

  return [ball];
};
