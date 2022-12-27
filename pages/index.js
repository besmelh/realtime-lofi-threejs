import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stats,
  OrbitControls,
  ContactShadows,
  Environment,
  PivotControls,
  useHelper,
} from '@react-three/drei';
import Spotify from 'react-spotify-embed';
import { PositionalAudio } from '@react-three/drei';
import AllClouds from '../components/AllClouds';
import AllTrees from '../components/AllTrees';
import AllBuildings from '../components/AllBuildings';
import DynamicSky from '../components/DynamicSky';

export default function Home() {
  const sound = useRef();
  const [play, setPlay] = useState(true);

  // Added a button to pause the music.
  function playMusic() {
    if (play) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
    setPlay(!play);
  }

  function waitForElement() {
    if (typeof coords !== 'undefined') {
      long = coords.longitude;
      lat = coords.latitude;
    } else {
      setTimeout(waitForElement, 250);
    }
  }

  return (
    <div className='container'>
      {waitForElement()}
      <Canvas camera={{ fov: 100, position: [0, 0, 5] }}>
        {/********** development helpers *********/}
        {/* <OrbitControls /> */}
        {/* <Stats /> */}
        {/* <axesHelper args={[3]} /> */}

        {/********** environment and lighting *********/}
        <DynamicSky />
        <hemisphereLight intensity={0.1} />
        <Environment files='models/ghibli-bg.hdr' />
        <ContactShadows opacity={0.2} color='#02261f' />
        {/* side lights */}
        <pointLight
          intensity={0.2}
          position={[12, 5, 0]}
          rotation={[90, 90, 90]}
        />
        <directionalLight
          intensity={0.2}
          position={[5, 5, 5]}
          rotation={[0, 0, 0]}
        />
        {/* side lights */}
        <directionalLight
          intensity={0.3}
          position={[0, 0, 10]}
          rotation={[0, 0, 0]}
          color='#fff1d4'
        />
        {/********** elements *********/}
        <Suspense fallback={null}>
          {/********** trees *********/}
          <AllTrees />
          {/********** clouds *********/}
          <AllClouds />
          {/********** buildings *********/}
          <PositionalAudio url='./music.mp3' distance={10} loop ref={sound} />
          <AllBuildings sound={sound} />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: 'fixed',
          bottom: '80px',
          left: '30px',
          zIndex: '999',
          minWidth: '400px',
          width: '30%',
          height: ' 23px',
        }}
      >
        <Spotify
          wide
          link='https://open.spotify.com/playlist/0V5IsHm0VJbmeffuLzgoc3?si=ddc0af96d95c4a4b'
        />
        <button onClick={playMusic}>Play</button>
      </div>
    </div>
  );
}
