'use client';

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import experienceLottie from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

const CARD_H      = 122;   // estimated height of one card (px)
const GAP         = 32;    // gap between expanded cards (px)
const STACK_SCALE = 0.92;  // card scale when stacked

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function Experience() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const n          = experiences.length;
  const expandedH  = n * CARD_H + (n - 1) * GAP;   // full list height
  const stackedH   = CARD_H + 30;                    // compact stack height
  const scrollDist = expandedH + 340;

  // ── overall container height: stacked → expanded ──────────────────
  const globalT  = easeOut(progress);
  const currentH = stackedH + (expandedH - stackedH) * globalT;

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const { top } = wrapperRef.current.getBoundingClientRect();
      const scrollable = wrapperRef.current.offsetHeight - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -top / scrollable)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function getCardStyle(index) {
    const center = (n - 1) / 2;

    // ── stacked (fan) ────────────────────────────────────────────────
    const stackRotate = (index - center) * 4;
    const stackY      = Math.abs(index - center) * 5;

    // ── expanded (list) ──────────────────────────────────────────────
    const expandedY = index * (CARD_H + GAP);

    // ── per-card stagger ─────────────────────────────────────────────
    const cardStart = (index / n) * 0.55;
    const cardEnd   = cardStart + 0.52;
    const raw = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));
    const t   = easeOut(raw);

    const currentScale = STACK_SCALE + (1 - STACK_SCALE) * t;

    return {
      position:        'absolute',
      top:             0,
      left:            0,
      right:           0,
      transform:       `translateY(${stackY + (expandedY - stackY) * t}px) rotate(${stackRotate * (1 - t)}deg) scale(${currentScale})`,
      zIndex:          n - index,
      transformOrigin: 'center center',
      transition:      'transform 0.15s ease-out',
    };
  }

  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-white/10">
      <Image src="/section.svg" alt="" width={1572} height={795} className="absolute top-0 -z-10" />

      {/* Section heading */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-white/20" />
          <span className="bg-gradient-to-r from-rose-500 to-orange-500 w-fit text-white p-2 px-5 text-xl rounded-md shadow-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-white/20" />
        </div>
      </div>

      {/* ── Scroll-driven sticky zone ────────────────────────────────── */}
      <div ref={wrapperRef} style={{ height: `calc(100vh + ${scrollDist}px)` }}>
        <div
          className="sticky"
          style={{ top: '64px', height: 'calc(100vh - 80px)', overflow: 'visible' }}
        >
          {/* items-center keeps Lottie + cards always vertically centred */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-6">

            {/* Left: Lottie — stays vertically centred alongside cards */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-full max-w-sm">
                <AnimationLottie animationPath={experienceLottie} />
              </div>
            </div>

            {/* Right: animated cards — height grows as they unfold */}
            <div
              className="relative overflow-visible"
              style={{
                height:     `${currentH}px`,
                transition: 'height 0.15s ease-out',
              }}
            >
              {experiences.map((exp, index) => (
                <div key={exp.id} style={getCardStyle(index)}>
                  <GlowCard identifier={`experience-${exp.id}`}>
                    <div className="p-3 relative">
                      <Image src="/blur-23.svg" alt="" width={1080} height={200} className="absolute bottom-0 opacity-80" />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#ff6348]">{exp.duration}</p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-rose-500 transition-all duration-300 hover:scale-125 shrink-0">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">{exp.title}</p>
                          <p className="text-sm sm:text-base">{exp.company}</p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
