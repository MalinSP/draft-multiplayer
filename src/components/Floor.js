import React from 'react'

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

export default Floor
