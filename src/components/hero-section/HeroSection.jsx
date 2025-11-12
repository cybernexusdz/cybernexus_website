import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Shuffle from "../ui/Shuffle";
import CountdownToNov18 from "./CountdownToNov18";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ theme }) => {
  const [robot, setRobot] = useState(localStorage.getItem("robot") || "boy");
  const robotRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    setRobot(localStorage.getItem("robot") || "boy");

    // 🎬 Theme change animation
    const themeAnim = gsap.timeline();
    themeAnim
      .to(robotRef.current, {
        opacity: 0,
        x: -100,
        rotate: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(robotRef.current, {
        opacity: 1,
        x: 0,
        rotate: 45,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
      });
  }, [theme]);

  useEffect(() => {
    // 🎢 Scroll animation
    gsap.fromTo(
      robotRef.current,
      {
        opacity: 0,
        x: -150,
        rotate: 0,
      },
      {
        opacity: 1,
        x: 0,
        rotate: 45,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // start when section is 80% into viewport
          toggleActions: "play none none reverse",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen mt-10 flex flex-col justify-center items-center text-center px-6 bg-base-100 text-base-content transition-all duration-500"
    >
      {/* Title */}
      <Shuffle
        text="Empowering"
        secondaryText="Future Tech Leaders"
        shuffleDirection="right"
        duration={0.35}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.03}
        threshold={0.1}
        loop={true}
        loopDelay={3}
        respectReducedMotion={true}
      />

      {/* Description */}
      <p className="max-w-xl text-base sm:text-lg md:text-xl text-gray-600 mb-8 mt-4">
        At CYBERNEXUS, we nurture talent and provide the tools, mentorship, and
        environment needed for aspiring tech innovators to thrive and shape the
        future of technology.
      </p>

      {/* CTA button */}
      <button className="btn btn-primary text-base-100 hover:scale-105 px-10 transition-transform">
        Join Us →
      </button>

      {/* 🦾 Robot image with GSAP animation */}
      <div
        ref={robotRef}
        className="absolute top-[100px] -left-[100px] rotate-45 w-[350px]"
      >
        <img
          src={robot === "boy" ? "./public/boy.png" : "./public/girl.png"}
          className="w-full"
          alt="Robot"
        />
      </div>

      <CountdownToNov18 />
    </section>
  );
};

export default HeroSection;
