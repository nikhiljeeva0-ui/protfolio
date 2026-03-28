"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarLayer({ count, size, speed, color, opacity }: { count: number, size: number, speed: number, color: string, opacity: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const radius = Math.random() * 40 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02 * speed;
    ref.current.rotation.x += delta * 0.01 * speed;
    
    // Parallax
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.mouse.x * 2 * speed, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.mouse.y * 2 * speed, 0.05);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={opacity}
      />
    </Points>
  );
}

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#020617] to-black">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <fog attach="fog" args={["#000000", 10, 60]} />
        <StarLayer count={800} size={0.01} speed={0.1} color="#ffffff" opacity={0.15} />
        <StarLayer count={400} size={0.015} speed={0.2} color="#4A6CF7" opacity={0.25} />
        <StarLayer count={200} size={0.02} speed={0.4} color="#9D4EDD" opacity={0.35} />
      </Canvas>
    </div>
  );
};

export default Background3D;
