import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const HouseRow3 = ({ visible, initialPosition, initialRotation, initialScale, config }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, '/images/house4.png');
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const [isHovered, setIsHovered] = useState(false);

  // Load texture để check pixel alpha của ảnh
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/house4.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setImageData(ctx.getImageData(0, 0, img.width, img.height).data);
    };
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(initialPosition);
      meshRef.current.rotation.set(...initialRotation);
      meshRef.current.scale.set(...initialScale);
      meshRef.current.visible = visible;
    }
  }, [initialPosition, initialRotation, initialScale, visible]);

  useFrame(({ camera, mouse }) => {
    if (meshRef.current && imageData) {
      // Cập nhật raycaster từ vị trí chuột và camera
      raycaster.current.setFromCamera(mouse, camera);
      
      // Kiểm tra xem raycaster có giao với đối tượng hiện tại không
      const intersects = raycaster.current.intersectObject(meshRef.current);
  
      let isHoveredItem = false;
      if (intersects.length > 0) {
        const intersect = intersects[0];
  
        // xác định điểm hover chuột có nằm trên phần non-transparent hay ko
        const uv = intersect.uv;
        // convert uv sang -> pixel 
        const uvX = Math.floor(uv.x * texture.image.width);
        const uvY = Math.floor(uv.y * texture.image.height);
        // xác định index của pixel trong mảng imageData
        // mỗi pixel có 4 giá trị (RGBA) nên cần nhân với 4
        const index = (uvY * texture.image.width + uvX) * 4;
  
        // Check giá trị alpha của pixel (bỏ qua pixel hoàn toàn trong suốt)
        const alpha = imageData[index + 3]; // Alpha channel is the 4th value
        // nếu pixel ko là transparent
        if (alpha > 0) { 
          isHoveredItem = true;
        }
      }
  
      setIsHovered(isHoveredItem);
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      visible={visible && isHovered}
      userData={{ isHouseRow: true, id: config.id }}
    >
      <planeGeometry args={[5, 2]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}

        // sử đụng để lọc các pixel trong suốt < 0.5
        // alphaTest={0.5}
      />
    </mesh>
  );
};

export default HouseRow3;
