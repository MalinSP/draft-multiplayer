import React, { useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({
  socket,
  models,
  modelsArr,
  randomNumber,
  setModels,
}) {
  console.log(models)

  return (
    <group>
      {models.map((figure, index) => {
        console.log(figure)
        const { socketID, modelName, model } = figure
        console.log(model)
        return (
          <primitive
            key={socketID}
            object={model.scene}
            scale={0.5}
            position={[index * 0.2, 0, 0]}
          ></primitive>
        )
      })}
    </group>
    // </group>
  )
}
