import style from "./game.module.css";
import { Suspense, useRef, useState, KeyboardEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, Stars } from "@react-three/drei";
import * as three from "three";
import React from "react";

const Cube = React.forwardRef((props: any, ref) => {
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry attach="geometry" args={[2.4, 0.3, 0.1]} />
      <meshStandardMaterial attach="material" color="#0391BA" />
      {/* <meshBasicMaterial attach="material" color="#0391BA" /> */}
    </mesh>
  );
});

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[12.5, 19]} />
    <meshBasicMaterial attach="material" color="#082444" />
  </mesh>
);

const Sphere = () => {
  return (
    <mesh position={[0, 0.15, 0]}>
      <sphereGeometry attach="geometry" args={[0.15, 20, 20]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
};

const Scene = (props: any) => {
  const racquet = useRef<three.Mesh>(null!);

  useFrame(() => {
    // racquet.current!.rotation.x += 0.01;
    // racquet.current!.rotation.y += 0.01;
  });

  return (
    <>
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      <Cube position={[0, 0.15, -9.3]} />
      {/* <fog attach="fog" args={["green", -10, 5]} /> */}
      <Sphere />
      <Cube position={[0 + props.position, 0.15, 9.3]} ref={racquet} />
      <Plane />
      <planeBufferGeometry attach="geometry" args={[10, 10]} receiveShadow />
      <gridHelper args={[20, 80]} />
    </>
  );
};

const Games: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const handleKeyboardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    console.log(position);
    const { keyCode, code } = e;
    // ArrowRight  ArrowLeft
    const step = keyCode === 39 ? 1 : keyCode === 37 ? -1 : 0;
    if ((Math.abs(position + step) <= 5)) setPosition((old) => old + step);
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
          <Scene position={position} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Games;
