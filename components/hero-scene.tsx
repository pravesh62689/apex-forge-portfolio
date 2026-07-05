'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Stars, RoundedBox } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import type { Group, Points } from 'three'

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

/** Sleek floating website screen + phone with rounded, polished geometry. */
function Devices() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = Math.sin(t * 0.3) * 0.2 + state.pointer.x * 0.18
    group.current.rotation.x = -0.08 + state.pointer.y * -0.08
  })
  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={group} position={[0, 0, 0]} scale={1.1}>
        {/* Main website screen — rounded, glassy monitor */}
        <group position={[-0.15, 0.1, 0]} rotation={[0, 0.12, 0]}>
          {/* Bezel */}
          <RoundedBox args={[2.2, 1.42, 0.1]} radius={0.07} smoothness={4} position={[0, 0, -0.04]}>
            <meshStandardMaterial color="#151a22" metalness={0.85} roughness={0.28} />
          </RoundedBox>
          {/* Screen glow */}
          <RoundedBox args={[2.02, 1.24, 0.02]} radius={0.04} smoothness={4} position={[0, 0, 0.03]}>
            <meshStandardMaterial color="#0b3a44" emissive="#06b6d4" emissiveIntensity={0.5} metalness={0.2} roughness={0.5} />
          </RoundedBox>
          {/* Top browser bar */}
          <mesh position={[0, 0.5, 0.045]}>
            <planeGeometry args={[2.02, 0.2]} />
            <meshBasicMaterial color="#0e7490" />
          </mesh>
          {[[-0.86, 0.5], [-0.79, 0.5], [-0.72, 0.5]].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.05]}>
              <circleGeometry args={[0.02, 16]} />
              <meshBasicMaterial color="#e0f2fe" />
            </mesh>
          ))}
          {/* Content lines */}
          {[0.18, -0.02, -0.22].map((y, i) => (
            <mesh key={i} position={[-0.5 - i * 0.08, y, 0.05]}>
              <planeGeometry args={[0.95 - i * 0.22, 0.08]} />
              <meshBasicMaterial color="#e0f2fe" transparent opacity={0.9} />
            </mesh>
          ))}
          {/* CTA pill */}
          <mesh position={[-0.62, -0.45, 0.05]}>
            <planeGeometry args={[0.5, 0.14]} />
            <meshBasicMaterial color="#34d399" />
          </mesh>
        </group>

        {/* Floating phone */}
        <Float speed={1.8} floatIntensity={0.7}>
          <group position={[1.45, -0.12, 0.55]} rotation={[0, -0.45, 0.1]}>
            <RoundedBox args={[0.66, 1.3, 0.08]} radius={0.09} smoothness={4}>
              <meshStandardMaterial color="#151a22" metalness={0.85} roughness={0.28} />
            </RoundedBox>
            <RoundedBox args={[0.56, 1.16, 0.02]} radius={0.06} smoothness={4} position={[0, 0, 0.045]}>
              <meshStandardMaterial color="#0b3a2f" emissive="#34d399" emissiveIntensity={0.45} metalness={0.2} roughness={0.5} />
            </RoundedBox>
          </group>
        </Float>
      </group>
    </Float>
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
          <Devices />
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
