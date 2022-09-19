import style from "./game.module.css";
import { Suspense, useRef, useState, KeyboardEvent, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, Stars, Plane } from "@react-three/drei";
import * as THREE from "three";
import React from "react";

const Racquet = (props: any) => {
  return (
    <mesh {...props}>
      <boxGeometry attach="geometry" args={[2.4, 0.3, 0.1]} />
      <meshStandardMaterial attach="material" color="#0391BA" />
      {/* <meshBasicMaterial attach="material" color="#0391BA" /> */}
    </mesh>
  );
};

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
      <meshStandardMaterial
        {...props.meshMaterial}
        attach="material"
        wireframe
      />
    </Plane>
  );
};

const Scene = (props: any) => {
  // const racquet = useRef<THREE.Mesh>(null!);
  const ball = useRef<THREE.Mesh>(null!);
  // const [ballStep, setBallStep] = useState<number>(0.1)
  const step = useRef<{x:number; y:number; z:number}>({x: 0.1, y: 0.01, z:0.05})
  
  useFrame(() => {
    // ball.current!.position.x += -0.01 // Left Right
    // ball.current!.position.y += 0.01 // Up Down
    // if (ball.current!.position.z >= 10) setBallStep(-0.1)
    // else if (ball.current!.position.z <= -10) setBallStep(0.1)
    // ballStep.current += 0.1
    // console.log(ball.current.position.z + ballStep.current);
    
    // step.current.y += step.current.y > 0 ? -0.01 : 0.01;
    if (Math.abs(ball.current!.position.z) >= 10) step.current.z *= -1
    if (Math.abs(ball.current!.position.x) >= 7) step.current.x *= -1
    // if (Math.abs(ball.current!.position.y) >= 7) ballStep.current.y *= -1
    // if (!(Math.round(Math.abs(step.current.y)) % 3)) step.current.y *= -1
    
    ball.current!.position.z += step.current.z // Front Back
    // $x = $r * Math.cos($step*$i);
    // step.current.y += 0.01
    // console.log(Math.cos(step.current.y));
    // ball.current!.position.y += Math.sin(step.current.y) * Math.cos(step.current.y) 
    // ball.current!.position.y += step.current.y
    // console.log(Math.abs(ball.current!.position.z));
    // console.log(ball.current!.position.z);
    // console.log(ballStep.current);
    
    
    
    
    // LeftRight=|7| UpDown |10|
  });

  return (
    <>
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      <Racquet position={[0, 0.15, -10.2]} />
      <Ball position={[0, 0.15, 0]} ref={ball} />
      <Racquet position={[0 + props.position, 0.15, 10.2]} />
      {/* Floor*/}
      <Wall
        plane={{
          args: [14.4, 21, 40, 20],
          rotation: [1.5 * Math.PI, 0, 0],
          position: [0, 0, 0],
        }}
        meshMaterial={{ color: "#f9c74f" }}
      />

      {/* Center Wall */}
      <Wall
        plane={{ args: [14.4, 0.5, 10, 10], position: [0, 0.25, 0] }}
        meshMaterial={{ color: "pink" }}
      />
      {/* Right Wall */}
      <Wall
        plane={{
          args: [21, 1, 20, 20],
          rotation: [0, Math.PI / 2, 0],
          position: [7.2, 0.5, 0],
        }}
        meshMaterial={{ color: "#80ffbd" }}
      />
      {/* Left Wall */}
      <Wall
        plane={{
          args: [21, 1, 20, 20],
          rotation: [0, Math.PI / 2, 0],
          position: [-7.2, 0.5, 0],
        }}
        meshMaterial={{ color: "#80ffbd" }}
      />
    </>
  );
};

const Games: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const [ball, setBall] = useState<{ x: number; y: number }>({ x: 6, y: 9 });
  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    console.log(position);
    const { code } = e;
    // ArrowRight  ArrowLeft
    const step = code === "ArrowRight" ? 1 : code === "ArrowLeft" ? -1 : 0;
    if (Math.abs(position + step) <= 6) setPosition((old) => old + step);
  };
  // useEffect(() => {
  // }, [])
  return (
    <div className={style.container}>
      <Canvas
        onKeyDown={handleKeyboardEvent}
        tabIndex={0}
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 5, 14] }}
        onCreated={({ gl }) => {
          gl.setClearColor("#252934");
        }}
      >
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
          <Scene position={position} ball={ball} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Games;
