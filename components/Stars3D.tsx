'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple glowing star point (like looking at stars from far away)
function StarNode({ position, color, size, speed, type = 'normal' }: { 
  position: [number, number, number]
  color: string
  size: number
  speed: number
  type?: 'normal' | 'bright' | 'pulsar'
}) {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Subtle pulsing animation (like stars twinkling)
    let pulse = 1
    if (type === 'pulsar') {
      pulse = Math.sin(time * speed * 2) * 0.25 + 0.75
    } else if (type === 'bright') {
      pulse = Math.sin(time * speed * 0.8) * 0.15 + 0.85
    } else {
      pulse = Math.sin(time * speed * 0.5) * 0.1 + 0.9
    }
    
    // Floating animation (stars moving gently)
    groupRef.current.position.y = position[1] + Math.sin(time * 0.3 + position[0]) * 0.3
    groupRef.current.position.x = position[0] + Math.cos(time * 0.25 + position[1]) * 0.2
    groupRef.current.position.z = position[2] + Math.sin(time * 0.2 + position[0] + position[1]) * 0.15
    
    // Scale with pulse
    const scale = pulse
    if (glowRef.current) {
      glowRef.current.scale.set(scale * 1.5, scale * 1.5, scale * 1.5)
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.set(scale * 2, scale * 2, scale * 2)
    }
    if (coreRef.current) {
      coreRef.current.scale.set(scale, scale, scale)
    }
    
    // Update opacity with twinkling effect
    if (coreRef.current?.material) {
      ;(coreRef.current.material as THREE.MeshBasicMaterial).opacity = pulse
    }
    if (glowRef.current?.material) {
      ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.4
    }
    if (outerGlowRef.current?.material) {
      ;(outerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.15
    }
  })

  const starColor = new THREE.Color(color)
  const glowColor = new THREE.Color(color).multiplyScalar(1.3)

  // Different sizes based on star type
  const coreSize = type === 'bright' ? size * 0.08 : type === 'pulsar' ? size * 0.06 : size * 0.04
  const glowSize = coreSize * 2
  const outerGlowSize = coreSize * 3.5

  return (
    <group ref={groupRef} position={position}>
      {/* Outer glow (atmospheric effect) */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[outerGlowSize, 16, 16]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Middle glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[glowSize, 16, 16]} />
        <meshBasicMaterial
          color={starColor}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      
      {/* Bright core (the actual star point) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[coreSize, 12, 12]} />
        <meshBasicMaterial
          color={starColor}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}


// Enhanced neural network connection with animated gradient
function NeuralConnection({ start, end, index, intensity = 1 }: { 
  start: [number, number, number]
  end: [number, number, number]
  index: number
  intensity?: number
}) {
  const lineRef = useRef<THREE.Line>(null)
  const glowLineRef = useRef<THREE.Line>(null)
  const trailRef = useRef<THREE.Line>(null)
  
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [start, end])

  const glowGeometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [start, end])

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color: '#6366f1', 
      transparent: true, 
      opacity: 0.6 * intensity,
      linewidth: 0.5 // Smaller line width
    })
  }, [intensity])

  const glowMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({ 
      color: '#a855f7', 
      transparent: true, 
      opacity: 0.4 * intensity, // Brighter glow
      linewidth: 1 // Smaller glow line
    })
  }, [intensity])

  // Create line objects with useMemo
  const glowLine = useMemo(() => {
    const line = new THREE.Line(glowGeometry, glowMaterial)
    glowLineRef.current = line
    return line
  }, [glowGeometry, glowMaterial])
  
  const mainLine = useMemo(() => {
    const line = new THREE.Line(geometry, material)
    lineRef.current = line
    return line
  }, [geometry, material])

  // Enhanced animated pulse effect with stronger glow
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const pulse = Math.sin(time * 2 + index * 0.15) * 0.4 + 0.6 // Stronger pulse
    
    if (lineRef.current?.material) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = (0.4 + pulse * 0.4) * intensity
    }
    if (glowLineRef.current?.material) {
      (glowLineRef.current.material as THREE.LineBasicMaterial).opacity = (0.3 + pulse * 0.3) * intensity // Brighter glow
    }
  })

  return (
    <group>
      {/* Glow line */}
      <primitive ref={glowLineRef} object={glowLine} />
      {/* Main connection line */}
      <primitive ref={lineRef} object={mainLine} />
    </group>
  )
}

