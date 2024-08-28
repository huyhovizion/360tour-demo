// import React, { useRef, useEffect } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three';
// import {GUI} from 'dat.gui';

// const HouseRow = ({ visible, initialPosition, initialRotation, initialScale }) => {
//   const meshRef = useRef();
//   const texture = useLoader(TextureLoader, '/images/house.png');

//   useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.position.copy(initialPosition);
//       meshRef.current.rotation.set(...initialRotation);
//       meshRef.current.scale.set(...initialScale);
//     }
//   }, [initialPosition, initialRotation, initialScale, visible]);

//   useEffect(()=>{
//     const gui = new GUI();
//     //
//     const itemFolder = gui.addFolder('Item');
//     itemFolder.add(meshRef.current.rotation, 'x', -5, Math.PI * 2);
//     itemFolder.add(meshRef.current.rotation, 'y', -5, Math.PI * 2);
//     itemFolder.add(meshRef.current.rotation, 'z', -5, Math.PI * 2);
//     itemFolder.open();
//     //
//     const cameraFolder = gui.addFolder('Camera');
//     cameraFolder.add(meshRef.current.position, 'x', -1000, 1000);
//     cameraFolder.add(meshRef.current.position, 'y', -1000, 1000);
//     cameraFolder.add(meshRef.current.position, 'z', -1000, 1000);
//     cameraFolder.open();
//     //
//     const scaleFolder = gui.addFolder('Scale');
//     scaleFolder.add(meshRef.current.scale, 'x', 0, 500);
//     scaleFolder.add(meshRef.current.scale, 'y', 0, 500);
//     scaleFolder.add(meshRef.current.scale, 'z', 0, 500);
//     scaleFolder.open();
//     return () => {
//       gui.destroy(); // Dọn dẹp GUI khi component unmount hoặc khi effect chạy lại
//     };
//   }, [meshRef]);

//   if (!visible) return null;

//   return (
//     <mesh
//       ref={meshRef}
//       //hover chuột sẽ thay đổi
//       onPointerOver={() => {
//         meshRef.current.material.color.set('#89A1DB');
//       }}
//       onPointerOut={() => {
//         meshRef.current.material.color.set('white');
//       }}
//     >
//       <planeGeometry args={[5, 2]} />
//       <meshBasicMaterial map={texture} transparent={true} />
//     </mesh>
//   );
// };

// export default HouseRow;
