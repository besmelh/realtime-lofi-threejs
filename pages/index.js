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
      <Canvas camera={{ fov: 100, position: [0, 0, 5] }}>
        {/********** development helpers *********/}
        <OrbitControls />
        <Stats />
        <axesHelper args={[3]} />

        {/********** environment and lighting *********/}
        <Environment files='models/ghibli-bg.hdr' />
        <ContactShadows opacity={0.2} color='#02261f' />
        <color attach='background' args={['#D0E4E5']} />
        <pointLight
          intensity={0.2}
          position={[12, 5, 0]}
          rotation={[90, 90, 90]}
        />
        <directionalLight
          intensity={0.5}
          position={[5, 5, 5]}
          rotation={[0, 0, 0]}
        />

        {/********** elements *********/}
        <Suspense fallback={null}>
          {/********** trees *********/}
          <Tree
            scale={[0.9, 0.6, 0.6]} //depth, height, width
            rotation={[0, 80, 0]}
            position={[-8, -3, 0]} //x-red, y-green, z-blue
          />

          <Tree
            scale={[0.6, 0.7, 1]}
            rotation={[0, 80, 0]}
            position={[-8, -6, -1]}
            color='#169166'
          />

          <Tree
            scale={[1, 1.5, 1.1]}
            rotation={[0, 80, 0]}
            position={[-2, -8, -3]}
          />

          <Tree
            scale={[0.6, 0.7, 1]}
            rotation={[0, 80, 0]}
            position={[5, -5, 0]}
            color='#169166'
          />

          <Tree
            scale={[0.8, 0.8, 0.6]}
            rotation={[80, 160, 80]}
            position={[10, -1, 0]}
          />

          {/********** cloudss *********/}

          <Tree
            scale={[1, 1, 2]}
            rotation={[0, 80, 0]}
            position={[-35, 12, -15]}
            color='white'
          />

          <Tree
            scale={[1, 1, 2]}
            rotation={[0, 80, 0]}
            position={[-10, 12, -10]}
            color='white'
          />

          <Tree
            scale={[1, 1, 2]}
            rotation={[0, 90, 180]}
            position={[8, 12, -20]}
            color='white'
          />

          <Tree
            scale={[1, 1, 1.8]}
            rotation={[0, 80, 0]}
            position={[25, 12, -12]}
            color='white'
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
