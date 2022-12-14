import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Stats,
  OrbitControls,
  ContactShadows,
  Environment,
  PivotControls,
  useHelper,
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
        {/* <spotLight intensity={0.5} position={[10, 0, 0]} rotation={[0, 0, 0]} /> */}
        <directionalLight
          intensity={0.5}
          position={[5, 5, 5]}
          rotation={[0, 0, 0]}
        />
        <color attach='background' args={['#D0E4E5']} />

        <Suspense fallback={null}>
          <PivotControls>
            <Tree
              scale={[0.5, 0.5, 0.6]}
              rotation={[0, 80, 0]}
              position={[0, 3, 0]}
            />
          </PivotControls>

          <PivotControls>
            <Tree
              scale={[0.8, 0.8, 0.6]}
              rotation={[80, 160, 80]}
              position={[10, 5, 0]}
            />
          </PivotControls>

          <Environment files='models/ghibli-bg.hdr' />
          <ContactShadows opacity={0.2} color='#02261f' />
        </Suspense>
      </Canvas>
    </div>
  );
}
