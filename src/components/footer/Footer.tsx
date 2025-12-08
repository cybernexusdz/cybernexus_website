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
  Zap,
} from "lucide-react";
import { RetroGrid } from "@/components/ui/retroGrid";
import { Title } from "@/components/ui/title";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/+88z7iR0d1XhiOWI0",
      icon: Send,
      gradientFrom: "#0088cc",
      gradientTo: "rgba(0, 136, 204, 0.7)",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/cybernexusdz/",
      icon: Instagram,
      gradientFrom: "#ec4899",
      gradientTo: "#a855f7",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@cybernexusdz?lang=en",
      icon: null,
      gradientFrom: "#06b6d4",
      gradientTo: "#22d3ee",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/cybernexusdz/",
      icon: Facebook,
      gradientFrom: "#3b82f6",
      gradientTo: "#2563eb",
    },
  ];

  const featureTags = [
    { icon: Code, label: "Innovation", color: "primary" },
    { icon: Users, label: "Community", color: "secondary" },
    { icon: Rocket, label: "Learning", color: "accent" },
  ];

  return (
    <>
      <footer className="relative overflow-hidden bg-gradient-to-b from-base-100 via-base-200/30 to-base-100">
        {/* Background Grid */}
        <RetroGrid
          angle={70}
          cellSize={20}
          lightLineColor="#fff"
          opacity={0.05}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-24">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-8 relative">
              <div className="space-y-5">
                <Title
                  text="CyberNexus"
                  className="text-4xl sm:text-5xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent uppercase"
                />

                <p className="text-base-content/70 leading-relaxed text-base font-mono">
                  <span className="text-secondary font-bold">&gt;</span>{" "}
                  Empowering creativity and innovation through technology. Join
                  our community to explore, learn, and build amazing projects
                  together.
                </p>
              </div>
              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                {featureTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-${tag.color}/10 text-${tag.color} text-xs font-bold border border-${tag.color}/30 hover:bg-${tag.color}/20 transition-all cursor-default font-mono uppercase tracking-wider`}
                  >
                    <tag.icon className="w-4 h-4" />
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* System Status */}
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/30 text-xs font-mono text-success">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>ONLINE</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
                  <Zap className="w-3 h-3" />
                  <span>ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1 space-y-6 relative">
              <h3 className="text-base-content font-black text-2xl mb-2 font-mono">
                <span className="text-secondary">&gt;</span> Get In Touch
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:cyber.nexus.tiaret@gmail.com"
                  className="group flex items-start gap-4 p-4 rounded-xl bg-base-200/40 border-2 border-primary/20 hover:border-primary/50 transition-all overflow-hidden"
                >
                  <div className="p-3 rounded-lg bg-primary/20 border border-primary/40 flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-primary font-mono font-bold uppercase tracking-wider">
                      EMAIL_ADDRESS
                    </div>
                    <span className="text-sm text-base-content/80 font-mono break-all">
                      cyber.nexus.tiaret@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/40 border-2 border-secondary/20">
                  <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/40 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-secondary font-mono font-bold uppercase tracking-wider">
                      GPS_COORDINATES
                    </div>
                    <span className="text-sm text-base-content/80 font-mono">
                      Tiaret, Algeria
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Section */}
            <div className="lg:col-span-1 space-y-6 relative">
              <h3 className="text-base-content font-black text-2xl mb-2 font-mono">
                <span className="text-info">&gt;</span> Connect With Us
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-6 rounded-xl bg-base-200/40 border-2 border-base-content/10 hover:border-base-content/30 transition-all flex flex-col items-center gap-3 overflow-hidden"
                  >
                    {/* Fog Effect Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                      style={{
                        background: `radial-gradient(circle at center, ${social.gradientFrom}, ${social.gradientTo})`,
                      }}
                    />

                    {social.icon ? (
                      <social.icon className="w-8 h-8 text-base-content/70 group-hover:text-base-content relative z-10 transition-colors" />
                    ) : (
                      <svg
                        className="w-8 h-8 text-base-content/70 group-hover:text-base-content relative z-10 transition-colors"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    )}

                    <span className="text-xs font-bold text-base-content/70 group-hover:text-base-content uppercase tracking-wider relative z-10 transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-base-content/60 text-sm font-mono">
              <span className="text-primary font-bold text-lg">{"</>"}</span>
              <span className="px-2 py-1 bg-primary/10 rounded border border-primary/30 text-primary font-bold">
                © {currentYear}
              </span>
              <span className="hidden sm:inline">CYBER_NEXUS</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 hover:scale-105 transition-all font-mono font-bold uppercase tracking-wider"
            >
              <span className="text-sm">SCROLL_TOP</span>
              <ArrowUp className="w-5 h-5 inline-block ml-2" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
