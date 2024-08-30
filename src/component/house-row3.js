import React, { useRef, useEffect, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const HouseRow3 = ({ visible, initialPosition, initialRotation, initialScale, config }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, config.url);
  const raycaster = useRef(new THREE.Raycaster());
  const [isHovered, setIsHovered] = useState(false);

  // Load texture để check pixel alpha của ảnh
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = config.url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setImageData(ctx.getImageData(0, 0, img.width, img.height).data);
    };
  }, [config.url]);

  useEffect(() => {
    if (meshRef.current) {
      const position = new THREE.Vector3(...initialPosition);
      meshRef.current.position.copy(position);
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
      />
    </mesh>
  );
};

export default HouseRow3;

// import React, { useRef, useEffect, useState } from 'react';
// import { useLoader, extend, useFrame, useThree } from '@react-three/fiber';
// import { TextureLoader, DoubleSide } from 'three';
// import * as THREE from 'three';
// import { GUI } from 'dat.gui';
// import { cleanLoadTexture } from 'utils/textureHelper';
// import { DragControls } from 'three/examples/jsm/controls/DragControls';

// extend({ DragControls });

// const ShapeRow = ({ visible, initialPosition, initialRotation, initialScale, config }) => {
//   const meshRef = useRef();
//   const [texture, setTexture] = useState(null);
//   const [selected, setSelected] = useState(false);
//   const { raycaster, camera, gl } = useThree();
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageData, setImageData] = useState(null);
//   const guiRef = useRef(null);
//   let posXControl, posYControl, posZControl;

//   useEffect(() => {
//     cleanLoadTexture(config.url).then(setTexture);
//   }, [config]);

//   useEffect(() => {
//     const img = new Image();
//     img.src = config.url;
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       setImageData(ctx.getImageData(0, 0, img.width, img.height).data);
//     };
//   }, [config.url]);

//   useEffect(() => {
//     if (meshRef.current) {
//       const position = new THREE.Vector3(...initialPosition);
//       meshRef.current.position.copy(position);
//       meshRef.current.rotation.set(...initialRotation);
//       meshRef.current.scale.set(...initialScale);
//       meshRef.current.visible = visible;
//     }
//   }, [initialPosition, initialRotation, initialScale, visible]);

//   useEffect(() => {
//     if (selected && meshRef.current) {
//       const gui = new GUI();
//       guiRef.current = gui;

//       const itemFolder = gui.addFolder('Rotation');
//       itemFolder.add(meshRef.current.rotation, 'x', -5, Math.PI * 2);
//       itemFolder.add(meshRef.current.rotation, 'y', -5, Math.PI * 2);
//       itemFolder.add(meshRef.current.rotation, 'z', -5, Math.PI * 2);
//       itemFolder.open();

//       const cameraFolder = gui.addFolder('Position');
//       posXControl = cameraFolder.add(meshRef.current.position, 'x', -1000, 1000);
//       posYControl = cameraFolder.add(meshRef.current.position, 'y', -1000, 1000);
//       posZControl = cameraFolder.add(meshRef.current.position, 'z', -1000, 1000);
//       cameraFolder.open();

//       const scaleFolder = gui.addFolder('Scale');
//       scaleFolder.add(meshRef.current.scale, 'x', 0, 500);
//       scaleFolder.add(meshRef.current.scale, 'y', 0, 500);
//       scaleFolder.open();

//       const opacityFolder = gui.addFolder('Opacity');
//       opacityFolder.add(meshRef.current.material, 'opacity', 0.195, 0.5);
//       opacityFolder.open();

//       return () => {
//         gui.destroy();
//         guiRef.current = null;
//       };
//     } else if (guiRef.current) {
//       guiRef.current.destroy();
//       guiRef.current = null;
//     }
//   }, [selected]);

//   useEffect(() => {
//     const controls = new DragControls([meshRef.current], camera, gl.domElement);
//     controls.addEventListener('dragstart', (event) => {
//       event.object.material.opacity = 0.5;
//     });
//     controls.addEventListener('dragend', (event) => {
//       event.object.material.opacity = 1;
//       if (posXControl) posXControl.updateDisplay();
//       if (posYControl) posYControl.updateDisplay();
//       if (posZControl) posZControl.updateDisplay();
//     });
//     return () => {
//       controls.dispose();
//     };
//   }, [camera, gl.domElement]);

//   useFrame(({ camera, mouse }) => {
//     if (meshRef.current && imageData) {
//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObject(meshRef.current);

//       let isHoveredItem = false;
//       if (intersects.length > 0) {
//         const intersect = intersects[0];
//         const uv = intersect.uv;
//         const uvX = Math.floor(uv.x * texture?.image.width);
//         const uvY = Math.floor(uv.y * texture?.image.height);
//         const index = (uvY * texture?.image.width + uvX) * 4;
//         const alpha = imageData[index + 3];
//         if (alpha > 0) {
//           isHoveredItem = true;
//         }
//       }

