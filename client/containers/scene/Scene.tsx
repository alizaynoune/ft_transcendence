import style from "./scene.module.css";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {Box, Ball, Wall} from '@/components/r3jObjects/R3jObjects'
import React from "react";

const Scene = React.forwardRef((props: any, ref) => {
  const ball = useRef<THREE.Mesh>(null!);
  const step = useRef<{ x: number; z: number }>({ x: 0, z: -0.25 });
  const collided = useRef<boolean>(false);
  const { racquet } = props;
  // const racquetWidth = Math.abs(racquet.current.position.x - racquet.current.position.z)

  useFrame((state) => {
    // if (!collided.current) {
    if (Math.abs(ball.current.position.z) >= 16) step.current.z *= -1;
    if (Math.abs(ball.current.position.x) >= 7) step.current.x *= -1;
    // console.log(ref.current.position);

    ball.current.position.x += step.current.x; // Left Right
    if (ball.current.position.z + step.current.z >= 15) {
      // ball.current.position.z = Math.round(ball.current.position.z);
      // console.log(`${racquet.current.position.x} ${ball.current.position.x}`);
      console.log(racquet.current, "racquet");
      // console.log(ball.current.position, 'ball')
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
        // step.current.z = 0;
        // collided.current = true
      }
    } else ball.current!.position.z += step.current.z; // Front Back
    // }
    // console.log(ref.current);
    // if (rq && rq.current)
    // console.log(racquet.current);

    // console.log(props.handleKey);

    // console.log(ball.current.position.z);
  });

  useEffect(() => {
    console.log("rander");
  }, []);

  return (
    <>
    <axesHelper />
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      {/* Raquet Player */}
      <Box
        mesh={{ position: [0, 0.15, -15.2] }}
        box={{ args: [3, 0.3, 0.1] }}
        meshMaterial={{ color: "#50cd89" }}
      />
      {/* My Raquet */}
      <Ball position={[0, 0.2, 0]} ref={ball} />
      <Box
        ref={ref}
        mesh={{ position: [0, 0.15, 15.2] }}
        box={{ args: [3, 0.3, 0.1] }}
        meshMaterial={{ color: "#3699ff" }}
      />
      {/* Floor*/}
      <Wall
        plane={{
          args: [14, 31, 100, 80],
          rotation: [1.5 * Math.PI, 0, 0],
          position: [0, 0, 0],
        }}
        meshMaterial={{ color: "#464E5F", flatShading: true }}
      />
      {/* Center Wall */}
      <Box
        mesh={{ position: [0, 0, 0] }}
        box={{ args: [14.4, 0.1, 0.2] }}
        meshMaterial={{ color: "#ffffff" }}
      />
      {/* Right Wall */}
      <Wall
        plane={{
          args: [31, 3, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [7, 1.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
      {/* Left Wall */}
      <Wall
        plane={{
          args: [31, 3, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [-7, 1.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
    </>
  );
});

export default Scene;
