import style from "./game.module.css";
import {
  Suspense,
  useRef,
  useState,
  KeyboardEvent,
  useMemo,
  useEffect,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, Stars, Plane } from "@react-three/drei";
import * as THREE from "three";
import React from "react";

const Box = React.forwardRef((props: any, ref) => {
  return (
    <mesh {...props.mesh} ref={ref}>
      <boxGeometry attach="geometry" {...props.box} />
      <meshStandardMaterial attach="material" {...props.meshMaterial} />
    </mesh>
  );
});

const Ball = React.forwardRef((props: any, ref) => {
  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry attach="geometry" args={[0.15, 20, 20]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
});

const Wall = (props: any) => {
  return (
    <Plane {...props.plane}>
      <meshStandardMaterial {...props.meshMaterial} attach="material" />
    </Plane>
  );
};

const Scene = React.forwardRef((props: any, ref) => {
  const ball = useRef<THREE.Mesh>(null!);
  const step = useRef<{ x: number; z: number }>({ x: 0.0025, z: 0.2 });

  useFrame(() => {
    if (Math.abs(ball.current.position.z) >= 15) step.current.z *= -1;
    if (Math.abs(ball.current.position.x) >= 7) step.current.x *= -1;
    // console.log(ref.current.position);

    // ball.current!.position.z += step.current.z; // Front Back
    // ball.current.position.x += step.current.x; // Left Right
    if (ball.current.position.z >= 15) {
      // ball.current.position.z = Math.round(ball.current.position.z)
      // console.log(`${props.racquet} ${ball.current.position.x}`);
    }
    // console.log(ref &&  ref.current);

    // console.log(props.handleKey);

    // console.log(ball.current.position.z);
  });

  useEffect(() => {
    console.log("rander");
  }, []);

  return (
    <>
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      {/* Raquet Player */}
      <Box
        mesh={{ position: [0, 0.15, -15.2] }}
        box={{ args: [2.4, 0.3, 0.1] }}
        meshMaterial={{ color: "#50cd89" }}
      />
      {/* My Raquet */}
      <Ball position={[7, 0.2, 15]} ref={ball} />
      <Box
        ref={ref}
        mesh={{ position: [0, 0.15, 15.2] }}
        box={{ args: [2.4, 0.3, 0.1] }}
        meshMaterial={{ color: "#3699ff" }}
      />
      {/* Floor*/}
      <Wall
        plane={{
          args: [14.4, 31, 100, 80],
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
          position: [7.2, 1.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
      {/* Left Wall */}
      <Wall
        plane={{
          args: [31, 3, 80, 30],
          rotation: [0, Math.PI / 2, 0],
          position: [-7.2, 1.5, 0],
        }}
        meshMaterial={{ color: "#ffffff", wireframe: true }}
      />
    </>
  );
});

const Games: React.FC = () => {
  // const [racquet, setRacquet] = useState<number>(0);
  const racquet = useRef<THREE.Mesh>(null!);
  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    const { code } = e;
    const step = code === "ArrowRight" ? 1 : code === "ArrowLeft" ? -1 : 0;
    console.log(racquet.current);
    if (Math.abs(racquet.current.position.x + step) <= 6)
      racquet.current.position.x += step;
    // return e

    // if (Math.abs(racquet + step) <= 6) setRacquet((prev) => prev + step);
  };
  return (
    <div className={style.container}>
      <Canvas
        onKeyDown={handleKeyboardEvent}
        tabIndex={0}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 20] }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934");
        }}
      >
        {/* <fog attach="fog" args={["white", 30, 30]} /> */}
        <Stats />
        <OrbitControls />
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
          <Scene handleKey={handleKeyboardEvent} ref={racquet} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Games;
