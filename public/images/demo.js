import React, {  useState, useEffect, useRef  } from 'react';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Menu from './component/menu';
import SkyBox from './component/skybox';
import CameraControls from './component/camera-controls';
import "./styles.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import FixedItem from './component/fixed-item';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';


extend({ OrbitControls });

function House({ modelPath, onHover }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, setHovered] = useState(false);
  const houseRef = useRef();

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame(() => {
    if (houseRef.current) {
      houseRef.current.rotation.x = Math.PI / 100; // Rotate the model 90 degrees to make it vertical
      houseRef.current.position.set(-60, -50, 30); // Adjust position
      houseRef.current.traverse((child) => {
        if (child.isMesh) {
          // Set outline color when hovered
          child.material.emissive.set(hovered ? 'blue' : 'black');
          child.material.emissiveIntensity = hovered ? 0.5 : 0;
        }
      });
    }
  });

  return (
    <primitive
      ref={houseRef}
      object={gltf.scene}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(false);
      }}
      scale={1} // Adjust scale if model is too large or small
    />
  );
}


function App() {
  const [hovered, setHovered] = useState(false);
  const [skyboxTexture, setSkyboxTexture] = useState([
    "/images/bancol/bc-px.png",
    "/images/bancol/bc-nx.png",
    "/images/bancol/bc-py.png",
    "/images/bancol/bc-ny.png",
    "/images/bancol/bc-pz.png",
    "/images/bancol/bc-nz.png"
  ]);

  return (
    <>
      <Canvas>
        <ambientLight intensity={10} />
        <directionalLight position={[2, 10, 5]} intensity={10} />
        <Html>
          <Menu onCardClick={setSkyboxTexture} />
        </Html>
        <CameraControls />
        <SkyBox texture={skyboxTexture} />
        <House
          modelPath="/images/bancol/house.glb"
          onHover={setHovered}
        />
        <FixedItem texture={skyboxTexture} handleCardClick={setSkyboxTexture} />
      </Canvas>
    </>
  );
}

export default App;