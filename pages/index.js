import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Stats,
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';

import Tree from '../components/Tree';

export default function Home() {
  return (
    <div className='container'>
      <Canvas>
        <OrbitControls />
        <Stats />
        <axesHelper args={[3]} />

        <ambientLight intensity={0.2} />
        <spotLight intensity={0.5} position={[20, 10, 10]} />
        <directionalLight color='red' position={[0, 0, 5]} />

        <Suspense fallback={null}>
          <Tree
            scale={[0.5, 0.5, 0.5]}
            rotation={[0, 45, 0]}
            position={[0, 3, 0]}
          />
          <Environment files='models/ghibli-bg.hdr' />
          <ContactShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}
