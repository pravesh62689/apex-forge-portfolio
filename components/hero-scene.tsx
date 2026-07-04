'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Stars } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import type { Mesh, Group, Points } from 'three'
import * as THREE from 'three'

/** Core morphing icosahedron that also follows the mouse subtly. */
function ForgeCore() {
  const mesh = useRef<Mesh>(null)
  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.y = t * 0.15
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.15
    // Subtle mouse parallax
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      state.pointer.x * 0.35,
      0.04,
    )
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      state.pointer.y * 0.25,
      0.04,
    )
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.35, 4]} />
        <MeshDistortMaterial
          color="#0e7490"
          emissive="#06b6d4"
          emissiveIntensity={0.25}
          roughness={0.12}
          metalness={0.9}
          distort={0.36}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

/** Rotating wireframe shell + orbital rings, tilts with mouse. */
function WireShell() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = -t * 0.06 + state.pointer.x * 0.15
    group.current.rotation.z = t * 0.03
    group.current.rotation.x = state.pointer.y * -0.12
  })
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[2.6, 0.008, 8, 96]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[1.2, 0.6, 0.3]}>
        <torusGeometry args={[2.9, 0.006, 8, 96]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[-0.8, 1.1, 0.5]}>
        <torusGeometry args={[3.2, 0.005, 8, 96]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

/** Glowing orbiting satellites. */
function Satellites() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.25
  })
  const positions: [number, number, number][] = [
    [2.6, 0.4, 0],
    [-2.4, -0.5, 0.8],
    [0.5, 1.9, -1.6],
    [-1.2, -1.8, -1.2],
    [1.8, -1.2, 1.4],
    [-0.6, 1.4, 1.8],
  ]
  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <Float key={i} speed={2 + i * 0.4} floatIntensity={0.6}>
          <mesh position={p}>
            <sphereGeometry args={[0.06 + (i % 3) * 0.015, 16, 16]} />
            <meshStandardMaterial
              color="#67e8f9"
              emissive="#06b6d4"
              emissiveIntensity={1.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/** Ambient particle field drifting slowly for depth. */
function ParticleField() {
  const points = useRef<Points>(null)
  const positions = useMemo(() => {
    const count = 320
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) - 2
    }
    return arr
  }, [])
  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.015
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#67e8f9"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 4, 6]} intensity={1.2} color="#e0f2fe" />
          <pointLight position={[-4, -2, -4]} intensity={0.6} color="#06b6d4" />
          <ForgeCore />
          <WireShell />
          <Satellites />
          <ParticleField />
          <Stars radius={60} depth={30} count={900} factor={2.4} saturation={0} fade speed={0.6} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
