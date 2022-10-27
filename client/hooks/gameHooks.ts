import { invalidate, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { planeSize, racquetSize } from "@/tools/globalVariable";
import Socket from "@/config/socket";
import { message } from "antd";

interface PropsType {
  racquet: any;
  gameSpeed: number;
  start: boolean;
  gameId: number;
  playerIndex: number;
  setCollided: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useGame = (props: PropsType) => {
  const { racquet, gameSpeed, start, setCollided, playerIndex, gameId } = props;
  const planeHalfW = planeSize[0] / 2;
  const planeHalfL = planeSize[1] / 2;
  const racquetHalf = racquetSize[0] / 2;
  const ball = useRef<THREE.Mesh>(null!);
  // let step = { x: 0, z: gameSpeed };
  const [step, setStep] = useState<{ x: number; z: number }>({ x: 0, z: gameSpeed });
  const [pause, setPause] = useState<boolean>(true);
  const playerPosition = playerIndex !== -1 ? (playerIndex ? 1 : -1) : 0;

  useEffect(() => {
    Socket.emit("Connection", { gameId });
    Socket.on("ballPosition", (data: { ballPosition: any; currentStep: any }) => {
      console.log(data, "<<<<<<<<<done");

      const { ballPosition, currentStep } = data;
      ball.current.position.x = ballPosition.x;
      ball.current.position.z = ballPosition.y;
      // step.x *= currentStep.x;
      // step.z *= currentStep.y;
      setStep((prev) => {
        return {
          x: currentStep.x,
          z: prev.z * currentStep.y,
        };
      });
      setPause(false);
      console.log(step, "her done");
    });
    Socket.on("ProblemConnection", () => {
      console.log("problem connetion from game hooks");

      setPause(true);
    });
    Socket.on("Connection", () => {
      console.log("emit ballRacquetPosition done");

      Socket.emit("ballRacquetPosition", {
        ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
        currentStep: { x: step.x < 0 ? -1 : 1, y: step.z < 0 ? -1 : 1 },
        racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
        gameId,
      });
      setPause(false);
    });
    return () => {
      Socket.off("ballPosition");
      Socket.off("ProblemConnection");
      Socket.off("Connection");
    };
  }, []);

  // useEffect(() => {
  //   if (!pause) {
  //     console.log("emit done");
  //     Socket.emit("ballRacquetPosition", {
  //       ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
  //       currentStep: { x: step.x < 0 ? -1 : 1, y: step.z < 0 ? -1 : 1 },
  //       racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
  //       gameId,
  //     });
  //   }
  // }, [pause]);

  useFrame((state) => {
    // console.log(pause, start, "<<<<<<<<<<<<<<<<<<<<<<");

    if (pause) return;
    if (start) {
      invalidate();
      // if (Math.abs(ball.current.position.z) >= planeHalfL) step.z *= -1;
      if (Math.abs(ball.current.position.x + step.x) >= planeHalfW) {
        setStep((prev) => {
          return { ...prev, x: prev.x * -1 };
        });
      }
      // step.x *= -1; // left right wall
      ball.current.position.x += step.x; // Left Right
      if (playerPosition) {
        // if (ball.current!.position.z + step.z > planeHalfL) ball.current.position.z = planeHalfL - 0.4;
        // else if ((ball.current!.position.z + step.z) * playerPosition > planeHalfL)
        // if (playerPosition > 0) {
        //   console.log(playerPosition, "player position1");
        // } else {
        //   console.log(playerPosition, "player position-1");
        // }

        //

        if (Math.abs(ball.current.position.z + step.z) >= planeHalfL - 0.4) {
          setPause(true); // for test
          if (playerPosition > 0 && ball.current.position.z + step.z >= planeHalfL - 0.4) {
            ball.current.position.z = (planeHalfL - 0.4) * playerPosition;
            console.log("check ball position user2", ball.current.position);
            Socket.emit("gameCalculation", {
              ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
              racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
              gameId,
            });
          } else if (playerPosition < 0 && (ball.current.position.z + step.z) * -1 >= planeHalfL - 0.4) {
            ball.current.position.z = (planeHalfL - 0.4) * playerPosition;
            console.log("check ball position user2", ball.current.position);
            Socket.emit("gameCalculation", {
              ballPosition: { x: ball.current.position.x, y: ball.current.position.z },
              racquetPosition: { x: racquet.current.position.x, y: racquet.current.position.z },
              gameId,
            });
          }
          console.log((ball.current.position.z + step.z) * playerPosition, playerPosition, "<<<<<<<<<<<<<");

          // else {
          //   ball.current.position.z = (planeHalfL - 0.4) * (playerPosition * -1);
          // }
        } else ball.current!.position.z += step.z; // Front Back
      }
    }
  });

  return [ball];
};
