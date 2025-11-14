import React from "react";
import {
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ArrowUp,
  Code,
  Users,
  Rocket,
  Send,
} from "lucide-react";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-base-100 transition-colors duration-300">
      {/* Animated Cyber Grid Background */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(231, 118, 247) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(231, 118, 247) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
        {/* Diagonal scan lines for cyber effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(231, 118, 247, 0.1) 2px, rgba(231, 118, 247, 0.1) 4px)",
          }}
        />
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-24">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-5">
              <h3
                ref={glitchRef}
                className="text-base-content font-bold text-5xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse pb-2"
              >
                CyberNexus
              </h3>
              <p className="text-base-content/70 leading-relaxed text-base">
                Empowering creativity and innovation through technology. Join
                our community to explore, learn, and build amazing projects
                together.
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-all cursor-default">
                <Code className="w-4 h-4" />
                Innovation
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20 hover:bg-secondary/20 transition-all cursor-default">
                <Users className="w-4 h-4" />
                Community
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/20 text-base-content text-sm font-medium border border-base-content/10 hover:bg-accent/30 transition-all cursor-default">
                <Rocket className="w-4 h-4" />
                Learning
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-base-content font-bold text-2xl mb-8 relative inline-block">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </h3>
            <div className="space-y-5">
              <a
                href="mailto:cyber.nexus.tiaret@gmail.com"
                className="group flex items-start gap-4 text-base-content/70 hover:text-primary transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all border border-primary/20 group-hover:scale-110 duration-300">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-xs text-base-content/50 mb-1">
                    Email Us
                  </div>
                  <span className="text-sm break-all">
                    cyber.nexus.tiaret@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 text-base-content/70">
                <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-xs text-base-content/50 mb-1">
                    Location
                  </div>
                  <span className="text-sm">Tiaret, Algeria</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-base-content font-bold text-2xl mb-8 relative inline-block">
              Connect With Us
              <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Telegram",
                  href: "https://t.me/+88z7iR0d1XhiOWI0",
                  icon: Send,
                  color: "hover:bg-[#0088cc]/20 hover:border-[#0088cc]/50",
                  hoverColor: "group-hover:text-[#0088cc]",
                },
                {
                  name: "Instagram",
                  href: "https://instagram.com",
                  icon: Instagram,
                  color: "hover:bg-pink-500/20 hover:border-pink-500/50",
                  hoverColor: "group-hover:text-pink-500",
                },
                {
                  name: "TikTok",
                  href: "https://vm.tiktok.com/ZSHc7fLSpmfqq-MMoyK/",
                  icon: null,
                  color: "hover:bg-cyan-500/20 hover:border-cyan-500/50",
                  hoverColor: "group-hover:text-cyan-500",
                },
                {
                  name: "Facebook",
                  href: "https://facebook.com",
                  icon: Facebook,
                  color: "hover:bg-blue-500/20 hover:border-blue-500/50",
                  hoverColor: "group-hover:text-blue-500",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-5 rounded-xl bg-base-200/50 border border-base-content/10 ${social.color} transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-3`}
                  title={social.name}
                >
                  {social.icon ? (
                    <social.icon
                      className={`w-7 h-7 text-base-content/70 ${social.hoverColor} transition-colors`}
                    />
                  ) : (
                    <svg
                      className={`w-7 h-7 text-base-content/70 ${social.hoverColor} transition-colors`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  )}
                  <span
                    className={`text-xs font-medium text-base-content/70 transition-colors ${
                      social.name === "Telegram"
                        ? "group-hover:text-[#0088cc]"
                        : social.name === "Instagram"
                          ? "group-hover:text-pink-500"
                          : social.name === "TikTok"
                            ? "group-hover:text-cyan-500"
                            : "group-hover:text-blue-500"
                    }`}
                  >
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
              <p className="text-sm text-base-content/60 leading-relaxed">
                Join our growing community of tech enthusiasts, developers, and
                innovators. Stay updated with our latest projects and events!
              </p>
            </div>
          </div>
        </div>

        {/* Cyber Divider */}
        <div className="relative h-px mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-base-content/60 text-sm">
            <span className="text-primary font-mono text-lg">{"<>"}</span>
            <span>© {currentYear} Cyber Nexus</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Crafted with</span>
            <span className="hidden sm:inline text-primary animate-pulse">
              ❤️
            </span>
            <span className="hidden sm:inline">in Algeria</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/5 hover:shadow-primary/20"
            aria-label="Back to top"
          >
            <span className="text-sm font-semibold">Back to Top</span>
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
