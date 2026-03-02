"use client";

import { useRef, useCallback } from "react";

const Card3D = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const shadowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 20;
    const rotateX = (0.5 - y) * 15;

    card.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare) {
      glare.style.background = `radial-gradient(
        circle at ${x * 100}% ${y * 100}%,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 107, 157, 0.15) 20%,
        rgba(255, 209, 102, 0.08) 40%,
        transparent 65%
      )`;
      glare.style.opacity = "1";
    }

    // Dynamic shadow shift
    const shadowX = (0.5 - x) * 30;
    const shadowY = (0.5 - y) * 30;
    card.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 25px rgba(255, 71, 87, 0.25))`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.1s ease-out, filter 0.1s ease-out";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;
    card.style.transition = "transform 0.5s ease-out, filter 0.5s ease-out";
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
    card.style.filter = "drop-shadow(0px 0px 20px rgba(255, 71, 87, 0.15))";
    if (glare) glare.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-3d-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform, filter",
        filter: "drop-shadow(0px 0px 20px rgba(255, 71, 87, 0.15))",
      }}
    >
      <div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {children}
        {/* Glare overlay */}
        <div
          ref={glareRef}
          className="card-3d-glare"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 30,
            opacity: 0,
            transition: "opacity 0.3s ease",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
};

export default Card3D;
