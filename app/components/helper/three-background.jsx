'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BLOB_COUNT = 6;
const COLORS = ['#ff6b9d', '#845ef7', '#339af0', '#ff4757', '#ffd166', '#a855f7'];

const VERT = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  uniform float uTime;
  uniform float uSeed;

  // simplex-style noise helper
  vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
  vec4 perm(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d*d*(3.0-2.0*d);
    vec4 b = a.xxyy + vec4(0,1,0,1);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c+1.0);
    vec4 o1 = fract(k3*(1.0/41.0));
    vec4 o2 = fract(k4*(1.0/41.0));
    vec4 o3 = o2*d.z + o1*(1.0-d.z);
    vec2 o4 = o3.yw*d.x + o3.xz*(1.0-d.x);
    return o4.y*d.y + o4.x*(1.0-d.y);
  }

  void main(){
    vNormal = normalize(normalMatrix * normal);
    float n = noise(position * 0.8 + uTime * 0.15 + uSeed);
    vec3 newPos = position + normal * n * 0.45;
    vWorldPos = (modelMatrix * vec4(newPos,1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos,1.0);
  }
`;

const FRAG = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main(){
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0))), 2.5);
    float glow = mix(0.35, 1.0, fresnel);
    gl_FragColor = vec4(uColor * glow, uOpacity * (0.6 + fresnel * 0.4));
  }
`;

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    // ── Mouse tracking ────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    // ── Create blobs ──────────────────────────────────────────────────
    const blobs = [];
    for (let i = 0; i < BLOB_COUNT; i++) {
      const geo = new THREE.IcosahedronGeometry(1.2 + Math.random() * 0.8, 4);
      const mat = new THREE.ShaderMaterial({
        vertexShader:   VERT,
        fragmentShader: FRAG,
        uniforms: {
          uColor:   { value: new THREE.Color(COLORS[i % COLORS.length]) },
          uOpacity: { value: 0.22 + Math.random() * 0.12 },
          uTime:    { value: 0 },
          uSeed:    { value: Math.random() * 100 },
        },
        transparent: true,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
        side:        THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / BLOB_COUNT) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * 4 + (Math.random() - 0.5) * 2,
        Math.sin(angle) * 3 + (Math.random() - 0.5) * 2,
        -2 + Math.random() * -3
      );
      mesh.userData = {
        baseX:  mesh.position.x,
        baseY:  mesh.position.y,
        baseZ:  mesh.position.z,
        spdX:   0.08 + Math.random() * 0.12,
        spdY:   0.06 + Math.random() * 0.10,
        spdZ:   0.04 + Math.random() * 0.06,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      blobs.push(mesh);
    }

    // ── Animate ───────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      blobs.forEach((b) => {
        const d = b.userData;
        b.position.x = d.baseX + Math.sin(t * d.spdX + d.phaseX) * 2.5;
        b.position.y = d.baseY + Math.cos(t * d.spdY + d.phaseY) * 2.0;
        b.position.z = d.baseZ + Math.sin(t * d.spdZ + d.phaseZ) * 1.2;
        b.rotation.x += 0.001;
        b.rotation.y += 0.002;
        b.material.uniforms.uTime.value = t;
      });

      // Subtle camera sway following cursor
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, -2);

      renderer.render(scene, camera);
    };
    tick();

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      blobs.forEach((b) => { b.geometry.dispose(); b.material.dispose(); });
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
