import React, { useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Menu from './component/menu';
import SkyBox from './component/skybox';
import CameraControls from './component/camera-controls';
import FixedItem from './component/fixed-item';
import HouseRow from './component/house-row';
import { houseRowConfigs } from './component/houseRowConfig';
import "./styles.css";

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

  const houseRowVisible = skyboxTexture[0] === "/images/bancol/bc-px.png";

  return (
    <>
      <Canvas>
        <Html>
          <Menu onCardClick={handleCardClick} />
        </Html>
        <SkyBox texture={skyboxTexture} />
        {houseRowConfigs.map((config) => (
          <HouseRow
            key={config.id}
            visible={houseRowVisible}
            initialPosition={config.initialPosition}
            initialRotation={config.initialRotation}
            initialScale={config.initialScale}
          />
        ))}
        <FixedItem texture={skyboxTexture} handleCardClick={handleCardClick} />
        <CameraControls />
      </Canvas>
    </>
  );
}

export default App;
