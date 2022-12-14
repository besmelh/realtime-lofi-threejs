import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import TreeModel from './TreeModel';
import { Tree } from '../public/models/Tree';

const AnimatedBox = () => {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    // <mesh ref={meshRef} scale={[0.5, 0.5, 0.5]}>
    //   <Tree />
    //   <meshStandardMaterial />
    // </mesh>
    <TreeModel />
  );
};

export default AnimatedBox;