//       setIsHovered(isHoveredItem);
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       visible={visible}
//       userData={{ isShapeRow: true, id: config.id }}
//       onClick={() => setSelected(!selected)}
//     >
//       <planeGeometry args={[5, 2]} />
//       <meshPhongMaterial
//         color="white"
//         map={texture}
//         alphaTest={0.1}
//         side={DoubleSide}
//         transparent
//         opacity={1.1}
//       />
//     </mesh>
//   );
// };

// export default ShapeRow;


// import React, { useRef, useEffect, useState } from 'react';
// import { useLoader, extend, useFrame, useThree } from '@react-three/fiber';
// import { TextureLoader, DoubleSide } from 'three';
// import * as THREE from 'three';
// import { GUI } from 'dat.gui';
// import { cleanLoadTexture } from 'utils/textureHelper';
// import { DragControls } from 'three/examples/jsm/controls/DragControls';

// extend({ DragControls });

// const ShapeRow = ({ visible, initialPosition, initialRotation, initialScale, config }) => {
//   const meshRef = useRef();
//   const [texture, setTexture] = useState(null);
//   const [selected, setSelected] = useState(false);
//   const { raycaster, camera, gl } = useThree();
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageData, setImageData] = useState(null);
//   const guiRef = useRef(null);
//   let posXControl, posYControl, posZControl;

//   useEffect(() => {
//     cleanLoadTexture(config.url).then(setTexture);
//   }, [config]);

//   useEffect(() => {
//     const img = new Image();
//     img.src = config.url;
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       setImageData(ctx.getImageData(0, 0, img.width, img.height).data);
//     };
//   }, [config.url]);

//   useEffect(() => {
//     if (meshRef.current) {
//       const position = new THREE.Vector3(...initialPosition);
//       meshRef.current.position.copy(position);
//       meshRef.current.rotation.set(...initialRotation);
//       meshRef.current.scale.set(...initialScale);
//       meshRef.current.visible = visible;
//     }
//   }, [initialPosition, initialRotation, initialScale, visible]);

//   useEffect(() => {
//     if (selected && meshRef.current) {
//       const gui = new GUI();
//       guiRef.current = gui;

//       const itemFolder = gui.addFolder('Rotation');
//       itemFolder.add(meshRef.current.rotation, 'x', -5, Math.PI * 2);
//       itemFolder.add(meshRef.current.rotation, 'y', -5, Math.PI * 2);
//       itemFolder.add(meshRef.current.rotation, 'z', -5, Math.PI * 2);
//       itemFolder.open();

//       const cameraFolder = gui.addFolder('Position');
//       posXControl = cameraFolder.add(meshRef.current.position, 'x', -1000, 1000);
//       posYControl = cameraFolder.add(meshRef.current.position, 'y', -1000, 1000);
//       posZControl = cameraFolder.add(meshRef.current.position, 'z', -1000, 1000);
//       cameraFolder.open();

//       const scaleFolder = gui.addFolder('Scale');
//       scaleFolder.add(meshRef.current.scale, 'x', 0, 500);
//       scaleFolder.add(meshRef.current.scale, 'y', 0, 500);
//       scaleFolder.open();

//       const opacityFolder = gui.addFolder('Opacity');
//       opacityFolder.add(meshRef.current.material, 'opacity', 0.195, 0.5);
//       opacityFolder.open();

//       return () => {
//         gui.destroy();
//         guiRef.current = null;
//       };
//     } else if (guiRef.current) {
//       guiRef.current.destroy();
//       guiRef.current = null;
//     }
//   }, [selected]);

//   useEffect(() => {
//     const controls = new DragControls([meshRef.current], camera, gl.domElement);
//     controls.addEventListener('dragstart', (event) => {
//       event.object.material.opacity = 0.5;
//     });
//     controls.addEventListener('dragend', (event) => {
//       event.object.material.opacity = 1;
//       if (posXControl) posXControl.updateDisplay();
//       if (posYControl) posYControl.updateDisplay();
//       if (posZControl) posZControl.updateDisplay();
//     });
//     return () => {
//       controls.dispose();
//     };
//   }, [camera, gl.domElement]);

//   useFrame(({ camera }) => {
//     if (meshRef.current) {
//       meshRef.current.lookAt(camera.position);
//     }
//   });

//   useFrame(({ camera, mouse }) => {
//     if (meshRef.current && imageData) {
//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObject(meshRef.current);

//       let isHoveredItem = false;
//       if (intersects.length > 0) {
//         const intersect = intersects[0];
//         const uv = intersect.uv;
//         const uvX = Math.floor(uv.x * texture?.image.width);
//         const uvY = Math.floor(uv.y * texture?.image.height);
//         const index = (uvY * texture?.image.width + uvX) * 4;
//         const alpha = imageData[index + 3];
//         if (alpha > 0) {
//           isHoveredItem = true;
//         }
//       }

//       setIsHovered(isHoveredItem);
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       visible={visible}
//       userData={{ isShapeRow: true, id: config.id }}
//       onClick={() => setSelected(!selected)}
//     >
//       <planeGeometry args={[5, 2]} />
//       <meshPhongMaterial
//         color="white"
//         map={texture}
//         alphaTest={0.1}
//         side={DoubleSide}
//         transparent
//         opacity={1.1}
//       />
//     </mesh>
//   );
// };

// export default ShapeRow;