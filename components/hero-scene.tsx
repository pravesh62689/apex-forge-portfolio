'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { Mesh, Group, Points } from 'three'
import * as THREE from 'three'

/** Core morphing icosahedron that follows the pointer subtly. */
function ForgeCore() {
  const mesh = useRef<Mesh>(null)
  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    mesh.current.rotation.y = t * 0.15
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.15
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, state.pointer.x * 0.3, 0.04)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, state.pointer.y * 0.22, 0.04)
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        {/* detail 3 (down from 4) — smoother distortion at a fraction of the vertex cost */}
        <icosahedronGeometry args={[1.35, 3]} />
        <MeshDistortMaterial
          color="#0e7490"
          emissive="#06b6d4"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
          distort={0.34}
          speed={1.6}
        />
      </mesh>
    </Float>
  )
}

/** Rotating wireframe shell + orbital rings, tilts with the pointer. */
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
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[1.2, 0.6, 0.3]}>
        <torusGeometry args={[2.7, 0.006, 8, 80]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

/** Glowing orbiting satellites. */
function Satellites() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.25
  })
  const positions: [number, number, number][] = [
    [2.2, 0.4, 0],
    [-2.1, -0.5, 0.7],
    [0.5, 1.7, -1.4],
    [-1.1, -1.6, -1.0],
    [1.6, -1.1, 1.2],
  ]
  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <Float key={i} speed={2 + i * 0.4} floatIntensity={0.6}>
          <mesh position={p}>
            <sphereGeometry args={[0.06 + (i % 3) * 0.015, 12, 12]} />
            <meshStandardMaterial color="#67e8f9" emissive="#06b6d4" emissiveIntensity={1.6} />
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
    const count = 140 // down from 320
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.6 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) - 2
    }
    return arr
  }, [])
  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.015
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#67e8f9" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null)
  // Only run the render loop while the canvas is actually on screen.
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="hero-media" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        // Camera pulled back + scaled group keeps the whole composition inside
        // the frame at any aspect ratio, so it never clips on small screens.
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 4, 6]} intensity={1.3} color="#e0f2fe" />
          <pointLight position={[-4, -2, -4]} intensity={0.7} color="#06b6d4" />
          <group scale={0.8}>
            <ForgeCore />
            <WireShell />
            <Satellites />
            <ParticleField />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
