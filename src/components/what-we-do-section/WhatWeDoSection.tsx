import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code, Lightbulb, Rocket, Users, Terminal, Code2 } from "lucide-react";
import CyberCard from "../ui/CyberCard";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";

const activities = [
  {
    icon: Code,
    title: "Hands-On Workshops",
    description:
      "Learn by doing. From web dev to AI, we run practical workshops where you build real projects.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    glowColor: "cyan" as const,
  },
  {
    icon: Rocket,
    title: "Real-World Projects",
    description:
      "Work on actual projects that matter. Build your portfolio while solving real problems.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    glowColor: "purple" as const,
  },
  {
    icon: Lightbulb,
    title: "Innovation Events",
    description:
      "Hackathons, tech talks, and competitions. Challenge yourself and showcase your skills.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    glowColor: "primary" as const,
  },
  {
    icon: Users,
    title: "Community & Fun",
    description:
      "It's not all code! Game nights, team outings, and hanging out with people who get you.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    glowColor: "pink" as const,
  },
];

const WhatWeDoSection: React.FC = () => {
  // Animation refs with RGB CHROMATIC ABERRATION glitch effects
  const headerBadgeRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.1,
  });

  const headerTitleRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.2,
    delay: 0.3,
  });

  const headerDescRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.5,
  });

  const cardsRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.4,
    delay: 0.2,
    stagger: 0.15,
  });

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-10 bg-background overflow-hidden flex items-center">
      {/* Animated Background Grid */}
      <div className="cyber-grid absolute inset-0 opacity-30" />
      <div className="cyber-grid-diagonal absolute inset-0 opacity-20" />

      {/* Circuit Lines */}
      <div className="circuit-line circuit-line-1" />
      <div className="circuit-line circuit-line-2" />
      <div className="circuit-line circuit-line-3" />

      {/* Data Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="data-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${15 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Scanline Effect */}
      <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />

      <div className="max-w-6xl mx-auto space-y-16 w-full relative z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          {/* Badge - CENTER GLITCH with RGB */}
          <div ref={headerBadgeRef} className="flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono neon-border-subtle"
            >
              <Terminal className="w-4 h-4 mr-2 inline animate-pulse-fast" />
              &lt;ACTIVITIES /&gt;
            </Badge>
          </div>

          {/* Title - CENTER GLITCH with RGB */}
          <div ref={headerTitleRef}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground font-mono">
              What We{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                Actually Do
              </span>
            </h2>
          </div>

          {/* Description - CENTER GLITCH with RGB */}
          <div ref={headerDescRef}>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-mono">
              <span className="text-primary animate-pulse-slow">&gt;_</span> No
              boring lectures. Just practical skills, real projects, and good
              vibes.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Code2 className="w-4 h-4 text-primary/40 animate-pulse-fast" />
              <div className="h-px w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent data-line" />
              <Code2 className="w-4 h-4 text-primary/40 animate-pulse-fast" />
            </div>
          </div>
        </div>

        {/* Activity Cards Grid - CENTER GLITCH with RGB + STAGGER */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <CyberCard
              key={index}
              variant="hologram"
              className={`group relative p-6 bg-card/50 backdrop-blur-sm border-2 ${activity.borderColor} hover:border-opacity-50 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden`}
            >
              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 ${activity.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Animated corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 ${activity.bgColor.replace("/10", "/50")}`}
                />
                <div
                  className={`absolute top-0 left-0 w-0.5 h-full ${activity.bgColor.replace("/10", "/50")}`}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute bottom-0 right-0 w-full h-0.5 ${activity.bgColor.replace("/10", "/50")}`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-0.5 h-full ${activity.bgColor.replace("/10", "/50")}`}
                />
              </div>

              <div className="relative z-10 space-y-4">
                {/* Icon with data brackets */}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs ${activity.color} opacity-60 font-mono`}
                  >
                    [
                  </span>
                  <div
                    className={`w-14 h-14 rounded-lg ${activity.bgColor} border ${activity.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 neon-border-subtle`}
                  >
                    <activity.icon className={`w-7 h-7 ${activity.color}`} />
                  </div>
                  <span
                    className={`text-xs ${activity.color} opacity-60 font-mono`}
                  >
                    ]
                  </span>
                </div>

                {/* Title with terminal prompt */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${activity.color} font-mono`}>
                    &gt;
                  </span>
                  <h3 className="text-2xl font-bold text-foreground font-mono">
                    {activity.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-foreground/80 leading-relaxed pl-6">
                  {activity.description}
                </p>

                {/* Animated progress bar */}
                <div className="relative h-1 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 w-0 group-hover:w-full ${activity.bgColor.replace("/10", "/50")} transition-all duration-700 ease-out`}
                  />
                </div>
              </div>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
