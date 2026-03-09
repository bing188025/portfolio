// @flow strict
'use client';

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import dynamic from "next/dynamic";

const RobotSwarm = dynamic(() => import('./robot-swarm'), { ssr: false });

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative min-h-[400px]">
      {/* 3D Robot background */}
      <RobotSwarm />

      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8 z-10">
        <span className="bg-gradient-to-r from-amber-400 to-yellow-500 w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md shadow-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-white/20"></span>
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#ffd166] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-gray-300 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="w-[280px] h-[350px] overflow-hidden rounded-lg">
            <Image
              src={personalData.profile}
              width={1536}
              height={1024}
              alt="Kenzan Umezaki"
              className="w-full h-full object-cover object-center transition-all duration-1000 hover:scale-110 cursor-pointer"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
