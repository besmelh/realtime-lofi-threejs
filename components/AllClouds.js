import Cloud from './Cloud';

export default function AllClouds(props) {
  return (
    <>
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
    </>
  );
}
