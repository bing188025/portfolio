// @flow strict

import * as React from 'react';
import Card3D from '../../helper/card-3d';

function ProjectCard({ project }) {

  return (
    <Card3D className="w-full">
      {/* Animated gradient border wrapper */}
      <div className="proj-card-border relative rounded-2xl p-[2px] overflow-hidden">
        {/* Spinning conic gradient = animated border */}
        <div className="proj-card-glow"></div>

        {/* Inner card body */}
        <div className="proj-card-inner relative z-[1] rounded-[calc(1rem-2px)] overflow-hidden">

          {/* ── Header bar ─────────────────────────────── */}
          <div className="proj-card-header px-5 lg:px-8 py-4 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
            <div className="flex flex-row space-x-2 shrink-0">
              <div className="h-3 w-3 rounded-full bg-[#ff4757] shadow-[0_0_8px_#ff4757]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffd166] shadow-[0_0_8px_#ffd166]"></div>
              <div className="h-3 w-3 rounded-full bg-[#2ed573] shadow-[0_0_8px_#2ed573]"></div>
            </div>
            <p className="flex-1 text-center text-lg lg:text-xl font-bold tracking-wide proj-card-title">
              {project.name}
            </p>
          </div>

          {/* ── Gradient separator ─────────────────────── */}
          <div className="h-[2px] bg-gradient-to-r from-[#ff6b9d] via-[#ffd166] to-[#ff4757]"></div>

          {/* ── Code body ──────────────────────────────── */}
          <div className="proj-card-code px-5 lg:px-8 py-5 lg:py-8" style={{ transform: "translateZ(15px)" }}>
            <code className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
              <div className="blink">
                <span className="mr-2 text-[#ff6b9d] font-bold">const</span>
                <span className="mr-2 text-white font-semibold">project</span>
                <span className="mr-2 text-[#ff6b9d]">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-[#ff9ff3]">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-[#ffd166] font-medium">{project.name}</span>
                <span className="text-gray-400">{`',`}</span>
              </div>

              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-[#ff9ff3]">tools:</span>
                <span className="text-gray-400">{` ['`}</span>
                {
                  project.tools.map((tag, i) => (
                    <React.Fragment key={i}>
                      <span className="text-[#ffd166] font-medium">{tag}</span>
                      {
                        project.tools?.length - 1 !== i &&
                        <span className="text-gray-400">{`', '`}</span>
                      }
                    </React.Fragment>
                  ))
                }
                <span className="text-gray-400">{"],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-[#ff9ff3]">myRole:</span>
                <span className="text-[#ff6348] font-semibold">{project.role}</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-[#ff9ff3]">Description:</span>
                <span className="text-[#7bed9f]">{' ' + project.description}</span>
                <span className="text-gray-400">,</span>
              </div>
              <div><span className="text-gray-400">{`};`}</span></div>
            </code>
          </div>

          {/* ── Bottom accent bar ──────────────────────── */}
          <div className="h-[3px] bg-gradient-to-r from-[#ff4757] via-[#ff6b9d] to-[#ffd166]"></div>
        </div>
      </div>
    </Card3D>
  );
};

export default ProjectCard;
