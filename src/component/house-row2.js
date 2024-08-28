// // HouseRow.js
// import React, { useRef, useEffect, useState } from 'react';
// import { useLoader, useFrame } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import * as THREE from 'three'; 

// const HouseRow2 = ({ visible, initialPosition, initialRotation, initialScale, config }) => {
//   const meshRef = useRef();
//   const texture = useLoader(TextureLoader, '/images/house3.png');
//   const raycaster = useRef(new THREE.Raycaster());
//   const pointer = useRef(new THREE.Vector2());
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.position.copy(initialPosition);
//       meshRef.current.rotation.set(...initialRotation);
//       meshRef.current.scale.set(...initialScale);
//       meshRef.current.visible = visible;
//     }
//   }, [initialPosition, initialRotation, initialScale, visible]);

//   useFrame(({ camera, mouse, scene }) => {
//     if (meshRef.current) {
//       raycaster.current.setFromCamera(mouse, camera);
//       const intersects = raycaster.current.intersectObjects(scene.children);

//       let isHoveredItem = false;
//       for (let intersect of intersects) {
//         if (intersect.object === meshRef.current) {
//           isHoveredItem = true;
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
//       <meshBasicMaterial map={texture} transparent={true} />
//     </mesh>
//   );
// };

// export default HouseRow2;
