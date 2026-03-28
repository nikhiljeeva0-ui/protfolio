"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture, Float, Environment } from "@react-three/drei";

const HologramParticles = ({ count = 20 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 5;
        p[i * 3 + 1] = (Math.random() - 0.5) * 6;
        p[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.0002;
        pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.008} color="#00d4ff" transparent opacity={0.12} sizeAttenuation />
    </points>
  );
};

const Hologram = () => {
    const texture = useTexture("/profile.jpg");
    const meshRef = useRef<THREE.Mesh>(null);

    // Advanced Cinematic Shader — dark gradient BG removal + rim light + radial glow
    const hologramShader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uTexture: { value: texture },
            uGlowColor: { value: new THREE.Color("#00d4ff") },
            uContrast: { value: 1.2 },
            uBrightness: { value: 0.92 },
            uBgColorTop: { value: new THREE.Color("#000510") },
            uBgColorBottom: { value: new THREE.Color("#001030") },
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform sampler2D uTexture;
            uniform vec3 uGlowColor;
            uniform float uContrast;
            uniform float uBrightness;
            uniform vec3 uBgColorTop;
            uniform vec3 uBgColorBottom;
            varying vec2 vUv;
            varying vec3 vNormal;

            vec3 adjustContrast(vec3 color, float value) {
                return (color - 0.5) * value + 0.5;
            }

            void main() {
                // Tight radial mask — clean hard edges, minimal feathering
                float dist = distance(vUv, vec2(0.5));
                float mask = 1.0 - smoothstep(0.44, 0.47, dist);

                vec4 texColor = texture2D(uTexture, vUv);

                // --- Background removal via luminance ---
                // Pixels close to white/bright BG get masked out
                float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
                float bgMask = smoothstep(0.82, 0.96, lum);  // fade out bright background
                float alphaMask = mask * (1.0 - bgMask * 0.85);

                // --- Color Processing ---
                vec3 color = texColor.rgb;
                color = adjustContrast(color, uContrast);
                color *= uBrightness;

                // Cool-tone shift: desaturate red slightly, boost blue channel
                color.r *= 0.93;
                color.g *= 0.97;
                color.b = min(color.b * 1.08, 1.0);

                // Subtle warm-skin preservation: protect mid-tone skin from over-cooling
                float skinMask = smoothstep(0.3, 0.7, texColor.r - texColor.b);
                color = mix(color, color + vec3(0.02, 0.01, -0.02), skinMask * 0.3);

                // --- Rim Light (Blue/Cyan edges) ---
                float rimDot = max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
                float rim = pow(1.0 - rimDot, 4.0);

                // Bidirectional rim — left side cyan, right side softer blue
                float rimLeft = pow(clamp(-(vNormal.x) * 1.5, 0.0, 1.0), 2.5);
                float rimRight = pow(clamp((vNormal.x) * 1.5, 0.0, 1.0), 2.5);
                vec3 rimColor = uGlowColor * (rimLeft * 0.18 + rimRight * 0.1);

                // --- Tight Radial Glow behind head (not a large blur) ---
                float centerDist = distance(vUv, vec2(0.5, 0.48));
                float headGlow = (1.0 - smoothstep(0.0, 0.35, centerDist)) * 0.08;
                vec3 glowContrib = uGlowColor * headGlow;

                // --- Dark gradient background (replaces removed BG) ---
                vec3 bgColor = mix(uBgColorBottom, uBgColorTop, vUv.y);
                // Blend between dark bg and processed photo based on alpha mask
                vec3 finalRGB = mix(bgColor, color + rimColor + glowContrib, alphaMask);

                gl_FragColor = vec4(finalRGB, 1.0);
            }
        `,
        transparent: false,
    }), [texture]);

    useFrame((state) => {
        const { clock, mouse } = state;
        const time = clock.getElapsedTime();
        const targetX = mouse.x * 0.15;
        const targetY = mouse.y * 0.08;

        if (meshRef.current) {
            // Update time uniform
            // @ts-ignore
            meshRef.current.material.uniforms.uTime.value = time;

            // Subtle Breathe & Floating
            const breatheZ = Math.sin(time * 0.45) * 0.06;
            meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, breatheZ, 0.04);

            const floatY = Math.sin(time * 0.4) * 0.025;
            meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, floatY, 0.04);
            meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX * 0.15, 0.04);

            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX * 0.08, 0.04);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY * 0.08, 0.04);
        }
    });

    return (
        <group>
            <HologramParticles count={20} />

            <Float speed={0.35} rotationIntensity={0.008} floatIntensity={0.015}>
                <mesh ref={meshRef}>
                    <planeGeometry args={[3.4, 4.2]} />
                    <shaderMaterial attach="material" {...hologramShader} />
                </mesh>
            </Float>

            <Environment preset="city" />
        </group>
    );
};

export default Hologram;
