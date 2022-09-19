import style from "./game.module.css";
import { Suspense, useRef, useState, KeyboardEvent, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stats, OrbitControls, Stars, Plane, Text, RoundedBox, Text3D } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
const doggos = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80";
// import img from '@/images/Logo.png'

const img = 'https://randomuser.me/api/portraits/women/45.jpg'

const Cube = React.forwardRef((props: any, ref) => {
  return (
    <mesh ref={ref} {...props}>
      <boxGeometry attach="geometry" args={[2.4, 0.3, 0.1]} />
      <meshStandardMaterial attach="material" color="#0391BA" />
      {/* <meshBasicMaterial attach="material" color="#0391BA" /> */}
    </mesh>
  );
});

const Sphere = (props: any) => {
  return (
    <mesh position={[props.x, 0.15, props.y]}>
      <sphereGeometry attach="geometry" args={[0.15, 20, 20]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
};



const Texture = ({ texture, rotation, position }) => {
  return (
    <mesh position={position} rotation={rotation}>
      {/* <RoundedBox  args={[2, 2, 0]} radius={0.01}> */}
      {/* <ringGeometry */}
      <ringGeometry attach="geometry" args={[0, 1.5, 40]} />
      <meshBasicMaterial attach="material" map={texture} />

      {/* </RoundedBox> */}
      {/* <sphereGeometry attach="geometry" args={[1.5, 20, 30]} /> */}
    </mesh>
  );
};
const Image = ({ url, position, rotation }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  return <Texture texture={texture} position={position} rotation={rotation} />;
};


const Scene = (props: any) => {
  const racquet = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    // racquet.current!.rotation.x += 0.01;
    // racquet.current!.rotation.y += 0.01;
  });

  return (
    <>
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      <Cube position={[0, 0.15, -9.8]} />
      {/* <fog attach="fog" args={["green", -10, 5]} /> */}
      <Sphere {...props.ball} />
      <Cube position={[0 + props.position, 0.15, 9.8]} ref={racquet} />
      {/* <Plane /> */}

      <Plane
        args={[14.4, 20, 40, 20]}
        rotation={[1.5 * Math.PI, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial attach="material" color="#f9c74f" wireframe />
      </Plane>
      <Plane
        args={[14.4, 0.5, 10, 10]}
        rotation={[0, 0, 0]}
        position={[0, 0.25, 0]}
      >
        <meshStandardMaterial attach="material" color="pink" wireframe />
      </Plane>

      <Plane
        args={[20, 1, 20, 20]}
        rotation={[0, Math.PI / 2, 0]}
        position={[7.2, 0.5, 0]}
      >
        <meshStandardMaterial attach="material" color="#80ffdb" wireframe />
      </Plane>

      <Plane
        args={[20, 1, 20, 20]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-7.2, 0.5, 0]}
      >
        <meshStandardMaterial attach="material" color="#80ffdb" wireframe />
      </Plane>

      <Suspense fallback={null}>
      <Image url={doggos}  position={[0, 3, 12]} rotation={[0.5, Math.PI , 0]} />
      <Image url={doggos}  position={[0, 3, -12]} rotation={[-0.5, 0 , 0]} />
      </Suspense>
      <mesh  position={[0, 0.5, -12]}>
         <Text
        scale={[5, 5, 0]}
        color="green" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        HELLO WORLD
      </Text>
       </mesh>
       <mesh  position={[0, 0.5, 12]}  rotation={[0.5, Math.PI , 0]} >
         <Text
        scale={[5, 5, 0]}
        color="green" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        HELLO WORLD
      </Text>
       </mesh>
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



