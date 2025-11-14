import { useState, useRef, useEffect } from "react";
import {
  Linkedin,
  Github,
  Mail,
  Network,
  ChevronLeft,
  ChevronRight,
  Heart,
  Code,
  Video,
  Star,
  Cpu,
  Globe,
  Monitor,
} from "lucide-react";
import ProfileCard from "./ProfileCard";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";

const teamMembers = [
  {
    id: 1,
    name: "Aziz Ben",
    role: "Student",
    image: "/azizben-image-front.jpg",
    borderClass: "border-sky-500/50",
    bgGradientClass: "from-sky-500/10 to-blue-500/5",
    accentClass: "text-sky-400",
    iconColor: "text-sky-400",
    iconBgColor: "bg-sky-500/20",
    iconBorderColor: "border-sky-500/50",
    socialLinks: [
      {
        icon: Globe,
        label: "Portfolio",
        href: "https://abdelazizbenallou.github.io/Personel_Profilio/",
      },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-sky-500/20 rounded-full flex items-center justify-center">
          <Globe className="w-8 h-8 text-sky-400" />
        </div>
        <h3 className="text-xl font-bold text-sky-400">Aziz Ben</h3>
        <p className="text-sm text-base-content/80">Student</p>
        <p className="text-xs text-base-content/70">Master Networks 1</p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(220,245,255,0.10), rgba(230,250,255,0.02))",
      rimColor: "rgba(56,189,248,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 20px 50px rgba(20,100,150,0.08)",
      badge: "NET",
      badgeClass: "bg-sky-500/15 text-sky-300",
      animateBack: true,
      tiltStrength: 14,
    },
  },

  {
    id: 2,
    name: "Kamel",
    role: "Student",
    image: "/kamel-image-front.png",
    borderClass: "border-purple-500/50",
    bgGradientClass: "from-purple-500/10 to-fuchsia-500/5",
    accentClass: "text-purple-400",
    iconColor: "text-purple-400",
    iconBgColor: "bg-purple-500/20",
    iconBorderColor: "border-purple-500/50",
    socialLinks: [
      { icon: Mail, label: "Email", href: "mailto:Kamel.mutig14@gmail.com" },
      {
        icon: Globe,
        label: "Portfolio",
        href: "https://portfolio-beige-five-34.vercel.app/",
      },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center">
          <Video className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-purple-400">Kamel</h3>
        <p className="text-sm text-base-content/80">Student</p>
        <p className="text-xs text-base-content/70">Master GL 1</p>
        <p className="text-xs">
          <a href="mailto:Kamel.mutig14@gmail.com">Kamel.mutig14@gmail.com</a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(245,230,255,0.10), rgba(250,240,255,0.02))",
      rimColor: "rgba(168,85,247,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 22px 60px rgba(120,40,200,0.06)",
      badge: "GL",
      badgeClass: "bg-purple-500/15 text-purple-300",
      animateBack: true,
      tiltStrength: 13,
    },
  },

  {
    id: 3,
    name: "Hakim Ait Abderrahim",
    role: "Student",
    image: "/hakim-image-front.jpg",
    borderClass: "border-blue-500/50",
    bgGradientClass: "from-blue-500/10 to-cyan-500/5",
    accentClass: "text-blue-400",
    iconColor: "text-blue-400",
    iconBgColor: "bg-blue-500/20",
    iconBorderColor: "border-blue-500/50",
    socialLinks: [
      {
        icon: Mail,
        label: "Email",
        href: "mailto:Hakimaitabderrahim18@gmail.com",
      },
      {
        icon: Globe,
        label: "Portfolio",
        href: "https://66ee86e5f20b6d1656809790--preeminent-shortbread-6639a5.netlify.app/",
      },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
          <Code className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-blue-400">
          Hakim Ait Abderrahim
        </h3>
        <p className="text-sm text-base-content/80">Student</p>
        <p className="text-xs text-base-content/70">Master 2 GL</p>
        <p className="text-xs">
          <a href="mailto:Hakimaitabderrahim18@gmail.com">
            Hakimaitabderrahim18@gmail.com
          </a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(220,240,255,0.08), rgba(235,250,255,0.02))",
      rimColor: "rgba(100,149,237,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 20px 50px rgba(0,60,120,0.08)",
      badge: "GL",
      badgeClass: "bg-blue-500/15 text-blue-300",
      animateBack: true,
      tiltStrength: 16,
    },
  },

  {
    id: 4,
    name: "OULD Hocine Sofiane",
    role: "Student",
    image: "/ould-hocine-sofiane-image-front.jpg",
    borderClass: "border-green-500/50",
    bgGradientClass: "from-green-500/10 to-emerald-500/5",
    accentClass: "text-green-400",
    iconColor: "text-green-400",
    iconBgColor: "bg-green-500/20",
    iconBorderColor: "border-green-500/50",
    socialLinks: [
      { icon: Mail, label: "Email", href: "mailto:sofiane2017old@gmail.com" },
      {
        icon: Globe,
        label: "Portfolio",
        href: "https://dex17oh.github.io/dex17oh/",
      },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
          <Cpu className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-green-400">
          OULD Hocine Sofiane
        </h3>
        <p className="text-sm text-base-content/80">Student</p>
        <p className="text-xs text-base-content/70">Master 1 AI</p>
        <p className="text-xs">
          <a href="mailto:sofiane2017old@gmail.com">sofiane2017old@gmail.com</a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(235,255,240,0.10), rgba(245,255,250,0.02))",
      rimColor: "rgba(88,196,132,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 18px 44px rgba(20,80,40,0.06)",
      badge: "AI",
      badgeClass: "bg-green-500/15 text-green-300",
      animateBack: true,
      tiltStrength: 14,
    },
  },

  {
    id: 5,
    name: "Matela Abdelhafid",
    role: "Student",
    image: "/matela-image-front.png",
    borderClass: "border-rose-500/50",
    bgGradientClass: "from-rose-500/10 to-pink-500/5",
    accentClass: "text-rose-400",
    iconColor: "text-rose-400",
    iconBgColor: "bg-rose-500/20",
    iconBorderColor: "border-rose-500/50",
    socialLinks: [
      { icon: Mail, label: "Email", href: "mailto:abdou26072001@gmail.com" },
      { icon: Github, label: "GitHub", href: "https://github.com/hafid2001" },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-rose-500/20 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-rose-400" />
        </div>
        <h3 className="text-xl font-bold text-rose-400">MATELA Abdelhafid</h3>
        <p className="text-sm text-base-content/80">Student</p>
        <p className="text-xs text-base-content/70">3 LS SI</p>
        <p className="text-xs">
          <a href="mailto:abdou26072001@gmail.com">abdou26072001@gmail.com</a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(255,230,235,0.10), rgba(255,245,247,0.02))",
      rimColor: "rgba(249, 168, 212, 0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.09), transparent)",
      glossOpacity: 0.95,
      shadow: "0 18px 40px rgba(0,0,0,0.12)",
      badge: "SI",
      badgeClass: "bg-rose-500/20 text-rose-300",
      animateBack: true,
      tiltStrength: 14,
    },
  },
  {
    id: 9, // keep original id if you like, or update
    name: "Sabrine Boughrab",
    role: "Club Owner",
    image: "/sabrin-image-front.png",
    // stronger, golden border to stand out
    borderClass: "border-2 border-amber-400/60",
    // a warm, slightly richer gradient for front/back art
    bgGradientClass: "from-amber-100/10 to-yellow-50/3",
    accentClass: "text-amber-400",
    // icons use theme-aware coloring; links section will still use the global links style
    iconColor: "text-base-content",
    iconBgColor: "bg-base-100/10",
    iconBorderColor: "border-base-content/20",
    socialLinks: [
      {
        icon: Mail,
        label: "Email",
        href: "mailto:sabrineboughrab@gmail.com",
        platform: "email",
      },
      // add LinkedIn/GitHub if available
    ],
    backContent: (
      <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
        {/* FULL COVER decorative background: nebula + particles (fills entire back face) */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none -z-10 overflow-hidden"
          aria-hidden="true"
        >
          {/* subtle warm nebula that's transparent so it blends with card's bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(245,200,110,0.06), rgba(220,150,40,0.03))",
            }}
          />

          {/* star specks / particles (full size) */}
          <div className="absolute inset-0 stars-layer" />

          {/* soft golden halo centered behind the badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-44 h-44 rounded-full blur-3xl opacity-25 bg-amber-400/30" />
          </div>

          {/* subtle confetti (floating shapes) */}
          <div className="absolute inset-0 confetti-layer" />
        </div>

        {/* FOREGROUND */}
        <div className="z-10 flex flex-col items-center gap-2">
          {/* top-left ribbon — placed visually with absolute positioning inside the back face */}
          <div className="absolute left-4 top-4 z-20">
            <div className="rotate-3 bg-amber-400/95 text-amber-900 text-xs font-semibold px-3 py-1 rounded-sm shadow-md border border-amber-300/30">
              Club Owner
            </div>
          </div>

          {/* crown badge */}
          <div
            className="mx-auto mb-1 w-28 h-28 rounded-full flex items-center justify-center
                        bg-base-100/70 border border-amber-300/20 shadow-2xl backdrop-blur-sm"
          >
            {/* lucide Crown/Award icon — inherits color */}
            <svg
              className="w-12 h-12 text-amber-500 animate-crown"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 15h20l-2 6H4l-2-6z" />
              <path d="M7 8l3 6 3-6 3 6 3-6" />
            </svg>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-amber-500">
            Sabrine Boughrab
          </h3>
          <p className="text-sm text-base-content/80">Club Owner</p>
          <p className="text-xs text-base-content/70">1 Master RT</p>

          <div className="mt-1 text-sm">
            <p className="max-w-xs">
              Leading the club — events, mentorship & community ✨
            </p>
          </div>
        </div>

        {/* Inline CSS for animations + particles (respects reduced motion) */}
        <style>{`
        /* crown float */
        @keyframes crownFloat {
          0% { transform: translateY(0) scale(1) rotate(-1deg); }
          50% { transform: translateY(-8px) scale(1.02) rotate(1deg); }
          100% { transform: translateY(0) scale(1) rotate(-1deg); }
        }
        .animate-crown { animation: crownFloat 4.2s ease-in-out infinite; color: #b45309; } /* amber-600 */

        /* stars (full-cover) */
        .stars-layer {
          background:
            radial-gradient(circle at 6% 20%, rgba(255,255,255,0.95) 0.6px, transparent 1px),
            radial-gradient(circle at 22% 72%, rgba(255,255,255,0.85) 0.7px, transparent 1px),
            radial-gradient(circle at 40% 30%, rgba(255,255,255,0.6) 0.6px, transparent 1px),
            radial-gradient(circle at 68% 11%, rgba(255,255,255,0.7) 0.6px, transparent 1px),
            radial-gradient(circle at 86% 62%, rgba(255,255,255,0.82) 0.6px, transparent 1px);
          mix-blend-mode: screen;
          opacity: 0.9;
          animation: starPulse 7s ease-in-out infinite;
        }
        @keyframes starPulse {
          0% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
          100% { opacity: 0.7; transform: scale(1); }
        }

        /* confetti: small floating diamond shapes */
        .confetti-layer::before,
        .confetti-layer::after {
          content: "";
          position: absolute;
          width: 8px;
          height: 8px;
          transform: rotate(45deg);
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.3));
          left: 12%;
          top: 20%;
          opacity: 0.9;
          border-radius: 1px;
          box-shadow:
            40px 30px 0 rgba(245,158,11,0.12),
            140px 60px 0 rgba(245,158,11,0.10),
            220px 30px 0 rgba(234,88,12,0.08);
          animation: confettiFloat 8s linear infinite;
        }
        .confetti-layer::after {
          left: 70%;
          top: 68%;
          transform: rotate(45deg) scale(.9);
          animation-delay: 2s;
        }
        @keyframes confettiFloat {
          0% { transform: translateY(0) rotate(45deg); opacity: 0.9; }
          50% { transform: translateY(-18px) rotate(45deg); opacity: 0.6; }
          100% { transform: translateY(0) rotate(45deg); opacity: 0.9; }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-crown, .stars-layer, .confetti-layer::before, .confetti-layer::after {
            animation: none !important;
          }
        }
      `}</style>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(255,247,233,0.08), rgba(255,250,240,0.02))",
      rimColor: "rgba(245,158,11,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.95,
      shadow: "0 30px 80px rgba(250,180,60,0.10)",
      badge: "OWNER",
      badgeClass: "bg-amber-400/20 text-amber-500",
      animateBack: true,
      tiltStrength: 16,
    },
  },
  {
    id: 11,
    name: "Farah",
    role: "Content Creator",
    image: "/farah-image-front.png",
    borderClass: "border-purple-500/50",
    bgGradientClass: "from-purple-500/10 to-fuchsia-500/5",
    accentClass: "text-purple-400",
    iconColor: "text-base-content",
    iconBgColor: "bg-base-100/10",
    iconBorderColor: "border-base-content/20",
    socialLinks: [
      {
        icon: Linkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit",
      },
      {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/FarahTechOdyssey",
      },
    ],
    backContent: (
      <div className="relative w-full h-full flex items-center justify-center p-6 text-center">
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(124,58,237,0.06), rgba(49,46,129,0.03))",
            }}
          />

          {/* stars layer fills entire back face */}
          <div className="absolute inset-0 stars-layer" />

          {/* optional soft glow behind icon (centered) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full blur-3xl opacity-20 bg-purple-400/30" />
          </div>
        </div>

        {/* FOREGROUND content (kept above decorations) */}
        <div className="z-10 flex flex-col items-center gap-2">
          {/* network icon badge */}
          <div
            className="mx-auto mb-1 w-24 h-24 rounded-full flex items-center justify-center
                      bg-base-100/60 border border-base-content/10 shadow-md backdrop-blur-sm"
          >
            <Network
              className="w-12 h-12 text-purple-400 animate-network"
              aria-hidden="true"
            />
          </div>

          <h3 className="text-xl font-bold text-purple-400">Farah</h3>
          <p className="text-sm text-base-content/80">Content Creator</p>
          <p className="text-xs text-base-content/70">Master 1 Network</p>

          <div className="mt-1 text-sm">
            <p>Navigating the digital cosmos ⭐</p>
          </div>
        </div>

        {/* CSS: full-card stars + small animations; respects reduced motion */}
        <style>{`
      /* subtle floating for the network icon */
      @keyframes floatSmall {
        0% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-6px) rotate(2deg); }
        100% { transform: translateY(0) rotate(-2deg); }
      }
      .animate-network { animation: floatSmall 4s ease-in-out infinite; }

      /* Stars layer: use multiple radial-gradients for scattered stars */
      .stars-layer {
        background:
          radial-gradient(circle at 8% 18%, rgba(255,255,255,0.95) 0.6px, transparent 1px),
          radial-gradient(circle at 22% 70%, rgba(255,255,255,0.85) 0.7px, transparent 1px),
          radial-gradient(circle at 38% 34%, rgba(255,255,255,0.65) 0.6px, transparent 1px),
          radial-gradient(circle at 62% 14%, rgba(255,255,255,0.7) 0.6px, transparent 1px),
          radial-gradient(circle at 80% 56%, rgba(255,255,255,0.8) 0.6px, transparent 1px),
          /* faint additional noise for depth */
          radial-gradient(circle at 45% 86%, rgba(255,240,200,0.15) 0.8px, transparent 2px);
        mix-blend-mode: screen;
        opacity: 0.9;
        animation: twinkle 6s ease-in-out infinite;
        transform-origin: center;
      }

      @keyframes twinkle {
        0% { opacity: 0.75; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.02); }
        100% { opacity: 0.75; transform: scale(1); }
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-network, .stars-layer { animation: none !important; }
      }
    `}</style>
      </div>
    ),

    theme: {
      background:
        "linear-gradient(180deg, rgba(245,230,255,0.10), rgba(250,240,255,0.02))",
      rimColor: "rgba(168,85,247,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 22px 60px rgba(120,40,200,0.06)",
      badge: "CC",
      badgeClass: "bg-purple-500/15 text-purple-300",
      animateBack: true,
      tiltStrength: 14,
    },
  },

  {
    id: 6,
    name: "mlsvmdl",
    role: "Developer",
    image: "/mlsvmdl-image-front.jpg",
    borderClass: "border-red-700/60",
    bgGradientClass: "from-red-900 to-black",
    accentClass: "text-white",
    iconColor: "text-red-300",
    iconBgColor: "bg-red-800/30",
    iconBorderColor: "border-red-700/60",
    socialLinks: [
      { icon: Github, label: "GitHub", href: "https://github.com/mlsvmdl" },
    ],
    backContent: (
      <div className="text-center space-y-4 w-full text-white">
        <div className="w-32 h-32 mx-auto rounded-2xl overflow-visible group py-3">
          <img
            src="/mlsvmdl-image-back.png"
            className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
            style={{ animation: "float 3s ease-in-out infinite" }}
          />
        </div>
        <h3 className="text-xl font-bold text-white">mlsvmdl</h3>
        <p className="text-sm text-white/80">Developer</p>
        <div className="text-xs text-white space-y-1">
          <p>☀️ Chitch loves Poppo!</p>
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(6,6,6,1) 0%, rgba(36,6,6,0.98) 35%, rgba(80,0,0,0.85) 70%, rgba(0,0,0,1) 100%)",
      rimColor: "rgba(255,36,36,0.18)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.04), rgba(255,0,0,0.03) 40%, transparent 60%)",
      glossOpacity: 0.95,
      shadow: "0 30px 80px rgba(0,0,0,0.65)",
      badge: "BERSERK",
      badgeClass: "bg-red-800/30 text-red-300",
      animateBack: true,
      tiltStrength: 18,
      customStyles: { backgroundBlendMode: "multiply" },
    },
  },

  {
    id: 7,
    name: "Missoum Hadi Adda",
    role: "Student",
    image: "/missoum-hadi-adda-image-front.jpg",
    borderClass: "border-indigo-500/50",
    bgGradientClass: "from-indigo-500/10 to-blue-500/5",
    accentClass: "text-indigo-400",
    iconColor: "text-indigo-400",
    iconBgColor: "bg-indigo-500/20",
    iconBorderColor: "border-indigo-500/50",
    socialLinks: [
      { icon: Mail, label: "Email", href: "mailto:addajs48@gmail.com" },
      {
        icon: Globe,
        label: "Portfolio",
        href: "https://addahadi.github.io/Portofolio/",
      },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center">
          <Cpu className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold text-indigo-400">Missoum Hadi Adda</h3>
        <p className="text-sm text-base-content/80">Student</p>
        <p className="text-xs text-base-content/70">3 LS SI</p>
        <p className="text-xs">
          <a href="mailto:addajs48@gmail.com">addajs48@gmail.com</a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(230,235,255,0.10), rgba(245,250,255,0.02))",
      rimColor: "rgba(99,102,241,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 22px 60px rgba(30,30,120,0.06)",
      badge: "SI",
      badgeClass: "bg-indigo-500/15 text-indigo-300",
      animateBack: true,
      tiltStrength: 15,
    },
  },

  {
    id: 8,
    name: "Bousbia Mouhhamed Bachir",
    role: "Student / Developer",
    image: "/bousbia-mouhamed-bachir-image-front.jpg",
    borderClass: "border-cyan-500/50",
    bgGradientClass: "from-cyan-500/10 to-teal-500/5",
    accentClass: "text-cyan-400",
    iconColor: "text-cyan-400",
    iconBgColor: "bg-cyan-500/20",
    iconBorderColor: "border-cyan-500/50",
    socialLinks: [
      {
        icon: Mail,
        label: "Email",
        href: "mailto:bousbiamouhamedbachir@gmail.com",
      },
      {
        icon: Github,
        label: "GitHub",
        href: "https://github.com/bousbiamouhamedbachir",
      },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-cyan-500/20 rounded-full flex items-center justify-center">
          <Monitor className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-cyan-400">
          Bousbia Mouhhamed Bachir
        </h3>
        <p className="text-sm text-base-content/80">Student / Developer</p>
        <p className="text-xs">
          <a href="mailto:bousbiamouhamedbachir@gmail.com">
            bousbiamouhamedbachir@gmail.com
          </a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(220,250,255,0.10), rgba(230,255,255,0.02))",
      rimColor: "rgba(34,211,238,0.12)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.9,
      shadow: "0 18px 40px rgba(20,120,130,0.06)",
      badge: "DEV",
      badgeClass: "bg-cyan-500/15 text-cyan-300",
      animateBack: true,
      tiltStrength: 13,
    },
  },

  {
    id: 10,
    name: "Bedoui Denia",
    role: "Designer + HR",
    image: "/denia-image-front.png",
    borderClass: "border-amber-500/50",
    bgGradientClass: "from-amber-500/10 to-yellow-500/5",
    accentClass: "text-amber-400",
    iconColor: "text-amber-400",
    iconBgColor: "bg-amber-500/20",
    iconBorderColor: "border-amber-500/50",
    socialLinks: [
      { icon: Mail, label: "Email", href: "mailto:bedouidenia25@gmail.com" },
    ],
    backContent: (
      <div className="text-center space-y-3 p-4">
        <div className="w-16 h-16 mx-auto bg-amber-500/20 rounded-full flex items-center justify-center">
          <Star className="w-8 h-8 text-amber-400" />
        </div>
        <h3 className="text-xl font-bold text-amber-400">Bedoui Denia</h3>
        <p className="text-sm text-base-content/80">Designer + HR</p>
        <p className="text-xs text-base-content/70">L3</p>
        <p className="text-xs">
          <a href="mailto:bedouidenia25@gmail.com">bedouidenia25@gmail.com</a>
        </p>
      </div>
    ),
    theme: {
      background:
        "linear-gradient(180deg, rgba(255,245,220,0.10), rgba(255,250,235,0.02))",
      rimColor: "rgba(250,204,21,0.10)",
      gloss:
        "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent)",
      glossOpacity: 0.85,
      shadow: "0 18px 40px rgba(180,120,20,0.06)",
      badge: "DES/HR",
      badgeClass: "bg-amber-500/15 text-amber-300",
      animateBack: false,
      tiltStrength: 12,
    },
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(
    teamMembers.findIndex((m) => m.role === "Club Owner"),
  );
  const [isMobile, setIsMobile] = useState(false);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(teamMembers.length - 1, prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = Math.abs(touchStartX.current - touchEndX.current);
    if (diff > 10) isDragging.current = true;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrevious();
    }
    isDragging.current = false;
  };

  // Get visible cards
  const getVisibleCards = () => {
    const cards = [];
    const range = isMobile ? 2 : 3;
    for (let i = currentIndex - range; i <= currentIndex + range; i++) {
      if (i >= 0 && i < teamMembers.length) {
        cards.push({ ...teamMembers[i], position: i - currentIndex, index: i });
      }
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const handleCardClick = (index) => {
    if (index !== currentIndex) setCurrentIndex(index);
  };

  return (
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/30 to-base-100 relative overflow-hidden flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto space-y-12 w-full relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content">
            Meet Our{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
            >
              Team
            </span>
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            Introducing the{" "}
            <span className="text-primary font-semibold">Talented</span> Minds
            Behind Our Innovation
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative px-4 sm:px-8 md:px-16 lg:px-24"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons - Hidden on mobile */}
          {!isMobile && (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:scale-110 transition-all shadow-lg shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Previous team member"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === teamMembers.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 hover:scale-110 transition-all shadow-lg shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Next team member"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="relative h-[480px] sm:h-[520px] md:h-[600px] flex items-center justify-center">
            <div className="relative w-full flex items-center justify-center overflow-visible">
              {visibleCards.map((member) => {
                const pos = Math.abs(member.position);
                const isCenterCard = member.position === 0;

                // Simplified card styling calculation
                const getCardStyle = () => {
                  const styles = isMobile
                    ? [
                        { scale: 1, opacity: 1, blur: 0 },
                        { scale: 0.75, opacity: 0.5, blur: 2 },
                        { scale: 0.6, opacity: 0.2, blur: 4 },
                      ]
                    : [
                        { scale: 1, opacity: 1, blur: 0 },
                        { scale: 0.85, opacity: 0.7, blur: 1 },
                        { scale: 0.7, opacity: 0.4, blur: 2 },
                        { scale: 0.55, opacity: 0.2, blur: 3 },
                      ];
                  return styles[Math.min(pos, styles.length - 1)];
                };

                const { scale, opacity, blur } = getCardStyle();
                const zIndex = 30 - pos * 5;
                const translateX = member.position * (isMobile ? 200 : 340);

                return (
                  <div
                    key={member.id}
                    className="absolute transition-all duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      filter: `blur(${blur}px)`,
                      pointerEvents: isCenterCard ? "auto" : "none",
                    }}
                  >
                    {!isCenterCard && (
                      <div
                        onClick={() => handleCardClick(member.index)}
                        className="absolute inset-0 z-50 cursor-pointer"
                        style={{ pointerEvents: "auto" }}
                        aria-label={`Focus on ${member.name}`}
                      />
                    )}
                    <ProfileCard
                      name={member.name}
                      role={member.role}
                      image={member.image}
                      borderClass={member.borderClass}
                      bgGradientClass={member.bgGradientClass}
                      accentClass={member.accentClass}
                      backContent={member.backContent}
                      socialLinks={member.socialLinks}
                      theme={member.theme}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-base-content/30 hover:bg-base-content/50"
                }`}
                aria-label={`Go to team member ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>

          {/* Mobile instruction hint */}
          {isMobile && (
            <p className="text-center text-base-content/50 text-sm mt-4 animate-pulse">
              👈 Swipe to explore team members 👉
            </p>
          )}
        </div>
      </div>
      <style>{`
      @keyframes gradient {
              0 %, 100 % { background- position: 0% 50%; }
            50% {background - position: 100% 50%; }
      }

            .animate-gradient {
              background - size: 200% 200%;
            animation: gradient 3s ease infinite;
      }

            /* Prevent the nav buttons from shifting when clicked */
            .btn.btn-circle:active {
              transform: translateY(-50%) !important;
      }
    `}</style>
    </section>
  );
}
