'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Load and display GLB model with auto-fit
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (scene && groupRef.current) {
      // Calculate bounding box to auto-fit the model
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      // Calculate the maximum dimension (diagonal for rotation safety)
      const maxDim = Math.max(size.x, size.y, size.z)
      const diagonal = Math.sqrt(size.x * size.x + size.y * size.y + size.z * size.z)
      
      // Use smaller scale to ensure it fits during rotation
      const scale = 1.6 / maxDim // Smaller scale to prevent clipping
      
      // Center the model
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
      
      // Apply scale
      groupRef.current.scale.set(scale, scale, scale)
      
      // Adjust camera to fit the model with extra margin for rotation
      // Use diagonal to ensure entire model is visible during rotation
      const distance = (diagonal * scale) * 1.8 // Extra margin for rotation
      camera.position.set(0, 0, distance)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
  }, [scene, camera])

  // Auto-rotate animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

interface GLBIconProps {
  className?: string
}

export default function GLBIcon({ className = '' }: GLBIconProps) {
  // Preload the model
  useGLTF.preload('/0.glb')
  
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
          <GLBModel url="/0.glb" />
        </Suspense>
      </Canvas>
    </div>
  )
}

