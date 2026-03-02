'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.offsetWidth || window.innerWidth;
    const h = mount.offsetHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 65;

    // ── Main scene — neural particles + lines ─────────────────────────────
    const scene = new THREE.Scene();
    const COUNT = 140;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const velocities = [];
    const palette = [
      new THREE.Color('#ff6b9d'), new THREE.Color('#ffd166'),
      new THREE.Color('#ff4757'), new THREE.Color('#ff9ff3'),
    ];
    for (let i = 0; i < COUNT; i++) {
      positions[i*3]   = (Math.random()-0.5)*130;
      positions[i*3+1] = (Math.random()-0.5)*90;
      positions[i*3+2] = (Math.random()-0.5)*60;
      velocities.push({ x:(Math.random()-0.5)*0.045, y:(Math.random()-0.5)*0.045, z:(Math.random()-0.5)*0.02 });
      const c = palette[Math.floor(Math.random()*palette.length)];
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    ptGeo.setAttribute('color', new THREE.BufferAttribute(colors,3));
    const ptMat = new THREE.PointsMaterial({ size:1.3, vertexColors:true, transparent:true, opacity:0.85, sizeAttenuation:true });
    scene.add(new THREE.Points(ptGeo, ptMat));

    const MAX_LINES = 650;
    const lPos = new Float32Array(MAX_LINES*6), lCol = new Float32Array(MAX_LINES*6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos,3));
    lGeo.setAttribute('color', new THREE.BufferAttribute(lCol,3));
    const lMat = new THREE.LineBasicMaterial({ vertexColors:true, transparent:true, opacity:0.25 });
    scene.add(new THREE.LineSegments(lGeo, lMat));
    const DIST = 22;

    // ── Overlay scene — colorful circular ripple bursts ────────────────────
    const overlayScene = new THREE.Scene();

    // Soft circular glow sprite via Canvas
    const sc = document.createElement('canvas');
    sc.width = sc.height = 64;
    const sx = sc.getContext('2d');
    const sg = sx.createRadialGradient(32,32,0,32,32,32);
    sg.addColorStop(0,   'rgba(255,255,255,1)');
    sg.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    sg.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    sg.addColorStop(1,   'rgba(255,255,255,0)');
    sx.fillStyle = sg;
    sx.fillRect(0,0,64,64);
    const glowTex = new THREE.CanvasTexture(sc);

    // Ripple particle pool
    const MAX_RIPPLE = 800;
    const rPos = new Float32Array(MAX_RIPPLE * 3).fill(9999);
    const rCol = new Float32Array(MAX_RIPPLE * 3).fill(0);
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
    rGeo.setAttribute('color', new THREE.BufferAttribute(rCol, 3));

    const rMat = new THREE.PointsMaterial({
      size: 3.5,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    overlayScene.add(new THREE.Points(rGeo, rMat));

    // Per-particle state
    const ripples = [];
    for (let i = 0; i < MAX_RIPPLE; i++) {
      ripples.push({ vx:0, vy:0, life:0, maxLife:0, active:false, baseR:0, baseG:0, baseB:0 });
    }
    let nextRipple = 0;

    // Rainbow burst palette
    const burstColors = [
      new THREE.Color('#ff6b9d'),
      new THREE.Color('#ff4757'),
      new THREE.Color('#ffd166'),
      new THREE.Color('#ffaa33'),
      new THREE.Color('#ff9ff3'),
      new THREE.Color('#ff6348'),
      new THREE.Color('#ffb8d0'),
      new THREE.Color('#ffe066'),
      new THREE.Color('#ff8a80'),
    ];

    const PARTICLES_PER_BURST = 24;
    function spawnBurst(wx, wy) {
      for (let k = 0; k < PARTICLES_PER_BURST; k++) {
        const idx = nextRipple % MAX_RIPPLE;
        nextRipple++;
        const angle = (Math.PI * 2 * k) / PARTICLES_PER_BURST + (Math.random()-0.5)*0.3;
        const speed = 0.25 + Math.random() * 0.35;
        const life = 50 + Math.random() * 40;
        const c = burstColors[Math.floor(Math.random() * burstColors.length)];

        rPos[idx*3] = wx; rPos[idx*3+1] = wy; rPos[idx*3+2] = 5;
        rCol[idx*3] = c.r; rCol[idx*3+1] = c.g; rCol[idx*3+2] = c.b;

        const r = ripples[idx];
        r.vx = Math.cos(angle) * speed;
        r.vy = Math.sin(angle) * speed;
        r.life = life;
        r.maxLife = life;
        r.active = true;
        r.baseR = c.r; r.baseG = c.g; r.baseB = c.b;
      }
    }

    function ndcToWorld(ndcX, ndcY) {
      const halfH = Math.tan((60*Math.PI/180)/2) * camera.position.z;
      const halfW = halfH * (mount.offsetWidth / (mount.offsetHeight||1));
      return { x: camera.position.x + ndcX*halfW, y: camera.position.y + ndcY*halfH };
    }

    // ── Mouse ──────────────────────────────────────────────────────────────
    let mx = 0, my = 0;
    let lastBurstX = 9999, lastBurstY = 9999;
    const BURST_DIST = 0.06;

    const onMouse = (e) => {
      mx = (e.clientX/window.innerWidth  - 0.5)*2;
      my = (e.clientY/window.innerHeight - 0.5)*2;
      const dx = mx - lastBurstX, dy = my - lastBurstY;
      if (dx*dx + dy*dy > BURST_DIST*BURST_DIST) {
        const wp = ndcToWorld(mx, -my);
        spawnBurst(wp.x, wp.y);
        lastBurstX = mx; lastBurstY = my;
      }
    };
    window.addEventListener('mousemove', onMouse);

    // ── Animation loop ─────────────────────────────────────────────────────
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      for (let i = 0; i < COUNT; i++) {
        positions[i*3]+=velocities[i].x; positions[i*3+1]+=velocities[i].y; positions[i*3+2]+=velocities[i].z;
        if(Math.abs(positions[i*3])>65)   velocities[i].x*=-1;
        if(Math.abs(positions[i*3+1])>45) velocities[i].y*=-1;
        if(Math.abs(positions[i*3+2])>30) velocities[i].z*=-1;
      }
      ptGeo.attributes.position.needsUpdate = true;

      let li = 0;
      for (let i = 0; i < COUNT && li < MAX_LINES; i++) {
        for (let j = i+1; j < COUNT && li < MAX_LINES; j++) {
          const dx=positions[i*3]-positions[j*3], dy=positions[i*3+1]-positions[j*3+1], dz=positions[i*3+2]-positions[j*3+2];
          const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
          if (d < DIST) {
            const a=(1-d/DIST)*0.55;
            lPos[li*6]=positions[i*3]; lPos[li*6+1]=positions[i*3+1]; lPos[li*6+2]=positions[i*3+2];
            lPos[li*6+3]=positions[j*3]; lPos[li*6+4]=positions[j*3+1]; lPos[li*6+5]=positions[j*3+2];
            lCol[li*6]=colors[i*3]*a; lCol[li*6+1]=colors[i*3+1]*a; lCol[li*6+2]=colors[i*3+2]*a;
            lCol[li*6+3]=colors[j*3]*a; lCol[li*6+4]=colors[j*3+1]*a; lCol[li*6+5]=colors[j*3+2]*a;
            li++;
          }
        }
      }
      lGeo.setDrawRange(0, li*2);
      lGeo.attributes.position.needsUpdate = true;
      lGeo.attributes.color.needsUpdate = true;

      camera.position.x += (mx*9 - camera.position.x)*0.025;
      camera.position.y += (-my*6 - camera.position.y)*0.025;
      camera.lookAt(scene.position);
      scene.rotation.y += 0.0007;

      // Update ripple particles
      for (let i = 0; i < MAX_RIPPLE; i++) {
        const r = ripples[i];
        if (!r.active) continue;
        r.life -= 1;
        if (r.life <= 0) {
          r.active = false;
          rPos[i*3] = rPos[i*3+1] = rPos[i*3+2] = 9999;
          continue;
        }
        rPos[i*3] += r.vx;
        rPos[i*3+1] += r.vy;
        const t = r.life / r.maxLife;
        rCol[i*3]   = r.baseR * t;
        rCol[i*3+1] = r.baseG * t;
        rCol[i*3+2] = r.baseB * t;
      }
      rGeo.attributes.position.needsUpdate = true;
      rGeo.attributes.color.needsUpdate = true;

      renderer.clear();
      renderer.render(scene, camera);
      renderer.clearDepth();
      renderer.render(overlayScene, camera);
    };
    animate();

    const onResize = () => {
      const rw=mount.offsetWidth, rh=mount.offsetHeight;
      camera.aspect=rw/rh; camera.updateProjectionMatrix(); renderer.setSize(rw,rh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      ptGeo.dispose(); lGeo.dispose(); rGeo.dispose();
      ptMat.dispose(); lMat.dispose(); rMat.dispose();
      glowTex.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 -z-10" style={{ width:'100%', height:'100%' }} />
  );
}
