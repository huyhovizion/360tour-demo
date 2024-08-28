// import React, { useRef, useEffect, useState } from 'react';
// import { useLoader, useFrame } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import * as THREE from 'three';

// const HouseRow4 = ({ visible, initialPosition, initialRotation, initialScale, config }) => {
//   const meshRef = useRef();
//   const texture = useLoader(TextureLoader, '/images/house3.png'); // Đường dẫn ảnh PNG
//   const raycaster = useRef(new THREE.Raycaster());
//   const pointer = useRef(new THREE.Vector2());
//   const [isHovered, setIsHovered] = useState(false);

//   // Load texture data to check pixel colors
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     const img = new Image();
//     img.src = '/images/house3.png';
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       setImageData(ctx.getImageData(0, 0, img.width, img.height).data);
//     };
//   }, []);

//   useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.position.copy(initialPosition);
//       meshRef.current.rotation.set(...initialRotation);
//       meshRef.current.scale.set(...initialScale);
//       meshRef.current.visible = visible;
//     }
//   }, [initialPosition, initialRotation, initialScale, visible]);

//   useFrame(({ camera, mouse, scene }) => {
//     if (meshRef.current && imageData) {
//       raycaster.current.setFromCamera(mouse, camera);
//       const intersects = raycaster.current.intersectObjects(scene.children);

//       let isHoveredItem = false;
//       for (let intersect of intersects) {
//         if (intersect.object === meshRef.current) {
//           // Get intersection point in texture space
//           const uv = intersect.uv;
//           const uvX = Math.floor(uv.x * texture.image.width);
//           const uvY = Math.floor(uv.y * texture.image.height);
//           const index = (uvY * texture.image.width + uvX) * 4;

//           // Check the color of the pixel (ignore fully transparent pixels)
//           const r = imageData[index];
//           const g = imageData[index + 1];
//           const b = imageData[index + 2];
//           const alpha = imageData[index + 3]; // Alpha channel

//           // If the pixel has color and is not fully transparent
//           if (alpha > 0 && (r !== 0 || g !== 0 || b !== 0)) {
//             isHoveredItem = true;
//           }
//           break;
//         }
//       }

//       setIsHovered(isHoveredItem);
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       visible={visible && isHovered}
//       userData={{ isHouseRow: true, id: config.id }}
//     >
//       <planeGeometry args={[5, 2]} />
//       <meshBasicMaterial
//         map={texture}
//         transparent={true}
//         alphaTest={0.5} // Cần thiết để loại bỏ nền trong suốt
//       />
//     </mesh>
//   );
// };

// export default HouseRow4;
