import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Floor from './components/Floor'
import styled from 'styled-components'
import io from 'socket.io-client'
import Model from './components/Model'
import Placeholder from './components/Placeholder'
import { useEffect, useMemo, useState } from 'react'
import { useGLTF } from '@react-three/drei'

const socket = io.connect('http://localhost:3001')

function App() {
  const modelOne = useGLTF('./models/CesiumMan.gltf')
  const modelTwo = useGLTF('./models/BrainStem.gltf')
  const modelThree = useGLTF('./models/RiggedFigure.gltf')
  const modelsArr = [modelOne, modelTwo, modelThree]
  const [models, setModels] = useState([])
  const room = 1

  const modelsObject = [
    {
      id: 1,
      modelName: 'cesiumMan',
      model: modelOne,
    },
    {
      id: 2,
      modelName: 'brainStem',
      model: modelTwo,
    },
    {
      id: 3,
      modelName: 'riggedFigure',
      model: modelThree,
    },
  ]
  const randomNumber = Math.floor(Math.random() * modelsObject.length)
  const randomModel = modelsObject[randomNumber]
  console.log(randomModel)

  useEffect(() => {
    socket.emit('userCreated', {
      socketID: socket.id,
      // modelName: randomModel.modelName,
    })
    socket.on('connectedUsers', (data) => {
      console.log(data.length)
    })
    // setModels((list) => [...list, randomModel])
    console.log('fist render')
    // return () => {
    //   socket.off('userCreated')
    // }
    // console.log('fist render')
  }, [])

  useEffect(() => {
    // const fetchServer = async () => {
    // await
    socket.on('remoteData', (data, index) => {
      // console.log(...(data['scene'] = modelsArr[0]))
      // if (!models.length) {
      //   data.map((item) => {
      //     const { id, modelNumber } = item
      //     item.model = modelsArr[modelNumber]
      //     setModels((list) => [...list, item])
      //   })
      //   console.log('empty array')
      // } else {
      //   console.log('array has item')
      // }
      // data.map((item) => {
      //   const { id, modelNumber } = item
      //   item.model = modelsArr[modelNumber]
      //   console.log(item)
      //   if (!models.length) {
      //     console.log('array is empty')
      //     setModels((list) => [...list, item])
      //     console.log(models.length)
      //   } else {
      //     models.reduce((accumulator, current) => {
      //       if (accumulator.id !== current.id) {
      //         return accumulator
      //       }
      //       console.log(accumulator)
      //     }, [])
      //   }
      // })
      // setModels(data)
      // data.map((player) => {
      //   const { id, modelNumber } = player
      //   const finalModel = modelsObject[modelNumber]
      //   //  setModels((list) => [...list, finalModel])
      // })
    })
    // }
    // fetchServer()
    // return () => {
    //   socket.off('remoteData')
    // }
    console.log('second render')

    socket.on('connectedUsers', (data) => {
      data.map((user) => {
        user.model = modelsArr[randomNumber]
        console.log(user)
        setModels((list) => [...list, user])
      })
    })
  }, [socket, models])

  return (
    <>
      <CanvasContainerWrapper>
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Floor />
          <Model
            models={models}
            socket={socket}
            modelsObject={modelsObject}
            setModels={setModels}
            randomModel={randomModel}
            modelsArr={modelsArr}
            randomNumber={randomNumber}
          />
          <OrbitControls />
        </Canvas>
      </CanvasContainerWrapper>
    </>
  )
}

const CanvasContainerWrapper = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
`
export default App
