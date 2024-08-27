import React, { useState, useEffect, useRef } from 'react';
import { Canvas, extend, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TextureLoader, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Menu from './component/menu';
import SkyBox from './component/skybox';
import CameraControls from './component/camera-controls';
import FixedItem from './component/fixed-item';
import "./styles.css";

extend({ OrbitControls });

const HouseRow = ({ visible, initialPosition, initialRotation, initialScale }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, '/images/house.png');

  useEffect(() => {
    if (meshRef.current) {
      // Chỉ set vị trí, xoay, tỷ lệ nếu chưa được set trước đó
      meshRef.current.position.copy(initialPosition);
      meshRef.current.rotation.set(...initialRotation);
      meshRef.current.scale.set(...initialScale);
    }
  }, [initialPosition, initialRotation, initialScale]);

  if (!visible) return null; // Không render nếu không visible

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        meshRef.current.material.color.set('blue'); // Đổi sang màu xanh khi hover
      }}
      onPointerOut={() => {
        meshRef.current.material.color.set('white'); // Đổi lại màu trắng khi rời chuột
      }}
    >
      <planeGeometry args={[5, 2]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
};

function App() {
  const [skyboxTexture, setSkyboxTexture] = useState([
    "/images/bancol/bc-px.png",
    "/images/bancol/bc-nx.png",
    "/images/bancol/bc-py.png",
    "/images/bancol/bc-ny.png",
    "/images/bancol/bc-pz.png",
    "/images/bancol/bc-nz.png"
  ]);

  const handleCardClick = (newTexture) => {
    setSkyboxTexture(newTexture);
  };

  const houseRowVisible = skyboxTexture[0] === "/images/bancol/bc-px.png";

  // Duy trì các giá trị vị trí, xoay, và tỷ lệ
  const initialPosition = new Vector3(-38, -15, 50);
  const initialRotation = [0, Math.PI / 1.2, 0];
  const initialScale = [13, 9, 1];

  return (
    <>
      <Canvas>
        <Html>
          <Menu onCardClick={handleCardClick} />
        </Html>
        <SkyBox texture={skyboxTexture} />
        <HouseRow
          visible={houseRowVisible}
          initialPosition={initialPosition}
          initialRotation={initialRotation}
          initialScale={initialScale}
        />
        <FixedItem texture={skyboxTexture} handleCardClick={handleCardClick}/>
        <CameraControls />
      </Canvas>
    </>
  );
}

export default App;
