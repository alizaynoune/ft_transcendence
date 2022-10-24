import { invalidate, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { planeSize, racquetSize } from "@/tools/globalVariable";

interface PropsType {
  racquet: any;
  gameSpeed: number;
  start: boolean;
  setCollided: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useGame = (props: PropsType) => {
  const { racquet, gameSpeed, start, setCollided } = props;

  const planeHalfW = planeSize[0] / 2;
  const planeHalfL = planeSize[1] / 2;
  const racquetHalf = racquetSize[0] / 2;

  const ball = useRef<THREE.Mesh>(null!);
  const step = useRef<{ x: number; z: number }>({ x: 0, z: gameSpeed });

  // useEffect(() => {
  //   return () => {
  //     ball?.current?.remove()
  //   }
  // }, [])

  useFrame((state) => {
    if (start) {
      invalidate()
      if (Math.abs(ball.current.position.z) >= planeHalfL) step.current.z *= -1;
      if (Math.abs(ball.current.position.x) >= planeHalfW) step.current.x *= -1;
      ball.current.position.x += step.current.x; // Left Right
      if (ball.current.position.z + step.current.z >= planeHalfL - 0.3) {
        if (
          ball.current.position.x >= racquet.current.position.x - racquetHalf &&
          ball.current.position.x <= racquet.current.position.x + racquetHalf
        ) {
          step.current.z *= -1;
          ball.current!.position.z += step.current.z;
          console.log("collision"); //! add sockit to emit current position
          step.current.x +=
            ((racquet.current.position.x -
              racquetHalf +
              (racquet.current.position.x + racquetHalf)) /
              2 -
              ball.current.position.x) /
            10;
        } else {
          console.log("none"); //! add sockit emit to current position
          setCollided(true);
          ball.current!.position.z = 0; // Front Back
          ball.current.position.x = 0;
          step.current.x = 0;
        }
      } else ball.current!.position.z += step.current.z; // Front Back
    }
    // return () => {
    //   state.rem
    // }
  });

  return [ball];
};
