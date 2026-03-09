"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ──────────────────────────────────────────────────────────────────────
   Cute rounded robot — dome head, capsule body, stubby arms
   Matches the soft 3D assistant-bot aesthetic
   ────────────────────────────────────────────────────────────────────── */

const ROBOT_COUNT = 6;

const ACCENTS = [
  { eye: "#38d9a9", eyeGlow: "#20c997" },
  { eye: "#74c0fc", eyeGlow: "#4dabf7" },
  { eye: "#ff6b9d", eyeGlow: "#ff4778" },
  { eye: "#b197fc", eyeGlow: "#9775fa" },
  { eye: "#ffd43b", eyeGlow: "#fab005" },
  { eye: "#63e6be", eyeGlow: "#38d9a9" },
];

function createRobot(accent) {
  const group = new THREE.Group();

  // Shared materials
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xe8ecf2,
    metalness: 0.15,
    roughness: 0.35,
  });

  const lightGrayMat = new THREE.MeshStandardMaterial({
    color: 0xc8cdd6,
    metalness: 0.2,
    roughness: 0.3,
  });

  const darkVisorMat = new THREE.MeshStandardMaterial({
    color: 0x1a1f2e,
    metalness: 0.6,
    roughness: 0.15,
  });

  const eyeGlowMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accent.eye),
    emissive: new THREE.Color(accent.eyeGlow),
    emissiveIntensity: 2.5,
    metalness: 0.0,
    roughness: 0.1,
  });

  // ── Head: dome (top half of sphere) ──────────────────────────────
  const headGroup = new THREE.Group();

  // Full dome
  const domeGeo = new THREE.SphereGeometry(0.55, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
  const dome = new THREE.Mesh(domeGeo, whiteMat);
  dome.position.y = 0.0;
  headGroup.add(dome);

  // Face plate (front curved section, darker)
  const faceGeo = new THREE.SphereGeometry(0.53, 32, 24, -Math.PI * 0.35, Math.PI * 0.7, Math.PI * 0.2, Math.PI * 0.35);
  const face = new THREE.Mesh(faceGeo, darkVisorMat);
  face.position.y = 0.0;
  headGroup.add(face);

  // Left eye
  const eyeGeo = new THREE.SphereGeometry(0.07, 16, 12);
  const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
  leftEye.position.set(-0.16, 0.05, 0.44);
  headGroup.add(leftEye);

  // Right eye
  const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
  rightEye.position.set(0.16, 0.05, 0.44);
  headGroup.add(rightEye);

  // Smile — small curved line using a torus arc
  const smileGeo = new THREE.TorusGeometry(0.1, 0.015, 8, 16, Math.PI * 0.6);
  const smile = new THREE.Mesh(smileGeo, eyeGlowMat);
  smile.position.set(0, -0.1, 0.46);
  smile.rotation.x = Math.PI * 0.05;
  smile.rotation.z = Math.PI;
  headGroup.add(smile);

  headGroup.position.y = 0.7;
  group.add(headGroup);

  // ── Neck ring ────────────────────────────────────────────────────
  const neckGeo = new THREE.CylinderGeometry(0.22, 0.25, 0.08, 24);
  const neck = new THREE.Mesh(neckGeo, lightGrayMat);
  neck.position.y = 0.35;
  group.add(neck);

  // ── Body: capsule / egg shape ────────────────────────────────────
  // Use a sphere stretched vertically
  const bodyGeo = new THREE.SphereGeometry(0.48, 32, 24);
  const body = new THREE.Mesh(bodyGeo, whiteMat);
  body.scale.set(1, 1.25, 0.9);
  body.position.y = -0.1;
  group.add(body);

  // Belly accent — subtle ring
  const bellyGeo = new THREE.TorusGeometry(0.42, 0.02, 8, 32);
  const belly = new THREE.Mesh(bellyGeo, lightGrayMat);
  belly.position.y = -0.05;
  belly.rotation.x = Math.PI / 2;
  group.add(belly);

  // Chest light — small glowing circle
  const chestGeo = new THREE.CircleGeometry(0.06, 16);
  const chestLight = new THREE.Mesh(chestGeo, eyeGlowMat);
  chestLight.position.set(0, 0.08, 0.44);
  group.add(chestLight);

  // ── Arms: stubby capsule-like ────────────────────────────────────
  const armGeo = new THREE.CapsuleGeometry(0.08, 0.28, 8, 12);

  const leftArmGroup = new THREE.Group();
  const leftArm = new THREE.Mesh(armGeo, whiteMat);
  leftArm.position.y = -0.14;
  leftArmGroup.add(leftArm);
  // Shoulder joint
  const shoulderGeo = new THREE.SphereGeometry(0.1, 12, 12);
  const leftShoulder = new THREE.Mesh(shoulderGeo, lightGrayMat);
  leftArmGroup.add(leftShoulder);
  leftArmGroup.position.set(-0.55, 0.1, 0);
  group.add(leftArmGroup);

  const rightArmGroup = new THREE.Group();
  const rightArm = new THREE.Mesh(armGeo, whiteMat);
  rightArm.position.y = -0.14;
  rightArmGroup.add(rightArm);
  const rightShoulder = new THREE.Mesh(shoulderGeo, lightGrayMat);
  rightArmGroup.add(rightShoulder);
  rightArmGroup.position.set(0.55, 0.1, 0);
  group.add(rightArmGroup);

  // ── Bottom: rounded base (no legs, floats) ──────────────────────
  const baseGeo = new THREE.SphereGeometry(0.3, 24, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5);
  const base = new THREE.Mesh(baseGeo, lightGrayMat);
  base.position.y = -0.65;
  group.add(base);

  // Hover glow disc under the robot
  const glowDiscGeo = new THREE.CircleGeometry(0.35, 32);
  const glowDiscMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(accent.eye),
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const glowDisc = new THREE.Mesh(glowDiscGeo, glowDiscMat);
  glowDisc.rotation.x = -Math.PI / 2;
  glowDisc.position.y = -0.8;
  group.add(glowDisc);

  // Scale up for visibility
  group.scale.setScalar(1.0);

  return {
    group,
    headGroup,
    leftArmGroup,
    rightArmGroup,
    leftEye,
    rightEye,
    chestLight,
    glowDisc,
    glowDiscMat,
  };
}

