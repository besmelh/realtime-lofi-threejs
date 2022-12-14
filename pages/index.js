import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Stats,
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';

function Tree(props) {
  const { nodes, materials } = useGLTF('/models/tree.gltf');
  return (
    <group {...props} dispose={null}>
      <mesh>
        <group
          position={[-0.08, 3.36, 3.31]}
          rotation={[-1.2, 0, 0]}
          scale={[0.41, 1, 1]}
        >
          <mesh
            geometry={nodes.Foliage.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[0.97, -0.3, -0.84]}
          rotation={[0.65, 0, 0]}
          scale={[0.41, 1, 1]}
        >
          <mesh
            geometry={nodes.Foliage_1.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[0.31, 3.59, -0.9]}
          rotation={[-1.83, 0, 0]}
          scale={[0.41, 1, 1]}
        >
          <mesh
            geometry={nodes.Foliage_2.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[-0.11, 1.36, -2.15]}
          rotation={[0.86, 0, 0]}
          scale={[0.41, 1, 1]}
        >
          <mesh
            geometry={nodes.Foliage_3.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[0.13, 0.14, 3.53]}
          rotation={[1.25, 0, 0]}
          scale={[0.41, 1, 1]}
        >
          <mesh
            geometry={nodes.Foliage_4.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[1.02, 2.02, 1.04]}
          rotation={[-0.98, 0, 0]}
          scale={[0.41, 1, 1]}
        >
          <mesh
            geometry={nodes.Foliage_5.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[0.32, -1.64, 0.94]}
          rotation={[1.78, 0, 0]}
          scale={[0.32, 0.79, 0.79]}
        >
          <mesh
            geometry={nodes.Foliage_6.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[-0.02, 2.21, 4.94]}
          rotation={[0.68, 0.2, 0.25]}
          scale={[0.32, 0.79, 0.79]}
        >
          <mesh
            geometry={nodes.Foliage_7.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <group
          position={[0.22, 5.47, 1.98]}
          rotation={[1.19, 0.21, -2.95]}
          scale={[0.32, 0.79, 0.79]}
        >
          <mesh
            geometry={nodes.Foliage_8.geometry}
            material={materials['Basic Foliage']}
          />
        </group>
        <meshToonMaterial color='red' />
      </mesh>
    </group>
  );
}

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
          <mesh>
            <Tree
              scale={[0.5, 0.5, 0.5]}
              rotation={[0, 45, 0]}
              position={[0, 3, 0]}
            />
          </mesh>
          <Environment files='models/ghibli-bg.hdr' />
          <ContactShadows />
        </Suspense>
      </Canvas>
    </div>
  );
}
