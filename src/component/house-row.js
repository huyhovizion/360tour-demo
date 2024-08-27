// HouseRow.js
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

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

export default HouseRow;