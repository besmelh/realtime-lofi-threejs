import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stats,
  OrbitControls,
  ContactShadows,
  Environment,
  PivotControls,
  useHelper,
  Sky,
} from '@react-three/drei';
import Spotify from 'react-spotify-embed';
import Tree from '../components/Tree';
import SunCalc from 'suncalc';
import { useGeolocated } from 'react-geolocated';
import Cloud from '../components/Cloud';
import Buildings from '../components/Buildings';
import { PositionalAudio } from '@react-three/drei';

export default function Home() {
  const sound = useRef();
  const [play, setPlay] = useState(true);
  const building_count = 10;
  const randZ = useRef();
  useEffect(() => {
    randZ.current = randomLocations(10, -1.9, 1.9, true);
  });

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  let curTime = new Date();
  // coordinates of hawaii are default
  var long = 19.8968;
  var lat = 155.5828;

  function waitForElement() {
    if (typeof coords !== 'undefined') {
      long = coords.longitude;
      lat = coords.latitude;
    } else {
      setTimeout(waitForElement, 250);
    }
  }

  waitForElement();

  var times = SunCalc.getTimes(curTime, long, lat);

  var sky;

  //dawn
  if (curTime < times.nightEnd) {
    console.log('sunrise sky');
    sky = (
      <Sky
        distance={450000}
        sunPosition={[10, 0, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }
  //sunrise
  else if (curTime >= times.nightEnd && curTime < times.sunriseEnd) {
    console.log('sunrise sky');
    sky = (
      <Sky
        distance={450000}
        sunPosition={[10, 0, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }
  //morning
  else if (curTime >= times.sunriseEnd && curTime < times.solarNoon) {
    console.log('morning sky' + long + ' ' + lat);
    sky = (
      <Sky
        distance={450000}
        sunPosition={[10, 5, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }
  //noon
  else if (curTime >= times.solarNoon && curTime < times.goldenHour) {
    console.log('noon sky');
    sky = (
      <Sky
        distance={450000}
        sunPosition={[0, 5, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }
  //afternoon, goldenhour
  else if (curTime >= times.goldenHour && curTime < times.sunsetStart) {
    console.log('afternoon, goldenhour sky');
    sky = (
      <Sky
        distance={450000}
        sunPosition={[-10, 2, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }
  //sunset
  else if (curTime >= times.sunsetStart && curTime < times.dusk) {
    console.log('sunset sky:' + long + ' ' + lat);
    sky = (
      <Sky
        distance={450000}
        sunPosition={[-10, 0, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }
  //evening
  else if (curTime >= times.dusk) {
    console.log('evening sky:' + long + ' ' + lat);
    sky = (
      <Sky
        distance={450000}
        sunPosition={[-10, -10, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  } else {
    console.log('default sky:' + long + ' ' + lat + ' ' + curTime);
    console.log('times:', times);
    sky = (
      <Sky
        distance={450000}
        sunPosition={[10, 5, 0]}
        inclination={0}
        azimuth={0.25}
      />
    );
  }

  function randomLocations(count, min, max, isFloat) {
    console.log('creating new locations...');
    let result = [];
    for (let i = 0; i < count; i++) {
      if (isFloat) {
        result.push(Math.random() * (max - min) + min);
      } else {
        result.push(Math.floor(Math.random() * (max - min) + min));
      }
    }
    return result;
  }

  function createBuildings(building_z_locations) {
    const number = 10;
    console.log('building_z_locations', building_z_locations);
    let buildings = []; // The array of buildings to pass to the canvas.
    let x = -5;

    for (let i = 0; i < number; i++) {
      x = x + 1;
      let key = `building_${i}`;
      // I want the spheres to be a nice loop, so the index goes up to number / 2,
      // then back down.
      let idx = i < number / 2 ? i : number - i;
      buildings.push(
        <Buildings key={key} position={[x, 0, 0]} index={idx} sound={sound} />
      );
      console.log('added new building');
    }
    return buildings;
  }

  // Added a button to pause the music.
  function playMusic() {
    if (play) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
    setPlay(!play);
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
        {sky}
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
          {/* <Tree
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
          /> */}
          {/********** clouds *********/}
          <Cloud
            scale={[1, 1, 2]}
            rotation={[0, 80, 0]}
            position={[-35, 12, -15]}
            color='#e8fcfb'
          />
          <pointLight
            intensity={0.1}
            position={[-35, 12, -15]}
            distance={30}
            decay={2}
            color='#fffedb'
          />
          <Cloud
            scale={[1, 1, 2]}
            rotation={[0, 80, 0]}
            position={[-10, 12, -10]}
            color='#e8fcfb'
          />
          <Cloud
            scale={[1, 1, 2]}
            rotation={[0, 90, 180]}
            position={[8, 12, -20]}
            color='#e8fcfb'
          />
          <Cloud
            scale={[1, 1, 1.8]}
            rotation={[0, 80, 0]}
            position={[25, 12, -12]}
            color='#e8fcfb'
          />
          <pointLight
            intensity={0.1}
            position={[25, 15, -12]}
            distance={30}
            decay={2}
            color='#fffedb'
          />
          {/********** buildings *********/}
          <PositionalAudio url='./music.mp3' distance={10} loop ref={sound} />
          {createBuildings(randZ)}
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
