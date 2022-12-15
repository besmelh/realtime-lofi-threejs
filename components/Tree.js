import { useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import PropTypes from 'prop-types';

export default function Tree(props) {
  const { nodes, materials } = useGLTF('/models/tree.gltf');

  let foliage = props.foliage;
  let color = props.color;

  const treeRef = useRef(null);

  return (
    <group {...props} dispose={null}>
      {foliage.map((f) => (
        <mesh
          geometry={nodes.Foliage.geometry}
          position={f.position}
          rotation={f.rotation}
          scale={f.scale}
        >
          <meshToonMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

Tree.defaultProps = {
  color: '#067962',
  foliage: [
    {
      position: [-0.08, 3.36, 3.31],
      rotation: [-1.2, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [0.97, -0.3, -0.84],
      rotation: [0.65, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [0.31, 3.59, -0.9],
      rotation: [-1.83, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [-0.11, 1.36, -2.15],
      rotation: [0.86, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [0.13, 0.14, 3.53],
      rotation: [1.25, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [1.02, 2.02, 1.04],
      rotation: [-0.98, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [0.32, -1.64, 0.94],
      rotation: [1.78, 0, 0],
      scale: [0.41, 1, 1],
    },
    {
      position: [-0.02, 2.21, 4.94],
      rotation: [0.68, 0.2, 0.25],
      scale: [0.32, 0.79, 0.79],
    },
    {
      position: [0.22, 5.47, 1.98],
      rotation: [1.19, 0.21, -2.95],
      scale: [0.32, 0.79, 0.79],
    },
  ],
};
