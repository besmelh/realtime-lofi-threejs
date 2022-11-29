import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const AnimatedBox = () => {
  const meshRef = useRef(null);

  useFrame(() => {
    console.log('hi');
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default AnimatedBox;
