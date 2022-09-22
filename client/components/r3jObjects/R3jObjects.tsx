import React from "react";
import { Plane, Text } from "@react-three/drei";

export const Box = React.forwardRef((props: any, ref) => {
  return (
    <mesh {...props.mesh} ref={ref}>
      <boxGeometry attach="geometry" {...props.box} />
      <meshStandardMaterial attach="material" {...props.meshMaterial} />
    </mesh>
  );
});

export const Ball = React.forwardRef((props: any, ref) => {

  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry attach="geometry" args={[0.15, 20, 20]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
});

export const Wall = (props: any) => {
  return (
    <Plane {...props.plane}>
      <meshStandardMaterial {...props.meshMaterial} attach="material" />
    </Plane>
  );
};

export const Message = (props: any) => {
  const textProps = {
    fontSize: props.fontSize || 10,
    font:
      props.font ||
      "http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff",
  };
  return (
    <mesh {...props.mesh}>
      <Text material-toneMapped={false} {...textProps}>
        {props.text}
      </Text>
    </mesh>
  );
};
