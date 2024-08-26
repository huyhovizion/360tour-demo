import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const sceneMeshes = (handleCardClick, bancolTexture, studioTexture) => {
  return {
    "/images/bancol/bc-px.png": [
      <mesh position={[-40, -5, 40]} onClick={() => handleCardClick([
          "/images/studio/st-px.png",
        "/images/studio/st-nx.png",
        "/images/studio/st-py.png",
        "/images/studio/st-ny.png",
        "/images/studio/st-pz.png",
        "/images/studio/st-nz.png"
        ])}>
        <sphereGeometry attach="geometry" args={[2, 32, 32]} />
        <meshBasicMaterial map={bancolTexture} />
      </mesh>,
    ],
    "/images/studio/st-px.png": [
      <mesh position={[-20, 0, -23]} onClick={() => handleCardClick([
          "/images/bancol/bc-px.png",
        "/images/bancol/bc-nx.png",
        "/images/bancol/bc-py.png",
        "/images/bancol/bc-ny.png",
        "/images/bancol/bc-pz.png",
        "/images/bancol/bc-nz.png"
        ])}>
        <sphereGeometry attach="geometry" args={[2, 32, 32]} />
        <meshBasicMaterial map={studioTexture} />
      </mesh>,
    ],
    
  };
};

function FixedItem({ texture, handleCardClick }) {
  const studioTexture = useLoader(TextureLoader, '/images/bancol/bc-px.png');
  const bancolTexture = useLoader(TextureLoader, '/images/studio/st-px.png');

  return (
    <>
      {sceneMeshes(handleCardClick, bancolTexture, studioTexture)[texture[0]]}
    </>
  );
}

export default FixedItem;