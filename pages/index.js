import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import AnimatedBox from '../components/AnimatedBox';

export default function Home() {
  return (
    <div className='container'>
      <Canvas>
        <OrbitControls />
        <Stats />
        <axesHelper args={[3]} />
        <ambientLight intensity={0.1} />
        <directionalLight color='red' position={[0, 0, 5]} />
        <AnimatedBox />
      </Canvas>
    </div>
  );
}
