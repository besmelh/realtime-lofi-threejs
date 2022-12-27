import { useState, useEffect } from 'react';
import Building from './Building';

export default function AllBuildings(props) {
  const building_count = 25;
  const randZ_default = [-2, -1.5, -1, -0.5, 0, 0.5];
  const sound = props.sound;

  const [randZ, setRandZ] = useState(null);

  useEffect(() => {
    setRandZ(randomLocations(building_count, -15, -2, true));
  }, []);

  function randomLocations(count, min, max, isFloat) {
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

  function createBuildings() {
    const this_randZ = randZ || randZ_default;
    const span_dist = 30; // the width x distance that the buildings will spwan across
    console.log('buildings_randZ', this_randZ);
    let buildings = []; // The array of buildings to pass to the canvas.
    let x = (-1 * span_dist) / 2;
    let offset = span_dist / building_count;

    for (let i = 0; i < building_count; i++) {
      x = x + offset;
      let key = `building_${i}`;
      // I want the spheres to be a nice loop, so the index goes up to building_count / 2,
      // then back down.
      let idx = i < building_count / 2 ? i : building_count - i;
      buildings.push(
        <Building
          key={key}
          position={[x, 0, this_randZ[i] || 0]}
          index={idx}
          sound={sound}
        />
      );
    }
    return buildings;
  }

  return <>{createBuildings()}</>;
}
