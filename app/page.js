import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Testimonials from "./components/homepage/testimonials";

function WaveDivider({ color = "#ff6b9d", flip = false }) {
  return (
    <div className="wave-divider" style={flip ? { transform: "rotate(180deg)" } : undefined}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,40 C150,80 350,0 500,50 C650,100 800,20 1000,60 C1100,80 1150,40 1200,50 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.06"
        />
        <path
          d="M0,60 C200,100 400,20 600,70 C800,120 1000,30 1200,80 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.03"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />

      <WaveDivider color="#ffd166" />
      <div className="section-about">
        <AboutSection />
      </div>

      <WaveDivider color="#ff6348" flip />
      <div className="section-experience">
        <Experience />
      </div>

      <WaveDivider color="#ff9ff3" />
      <div className="section-skills">
        <Skills />
      </div>

      <WaveDivider color="#ff4757" flip />
      <div className="section-projects">
        <Projects />
      </div>

      <WaveDivider color="#ffaa33" />
      <div className="section-education">
        <Education />
      </div>

      <WaveDivider color="#ff6b9d" flip />
      <div className="section-testimonials">
        <Testimonials />
      </div>

      <WaveDivider color="#ffd166" />
      <div className="section-contact">
        <ContactSection />
      </div>
    </div>
  )
};
