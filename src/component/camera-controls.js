import React, { useRef } from "react";
import {useThree, useFrame } from "@react-three/fiber";

const CameraControls = () => {
    const { camera, gl: { domElement } } = useThree();
    const controls = useRef();
    useFrame(() => controls.current.update());
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        autoRotate={false}
        enableZoom={false}
      />
    );
  };
  export default CameraControls;