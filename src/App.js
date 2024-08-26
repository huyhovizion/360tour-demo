import React, { useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Menu from './component/menu';
import SkyBox from './component/skybox';
import CameraControls from './component/camera-controls';
import "./styles.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import FixedItem from './component/fixed-item';


extend({ OrbitControls });

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

  return (
    <>
      <Canvas>
        <Html>
          <Menu onCardClick={handleCardClick} />
        </Html>
        <CameraControls />
        <SkyBox texture={skyboxTexture} />
        <FixedItem texture={skyboxTexture} handleCardClick={handleCardClick}/>
      </Canvas>
    </>
  );
}

export default App;