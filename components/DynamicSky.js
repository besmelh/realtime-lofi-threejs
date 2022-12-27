import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import SunCalc from 'suncalc';
import { useGeolocated } from 'react-geolocated';
import { Sky } from '@react-three/drei';

export default function DynamicSky(props) {
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

  return <>{sky}</>;
}
