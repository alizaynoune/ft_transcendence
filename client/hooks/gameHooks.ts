import { useFrame } from "@react-three/fiber";
import { ForwardedRef, RefObject, useEffect, useRef } from "react";

export const useGame = (racquet: any) => {
  const ball = useRef<THREE.Mesh>(null!);
  const step = useRef<{ x: number; z: number }>({ x: 0, z: -0.25 });
  const collided = useRef<boolean>(false);

  useFrame((state) => {
    // if(racquet && "current" in racquet && racquet.current) return
    // console.log(racquet, "<<<<<<<<<<");

    if (Math.abs(ball.current.position.z) >= 16) step.current.z *= -1;
    if (Math.abs(ball.current.position.x) >= 7) step.current.x *= -1;
    // console.log(ref.current.position);

    ball.current.position.x += step.current.x; // Left Right
    if (ball.current.position.z + step.current.z >= 15) {
      if (
        ball.current.position.x >= racquet.current.position.x - 1.5 &&
        ball.current.position.x <= racquet.current.position.x + 1.5
      ) {
        step.current.z *= -1;
        ball.current!.position.z += step.current.z;
        // console.log(((racquet.current.position.x - 1) + (racquet.current.position.x + 1)) / 2);
        console.log("collision");
        step.current.x +=
          ((racquet.current.position.x -
            1.5 +
            (racquet.current.position.x + 1.5)) /
            2 -
            ball.current.position.x) /
          10;
        // console.log(Math.abs());
      } else {
        console.log("none");
        ball.current!.position.z = 0; // Front Back
        ball.current.position.x = 0;
        step.current.x = 0;
      }
    } else ball.current!.position.z += step.current.z; // Front Back
  });

  return [ball, step, collided];
};