// Enhanced data flow particle with trail effect
function DataFlow({ 
  start, 
  end, 
  speed, 
  delay,
  color = '#a855f7'
}: { 
  start: [number, number, number]
  end: [number, number, number]
  speed: number
  delay: number
  color?: string
}) {
  const particleRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Points>(null)
  const trailPositions = useRef<Float32Array>(new Float32Array(30 * 3))
  const trailIndex = useRef(0)

  useFrame((state) => {
    if (particleRef.current) {
      const time = state.clock.getElapsedTime() - delay
      const t = (time * speed) % 1
      
      // Move along the connection line
      const x = start[0] + (end[0] - start[0]) * t
      const y = start[1] + (end[1] - start[1]) * t
      const z = start[2] + (end[2] - start[2]) * t
      
      particleRef.current.position.set(x, y, z)
      
      // Update trail
      const index = trailIndex.current % 30
      trailPositions.current[index * 3] = x
      trailPositions.current[index * 3 + 1] = y
      trailPositions.current[index * 3 + 2] = z
      trailIndex.current++
      
      if (trailRef.current?.geometry) {
        trailRef.current.geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(trailPositions.current, 3)
        )
        trailRef.current.geometry.attributes.position.needsUpdate = true
      }
      
      // Fade in/out at connection ends
      const fadeDistance = 0.25
      let opacity = 1
      if (t < fadeDistance) {
        opacity = t / fadeDistance
      } else if (t > 1 - fadeDistance) {
        opacity = (1 - t) / fadeDistance
      }
      
      if (particleRef.current.material) {
        (particleRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.9
      }
    }
  })

  const particleColor = new THREE.Color(color)

  return (
    <group>
      {/* Trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={trailPositions.current}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={particleColor}
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Main particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  )
}

// Enhanced AI Neural Network Star Field
function NeuralStarNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  const { nodes, nodeTypes, connections, dataFlows } = useMemo(() => {
    const nodeCount = 100 // Optimized node count for better performance
    const nodePositions: Array<[number, number, number]> = []
    const nodeTypes: Array<'normal' | 'bright' | 'pulsar'> = []
    
    // Create nodes (stars) only on left and right sides
    for (let i = 0; i < nodeCount; i++) {
      // Place stars only on the sides (left: x < -10, right: x > 10)
      const side = Math.random() > 0.5 ? 1 : -1 // Randomly choose left or right
      const xPosition = side * (10 + Math.random() * 15) // X between -25 to -10 or 10 to 25
      
      nodePositions.push([
        xPosition, // Only on sides
        (Math.random() - 0.5) * 40, // Full Y distribution
        (Math.random() - 0.5) * 30, // Full Z distribution
      ])
      
      // Assign types: 10% bright, 5% pulsar, 85% normal
      const rand = Math.random()
      if (rand > 0.95) {
        nodeTypes.push('pulsar')
      } else if (rand > 0.85) {
        nodeTypes.push('bright')
      } else {
        nodeTypes.push('normal')
      }
    }

    // Create connections between nearby nodes with intelligent linking
    const conns: Array<{ 
      start: [number, number, number]
      end: [number, number, number]
      distance: number
      intensity: number
    }> = []
    
    nodePositions.forEach((node, i) => {
      // Connect to nearest neighbors (more intelligent connection pattern)
      const distances = nodePositions.map((otherNode, j) => ({
        index: j,
        distance: Math.sqrt(
          Math.pow(node[0] - otherNode[0], 2) +
          Math.pow(node[1] - otherNode[1], 2) +
          Math.pow(node[2] - otherNode[2], 2)
        )
      }))
      
      // Sort by distance and connect to more neighbors for denser network
      distances.sort((a, b) => a.distance - b.distance)
      const connectionsToMake = Math.min(5, distances.length - 1) // More connections per node
      
      for (let j = 1; j <= connectionsToMake; j++) {
        const target = distances[j]
        if (target.distance < 12) { // Increased connection distance to connect across space
          const intensity = 1 - (target.distance / 12) // Closer = stronger
          conns.push({ 
            start: node, 
            end: nodePositions[target.index],
            distance: target.distance,
            intensity
          })
        }
      }
    })

    // Create data flow particles on more connections for more activity
    const flows = conns
      .filter((_, i) => i % 3 !== 0) // More connections get data flow (2/3 of connections)
      .map((conn, i) => {
        const colorChoice = Math.random()
        let color = '#a855f7'
        if (colorChoice > 0.66) {
          color = '#6366f1'
        } else if (colorChoice > 0.33) {
          color = '#c084fc'
        }
        
        return {
          start: conn.start,
          end: conn.end,
          speed: 0.3 + Math.random() * 0.4,
          delay: Math.random() * 3,
          color
        }
      })

    return { nodes: nodePositions, nodeTypes, connections: conns, dataFlows: flows }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Slow rotation of entire neural network with slight variation
      groupRef.current.rotation.y += 0.0003
      groupRef.current.rotation.x += 0.0002
      groupRef.current.rotation.z += 0.0001
    }
  })

  return (
    <group ref={groupRef}>
      {/* Star nodes only */}
      {nodes.map((position, i) => {
        const colorChoice = Math.random()
        let color = '#ffffff'
        if (colorChoice > 0.75) {
          color = '#a855f7' // Purple
        } else if (colorChoice > 0.5) {
          color = '#6366f1' // Blue
        } else if (colorChoice > 0.25) {
          color = '#c084fc' // Lavender
        } else {
          color = '#ffffff' // White
        }
        
        return (
          <StarNode
            key={`node-${i}`}
            position={position}
            color={color}
            size={Math.random() * 0.25 + 0.15}
            speed={Math.random() * 1.5 + 0.8}
            type={nodeTypes[i]}
          />
        )
      })}
    </group>
  )
}

