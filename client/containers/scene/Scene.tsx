import style from "./scene.module.css";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {Box, Ball, Wall} from '@/components/r3jObjects/R3jObjects'
import React from "react";
import { useGame } from "@/hooks/gameHooks";

const Scene = React.forwardRef((props: any, ref) => {
  const { racquet } = props;
  const [ball, step, collided] = useGame(ref)

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
          args: [31, 1, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [7, 0.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
      {/* Left Wall */}
      <Wall
        plane={{
          args: [31, 1, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [-7, 0.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
    </>
  );
});

export default Scene;
