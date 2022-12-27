import React, { useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function Buildings(props) {
  const mesh = useRef();

  /*
    We want the scale of the frequency data (0 - 255) to map to the scale of the spheres.
     */
  function adjustScale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /*
   * Each sphere is getting its own analyzer node.
   * This sets the scale of the spheres as the music plays.
   * Setting the size to every second index of the frequency data.
   */
  function Analyzer({ sound }) {
    const analyzer = useRef();
    const outMin = 0.8;
    const outMax = 1.2;

    useEffect(() => {
      analyzer.current = new THREE.AudioAnalyser(sound.current, 512);
    }, [sound]);

    useFrame(() => {
      if (analyzer.current) {
        let data = analyzer.current.getFrequencyData();

        // increase y height
        mesh.current.scale.y = adjustScale(
          data[props.index * 2],
          0,
          255,
          outMin,
          outMax
        );

        // decrease x and z, to give it a squashing effect
        mesh.current.scale.x = mesh.current.scale.z = adjustScale(
          data[props.index * 2],
          0,
          255,
          outMax,
          outMin
        );
      }
    });
    // 0.8,
    // 1.2

    //saudia students care phone number: 920020828

    return <></>;
  }

  return (
    <>
      <mesh position={props.position} ref={mesh}>
        <boxGeometry args={[0.6, 3, 0.6]} /> {/* width, height, depth */}
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <Analyzer sound={props.sound} />
    </>
  );
}
