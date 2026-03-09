"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BsShieldLockFill, BsTelegram, BsDiscord, BsKeyFill } from "react-icons/bs";

const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD || "188025";
const PIN_LENGTH = 6;

/* ──────────────────────────────────────────────────────────────────────
   Three.js Vault Background
   - Particle vortex with orbital rings and depth-of-field glow
   ────────────────────────────────────────────────────────────────────── */

const PARTICLE_VERT = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3  aColor;
  uniform float uTime;
  uniform float uUnlock;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vColor = aColor;
    vec3 pos = position;

    // Orbital rotation
    float angle = aPhase + uTime * 0.15;
    float r = length(pos.xz);
    pos.x = cos(angle) * r;
    pos.z = sin(angle) * r;
    pos.y += sin(uTime * 0.3 + aPhase * 2.0) * 0.4;

    // Unlock explosion: particles fly outward
    float explode = uUnlock;
    pos *= 1.0 + explode * 4.0;
    pos.y += explode * (sin(aPhase * 10.0) * 3.0);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mvPos.z;
    gl_PointSize = aSize * (180.0 / dist) * (1.0 + explode * 2.0);
    gl_Position = projectionMatrix * mvPos;

    float depthFade = smoothstep(25.0, 5.0, dist);
    vAlpha = depthFade * (0.5 + 0.5 * sin(uTime + aPhase * 6.0)) * (1.0 - explode * 0.5);
  }
`;

const PARTICLE_FRAG = `
  varying float vAlpha;
  varying vec3  vColor;
  uniform float uUnlock;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = exp(-d * 4.0);
    float brightness = 1.0 + uUnlock * 3.0;
    gl_FragColor = vec4(vColor * brightness, vAlpha * glow);
  }
`;

const RING_VERT = `
  uniform float uTime;
  uniform float uUnlock;
  uniform float uIndex;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float angle = uTime * (0.1 + uIndex * 0.05);
    float c = cos(angle), s = sin(angle);

    // Rotate ring
    vec3 rotated = vec3(
      pos.x * c - pos.z * s,
      pos.y,
      pos.x * s + pos.z * c
    );

    // On unlock, rings expand and fade
    rotated *= 1.0 + uUnlock * 5.0;

    vec4 mvPos = modelViewMatrix * vec4(rotated, 1.0);
    gl_Position = projectionMatrix * mvPos;
    vAlpha = (0.15 + 0.1 * sin(uTime * 2.0 + uIndex)) * (1.0 - uUnlock);
  }
`;

const RING_FRAG = `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    gl_FragColor = vec4(uColor, vAlpha);
  }