// Enhanced particles background with depth layers
function StarParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const pointsRef2 = useRef<THREE.Points>(null)

  const { positions, colors, positions2, colors2 } = useMemo(() => {
    const count = 800 // Optimized particle count for better performance
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const positions2 = new Float32Array(count * 3)
    const colors2 = new Float32Array(count * 3)

    const color1 = new THREE.Color(0xffffff)
    const color2 = new THREE.Color(0xa855f7)
    const color3 = new THREE.Color(0x6366f1)
    const color4 = new THREE.Color(0xc084fc)

    // First layer (closer) - wider distribution
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const colorChoice = Math.random()
      let color: THREE.Color
      if (colorChoice < 0.6) {
        color = color1
      } else if (colorChoice < 0.8) {
        color = color2
      } else if (colorChoice < 0.9) {
        color = color3
      } else {
        color = color4
      }

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    // Second layer (farther) - wider distribution
    for (let i = 0; i < count; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 100
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 60 - 30

      const colorChoice = Math.random()
      let color: THREE.Color
      if (colorChoice < 0.7) {
        color = color1
      } else if (colorChoice < 0.85) {
        color = color2
      } else {
        color = color3
      }

      colors2[i * 3] = color.r * 0.7
      colors2[i * 3 + 1] = color.g * 0.7
      colors2[i * 3 + 2] = color.b * 0.7
    }

    return { positions, colors, positions2, colors2 }
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002
    }
    if (pointsRef2.current) {
      pointsRef2.current.rotation.y -= 0.00015
    }
  })

  return (
    <>
      {/* Closer layer */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Farther layer */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions2.length / 3}
            array={positions2}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors2.length / 3}
            array={colors2}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}

export default function Stars3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 90 }}
        gl={{ 
          alpha: true, 
          antialias: false, // Disable for better performance
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Reduced pixel ratio for better performance
        performance={{ min: 0.5 }} // Lower performance threshold
      >
        {/* Enhanced lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#6366f1" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#c084fc" />
        
        {/* Background particles (depth layers) */}
        <StarParticles />
        
        {/* AI Neural Network Star Field */}
        <NeuralStarNetwork />
      </Canvas>
    </div>
  )
}
