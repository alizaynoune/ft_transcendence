import React from "react";
import { Plane } from "@react-three/drei";

export const Box = React.forwardRef((props: any, ref) => {
  return (
    <mesh {...props.mesh} ref={ref} dispose={null}>
      <boxGeometry attach="geometry" {...props.box} />
      <meshStandardMaterial attach="material" {...props.meshMaterial} />
    </mesh>
  );
});

export const Ball = React.forwardRef((props: any, ref) => {
  return (
    <mesh ref={ref} {...props} dispose={null}>
      <sphereGeometry attach="geometry" args={[0.15, 20, 20]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
});

export const Wall = (props: any) => {
  return (
    <Plane {...props.plane} dispose={null}>
      <meshStandardMaterial {...props.meshMaterial} attach="material" />
    </Plane>
  );
};