`;

function VaultThreeBackground({ unlockProgress }) {
  const mountRef = useRef(null);
  const unlockRef = useRef(0);

  useEffect(() => {
    unlockRef.current = unlockProgress;
  }, [unlockProgress]);

  useEffect(() => {
    if (!mountRef.current) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    const mouse = { x: 0, y: 0 };
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Particles ─────────────────────────────────────────────────────
    const PCOUNT = 2000;
    const positions = new Float32Array(PCOUNT * 3);
    const sizes = new Float32Array(PCOUNT);
    const phases = new Float32Array(PCOUNT);
    const colors = new Float32Array(PCOUNT * 3);

    const palette = [
      new THREE.Color("#4a6cf7"),
      new THREE.Color("#6b8cff"),
      new THREE.Color("#3b5bdb"),
      new THREE.Color("#7c8aff"),
      new THREE.Color("#ff6b9d"),
      new THREE.Color("#a855f7"),
    ];

    for (let i = 0; i < PCOUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 10;
      const y = (Math.random() - 0.5) * 8;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      sizes[i] = Math.random() * 3 + 1;
      phases[i] = Math.random() * Math.PI * 2;
      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    particleGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uUnlock: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ── Orbital Rings ─────────────────────────────────────────────────
    const ringColors = ["#4a6cf7", "#6b8cff", "#a855f7"];
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(4 + i * 1.8, 4.05 + i * 1.8, 128);
      const ringMat = new THREE.ShaderMaterial({
        vertexShader: RING_VERT,
        fragmentShader: RING_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uUnlock: { value: 0 },
          uIndex: { value: i },
          uColor: { value: new THREE.Color(ringColors[i]) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI * 0.3 + i * 0.3;
      ring.rotation.y = i * 0.5;
      scene.add(ring);
      rings.push(ring);
    }

    // ── Central glow sphere ───────────────────────────────────────────
    const glowGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#2a4adf"),
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowSphere);

    // ── Animate ───────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const u = unlockRef.current;

      particleMat.uniforms.uTime.value = t;
      particleMat.uniforms.uUnlock.value = u;

      rings.forEach((ring, i) => {
        ring.material.uniforms.uTime.value = t;
        ring.material.uniforms.uUnlock.value = u;
      });

      glowSphere.scale.setScalar(1 + Math.sin(t) * 0.1 + u * 8);
      glowMat.opacity = 0.04 + u * 0.3;

      // Camera parallax
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        r.material.dispose();
      });
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="vault-three-bg" aria-hidden="true" />;
}

/* ──────────────────────────────────────────────────────────────────────
   Vault Dial SVG — double ring with animated dashes
   ────────────────────────────────────────────────────────────────────── */

function VaultDial({ unlocking, shaking }) {
  return (
    <div className={`vault-dial-container ${unlocking ? "vault-unlocking" : ""} ${shaking ? "vault-shake" : ""}`}>
      <svg viewBox="0 0 200 200" className="vault-dial-svg">
        {/* Outer glow rings */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(74,108,247,0.06)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(74,108,247,0.1)" strokeWidth="1" strokeDasharray="4 8" className="vault-ring-dash" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(107,140,255,0.12)" strokeWidth="0.8" strokeDasharray="2 6" className="vault-ring-dash-reverse" />

        {/* Tick marks */}
        {Array.from({ length: 60 }, (_, i) => {
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const isMajor = i % 5 === 0;
          const r1 = isMajor ? 74 : 78;
          const r2 = 83;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(angle)}
              y1={100 + r1 * Math.sin(angle)}
              x2={100 + r2 * Math.cos(angle)}
              y2={100 + r2 * Math.sin(angle)}
              stroke={isMajor ? "rgba(130,160,255,0.5)" : "rgba(80,110,200,0.2)"}
              strokeWidth={isMajor ? 2.5 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Inner dark circle */}
        <circle cx="100" cy="100" r="62" fill="rgba(6,6,14,0.85)" stroke="rgba(74,108,247,0.2)" strokeWidth="1.5" />
        {/* Inner accent ring */}
        <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(74,108,247,0.08)" strokeWidth="0.5" strokeDasharray="3 5" />
      </svg>

      {/* Lock icon */}
      <div className="vault-lock-icon">
        <BsShieldLockFill size={38} />
      </div>

      {/* Radial glow */}
      <div className="vault-dial-glow" />
      <div className="vault-dial-pulse" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Main PasswordGate Component
   ────────────────────────────────────────────────────────────────────── */

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [unlocking, setUnlocking] = useState(false);
  const [unlockProgress, setUnlockProgress] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("portfolio_auth");
      if (stored === "true") setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  // Smooth unlock progress animation
  useEffect(() => {
    if (!unlocking) return;
    let start = null;
    const duration = 2800;
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease-in-out cubic
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setUnlockProgress(eased);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        sessionStorage.setItem("portfolio_auth", "true");
        setAuthenticated(true);
      }
    };
    requestAnimationFrame(animate);
  }, [unlocking]);

  const triggerUnlock = useCallback(() => {
    setUnlocking(true);
    setError(false);
  }, []);

  const triggerError = useCallback(() => {
    setShaking(true);
    setError(true);
    setTimeout(() => {
      setShaking(false);
      setPin(Array(PIN_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }, 600);
    setTimeout(() => setError(false), 2500);
  }, []);

  const tryPassword = useCallback(
    (entered) => {
      if (entered === CORRECT_PASSWORD) {
        triggerUnlock();
      } else {
        triggerError();
      }
    },
    [triggerUnlock, triggerError]
  );

  const handleChange = useCallback(
    (index, value) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      const newPin = [...pin];
      newPin[index] = digit;
      setPin(newPin);

      if (digit && index < PIN_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (digit && index === PIN_LENGTH - 1) {
        const entered = newPin.join("");
        if (entered.length === PIN_LENGTH) {
          setTimeout(() => tryPassword(entered), 120);
        }
      }
    },
    [pin, tryPassword]
  );

  const handleKeyDown = useCallback(
    (index, e) => {
      if (e.key === "Backspace" && !pin[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "Enter") {
        const entered = pin.join("");
        if (entered.length === PIN_LENGTH) tryPassword(entered);
      }
    },
    [pin, tryPassword]
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, PIN_LENGTH);
      if (!pasted) return;
      const newPin = Array(PIN_LENGTH).fill("");
      for (let i = 0; i < pasted.length; i++) newPin[i] = pasted[i];
      setPin(newPin);
      if (pasted.length === PIN_LENGTH) {
        inputRefs.current[PIN_LENGTH - 1]?.focus();
        setTimeout(() => tryPassword(pasted), 120);
      } else {
        inputRefs.current[pasted.length]?.focus();
      }
    },
    [tryPassword]
  );

  if (checking) return null;
  if (authenticated) return <>{children}</>;

  return (
    <div className={`vault-overlay ${unlocking ? "vault-reveal" : ""}`}>
      <VaultThreeBackground unlockProgress={unlockProgress} />

      {/* Radial gradient overlay for depth */}
      <div className="vault-gradient-overlay" />

      <div className={`vault-content ${unlocking ? "vault-content-unlock" : ""}`}>
        {/* Badge */}
        <div className="vault-badge">
          <BsShieldLockFill size={12} />
          <span>SECURED ACCESS</span>
        </div>

        {/* Title */}
        <h1 className="vault-title">Portfolio Vault</h1>

        {/* Vault Dial */}
        <VaultDial unlocking={unlocking} shaking={shaking} />

        {/* PIN inputs */}
        <div className={`vault-pin-row ${shaking ? "vault-shake" : ""}`}>
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className={`vault-pin-input ${error ? "vault-pin-error" : ""} ${digit ? "vault-pin-filled" : ""}`}
              autoFocus={i === 0}
              disabled={unlocking}
            />
          ))}
        </div>

        {/* Hint */}
        <div className="vault-hint">
          <BsKeyFill size={13} />
          <span>Daily rotating password</span>
        </div>

        {error && (
          <p className="vault-error-msg">Incorrect password. Please try again.</p>
        )}
      </div>

      {/* Flash overlay on unlock */}
      {unlocking && <div className="vault-flash" />}

      {/* Footer */}
      <div className={`vault-footer ${unlocking ? "vault-footer-hide" : ""}`}>
        <p className="vault-footer-text">
          I have set a password to protect my intellectual property and project
          <br />
          from theft by other developers.
        </p>
        <p className="vault-footer-text">
          Please contact{" "}
          <a href="https://t.me/bing188025" target="_blank" rel="noopener noreferrer" className="vault-contact-link">
            Kenzan
          </a>{" "}
          to obtain a password and sign up.
        </p>
      </div>

      {/* Social buttons */}
      <div className={`vault-socials ${unlocking ? "vault-footer-hide" : ""}`}>
        <a href="https://t.me/bing188025" target="_blank" rel="noopener noreferrer" className="vault-social-btn">
          <BsTelegram size={16} />
          <span>Telegram</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="vault-social-btn">
          <BsDiscord size={16} />
          <span>Discord</span>
        </a>
      </div>
    </div>
  );
}
