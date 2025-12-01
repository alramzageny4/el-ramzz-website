'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Load and display OBJ model (static, no rotation)
function OBJModel({ url }: { url: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  const [model, setModel] = useState<THREE.Group | null>(null)

  useEffect(() => {
    // Dynamic import for OBJLoader to avoid build issues
    import('three/examples/jsm/loaders/OBJLoader.js').then((module) => {
      const { OBJLoader } = module
      const loader = new OBJLoader()
    loader.load(
      url,
      (object) => {
        setModel(object)
        
        if (object && groupRef.current) {
          // Calculate bounding box to auto-fit the model
          const box = new THREE.Box3().setFromObject(object)
          const center = box.getCenter(new THREE.Vector3())
          const size = box.getSize(new THREE.Vector3())
          
          // Calculate the maximum dimension
          const maxDim = Math.max(size.x, size.y, size.z)
          const diagonal = Math.sqrt(size.x * size.x + size.y * size.y + size.z * size.z)
          
          // Scale to fit
          const scale = 1.6 / maxDim
          
          // Center the model
          object.position.x = -center.x
          object.position.y = -center.y
          object.position.z = -center.z
          
          // Apply scale
          groupRef.current.scale.set(scale, scale, scale)
          
          // Adjust camera to fit the model
          const distance = (diagonal * scale) * 1.8
          camera.position.set(0, 0, distance)
          camera.lookAt(0, 0, 0)
          camera.updateProjectionMatrix()
        }
      },
      undefined,
      (error) => {
        console.error('Error loading OBJ:', error)
      }
    )
    }).catch((error) => {
      console.error('Error loading OBJLoader:', error)
    })
  }, [url, camera])

  if (!model) return null

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  )
}

interface OBJIconProps {
  className?: string
}

export default function OBJIcon({ className = '' }: OBJIconProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <OBJModel url="/2.obj" />
        </Suspense>
      </Canvas>
    </div>
  )
}