/* ──────────────────────────────────────────────────────────────────────
   Background elements: grid floor, nebula particles, holo-rings
   ────────────────────────────────────────────────────────────────────── */

function createBackground(scene) {
  const disposables = [];

  // ── Grid floor ──────────────────────────────────────────────────
  const gridGeo = new THREE.PlaneGeometry(40, 40, 40, 40);
  const gridMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vDist;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vDist = length(wp.xz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vDist;
      uniform float uTime;
      void main() {
        vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5);
        float line = min(grid.x, grid.y);
        float g = 1.0 - smoothstep(0.0, 0.04, line);
        float fade = 1.0 - smoothstep(2.0, 18.0, vDist);
        float pulse = 0.5 + 0.5 * sin(uTime * 0.5 - vDist * 0.3);
        gl_FragColor = vec4(vec3(0.2, 0.35, 0.7), g * fade * 0.12 * pulse);
      }
    `,
  });
  const grid = new THREE.Mesh(gridGeo, gridMat);
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -4;
  scene.add(grid);
  disposables.push(gridGeo, gridMat);

  // ── Nebula particles ────────────────────────────────────────────
  const nebulaCount = 500;
  const nPos = new Float32Array(nebulaCount * 3);
  const nColors = new Float32Array(nebulaCount * 3);
  const palette = [
    new THREE.Color("#4a6cf7"),
    new THREE.Color("#a855f7"),
    new THREE.Color("#38d9a9"),
    new THREE.Color("#ff6b9d"),
  ];
  for (let i = 0; i < nebulaCount; i++) {
    nPos[i * 3] = (Math.random() - 0.5) * 30;
    nPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    nPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    const c = palette[Math.floor(Math.random() * palette.length)];
    nColors[i * 3] = c.r;
    nColors[i * 3 + 1] = c.g;
    nColors[i * 3 + 2] = c.b;
  }
  const nGeo = new THREE.BufferGeometry();
  nGeo.setAttribute("position", new THREE.BufferAttribute(nPos, 3));
  nGeo.setAttribute("color", new THREE.BufferAttribute(nColors, 3));
  const nMat = new THREE.PointsMaterial({
    size: 0.06,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    sizeAttenuation: true,
  });
  const nebula = new THREE.Points(nGeo, nMat);
  scene.add(nebula);
  disposables.push(nGeo, nMat);

  // ── Holographic rings ───────────────────────────────────────────
  const rings = [];
  const ringColors = [0x4a6cf7, 0xa855f7, 0x38d9a9];
  for (let i = 0; i < 3; i++) {
    const rGeo = new THREE.TorusGeometry(6 + i * 3, 0.015, 8, 128);
    const rMat = new THREE.MeshBasicMaterial({
      color: ringColors[i],
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(rGeo, rMat);
    ring.rotation.x = Math.PI * 0.4 + i * 0.2;
    ring.rotation.z = i * 0.3;
    ring.position.set(0, -1, -5);
    scene.add(ring);
    rings.push(ring);
    disposables.push(rGeo, rMat);
  }

  return { gridMat, nebula, nGeo, rings, disposables };
}

/* ──────────────────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────────────────── */

export default function RobotSwarm() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // Subtle dark fog for depth
    scene.fog = new THREE.FogExp2(0x060610, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1, 12);

    // ── Lighting ──────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x8090c0, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x6b8cff, 0.4);
    fillLight.position.set(-5, 3, 4);
    scene.add(fillLight);

    const pointLight1 = new THREE.PointLight(0xff6b9d, 0.8, 25);
    pointLight1.position.set(-6, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4a6cf7, 0.8, 25);
    pointLight2.position.set(6, -2, 4);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x38d9a9, 0.5, 20);
    pointLight3.position.set(0, 5, -3);
    scene.add(pointLight3);

    // ── Background ────────────────────────────────────────────────────
    const bg = createBackground(scene);

    // ── Create robots ─────────────────────────────────────────────────
    const SPREAD_X = 14;
    const SPREAD_Y = 8;
    const SPREAD_Z = 10;

    const robots = [];
    for (let i = 0; i < ROBOT_COUNT; i++) {
      const accent = ACCENTS[i % ACCENTS.length];
      const robot = createRobot(accent);
      scene.add(robot.group);

      robot.group.position.set(
        (Math.random() - 0.5) * SPREAD_X,
        (Math.random() - 0.5) * SPREAD_Y,
        (Math.random() - 0.5) * SPREAD_Z - 2
      );
      robot.group.rotation.y = Math.random() * Math.PI * 2;

      robot.userData = {
        targetX: (Math.random() - 0.5) * SPREAD_X,
        targetY: (Math.random() - 0.5) * SPREAD_Y,
        targetZ: (Math.random() - 0.5) * SPREAD_Z - 2,
        speed: 0.006 + Math.random() * 0.008,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 1.0 + Math.random() * 0.6,
        bobAmp: 0.15 + Math.random() * 0.1,
        armPhase: Math.random() * Math.PI * 2,
        headPhase: Math.random() * Math.PI * 2,
        nextTarget: 80 + Math.random() * 120,
        timer: 0,
      };

      robots.push(robot);
    }

    // ── Mouse parallax ────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    container.addEventListener("mousemove", onMouse, { passive: true });

    // ── Animate ───────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Update background
      bg.gridMat.uniforms.uTime.value = t;
      bg.nebula.rotation.y = t * 0.01;
      bg.rings.forEach((ring, i) => {
        ring.rotation.z = i * 0.3 + t * (0.03 + i * 0.01);
      });

      // Update robots
      robots.forEach((robot) => {
        const d = robot.userData;
        d.timer++;

        // Pick new random target
        if (d.timer >= d.nextTarget) {
          d.targetX = (Math.random() - 0.5) * SPREAD_X;
          d.targetY = (Math.random() - 0.5) * SPREAD_Y;
          d.targetZ = (Math.random() - 0.5) * SPREAD_Z - 2;
          d.nextTarget = 80 + Math.random() * 150;
          d.timer = 0;
        }

        // Move toward target
        const pos = robot.group.position;
        pos.x += (d.targetX - pos.x) * d.speed;
        pos.y += (d.targetY - pos.y) * d.speed;
        pos.z += (d.targetZ - pos.z) * d.speed;

        // Bobbing float
        const baseY = pos.y;
        pos.y = baseY + Math.sin(t * d.bobSpeed + d.bobPhase) * d.bobAmp;

        // Tilt body slightly toward movement direction
        const dx = d.targetX - pos.x;
        const dz = d.targetZ - pos.z;
        const targetAngle = Math.atan2(dx, dz);
        let diff = targetAngle - robot.group.rotation.y;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        robot.group.rotation.y += diff * 0.025;

        // Subtle body tilt in movement direction
        robot.group.rotation.z = Math.sin(t * 0.8 + d.bobPhase) * 0.08;
        robot.group.rotation.x = Math.sin(t * 0.6 + d.bobPhase + 1) * 0.05;

        // Head look-around
        robot.headGroup.rotation.y = Math.sin(t * 0.6 + d.headPhase) * 0.5;
        robot.headGroup.rotation.x = Math.sin(t * 0.4 + d.headPhase + 1.5) * 0.2;

        // Arm wave
        robot.leftArmGroup.rotation.x = Math.sin(t * 1.5 + d.armPhase) * 0.6;
        robot.leftArmGroup.rotation.z = 0.15 + Math.sin(t * 0.8 + d.armPhase) * 0.15;
        robot.rightArmGroup.rotation.x = Math.sin(t * 1.5 + d.armPhase + Math.PI) * 0.6;
        robot.rightArmGroup.rotation.z = -0.15 - Math.sin(t * 0.8 + d.armPhase) * 0.15;

        // Eye glow pulse
        const eyePulse = 2.0 + Math.sin(t * 3 + d.headPhase) * 0.8;
        robot.leftEye.material.emissiveIntensity = eyePulse;
        robot.rightEye.material.emissiveIntensity = eyePulse;
        robot.chestLight.material.emissiveIntensity = eyePulse * 0.6;

        // Hover disc pulse
        robot.glowDiscMat.opacity = 0.1 + Math.sin(t * 2 + d.bobPhase) * 0.06;
      });

      // Camera parallax
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.025;
      camera.position.y += (1 - mouse.y * 0.8 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, -2);

      // Lights drift
      pointLight1.position.x = -6 + Math.sin(t * 0.25) * 3;
      pointLight1.position.y = 4 + Math.cos(t * 0.3) * 2;
      pointLight2.position.x = 6 + Math.cos(t * 0.2) * 3;
      pointLight3.position.z = -3 + Math.sin(t * 0.15) * 4;

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      bg.disposables.forEach((d) => d.dispose());
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 rounded-lg overflow-hidden"
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}
