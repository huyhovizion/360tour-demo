import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';

const SkyBox = ({ texture }) => {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new CubeTextureLoader();
    const loadedTexture = loader.load(texture);
    scene.background = loadedTexture;
  }, [texture, scene]);

  return null;
};

export default SkyBox;