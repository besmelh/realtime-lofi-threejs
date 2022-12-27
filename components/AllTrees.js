import Tree from './Tree';

export default function AllTrees(props) {
  return (
    <>
      <Tree
        scale={[0.9, 0.6, 0.6]} //depth, height, width
        rotation={[0, 80, 0]}
        position={[-5, -6, 0]} //x-red, y-green, z-blue
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
        position={[-2, -10, -3]}
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
    </>
  );
}
