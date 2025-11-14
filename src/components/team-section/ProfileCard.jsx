import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Mail, Briefcase } from "lucide-react";
import gsap from "gsap";

export default function ProfileCard({
  name,
  role,
  image,
  socialLinks = null,
  backContent = null,
  borderClass = "border-base-200",
  bgGradientClass = "from-white/5 to-base-300",
  accentClass = "text-base-content",
  roleColor = "text-white/70",
  flipAngle = 180,
}) {
  const cardRef = useRef(null);
  const rotationRef = useRef({ y: 0 });
  const baseRotationRef = useRef(0);
  const currentTweenRef = useRef(null);
  const isFlipping = useRef(false);

  const [flipped, setFlipped] = useState(false);

  const defaultSocialLinks = [
    { icon: Github, label: "GitHub", href: "#", platform: "github" },
    { icon: Linkedin, label: "LinkedIn", href: "#", platform: "linkedin" },
    { icon: Twitter, label: "Twitter", href: "#", platform: "twitter" },
    { icon: Briefcase, label: "Portfolio", href: "#", platform: "portfolio" },
    { icon: Mail, label: "Email", href: "#", platform: "email" },
  ];

  const links = (socialLinks || defaultSocialLinks).filter(
    (link) => link && link.href && link.href.trim() !== "" && link.href !== "#",
  );

  const linkCount = links.length;
  const maxTiltY = 15;

  // keep platform hover helpers if you want tint-on-hover later
  const getPlatformHoverClass = (platform) => {
    const hoverColors = {
      github: "hover:text-white",
      linkedin: "hover:text-white",
      twitter: "hover:text-white",
      portfolio: "hover:text-white",
      email: "hover:text-white",
    };
    return hoverColors[platform] || "hover:text-white";
  };

  // THE NEW, CONSISTENT THEME-AWARE CLASSES
  // This area always adapts to the DaisyUI/ Tailwind theme (base-100 / base-content)
  const LINKS_WRAPPER_CLASS =
    "mt-3 rounded-2xl px-3 sm:px-4 py-2 flex items-center justify-center gap-2 sm:gap-3 " +
    // theme-aware panel: uses base-100 so it changes with the theme
    // opacity + backdrop blur keep it legible over card artwork
    "bg-base-100/80 backdrop-blur-sm border border-base-content/10";

  const LINK_BUTTON_CLASS =
    // the buttons use text-base-content so icons inherit theme text color
    // subtle border keeps shape; scale on hover for a tactile feel
    "p-1.5 sm:p-2 rounded-lg inline-flex items-center justify-center text-base-content transition-all duration-200 border border-base-content/6 hover:scale-105";

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const normalizedX = (x - centerX) / centerX;
    const tiltY = normalizedX * maxTiltY;
    rotationRef.current.y = tiltY;

    const target = baseRotationRef.current + tiltY;
    gsap.to(card, {
      duration: isFlipping.current ? 0 : 0.25,
      rotationY: target,
      transformPerspective: 1000,
      transformOrigin: "center",
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    rotationRef.current.y = 0;
    gsap.to(card, {
      duration: 0.4,
      rotationY: baseRotationRef.current,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleClick = () => {
    const card = cardRef.current;
    if (!card) return;

    if (isFlipping.current && currentTweenRef.current) {
      currentTweenRef.current.kill();
    }

    isFlipping.current = true;

    const tiltY = rotationRef.current.y;
    const direction = Math.sign(tiltY) || 1;

    baseRotationRef.current += flipAngle * direction;

    currentTweenRef.current = gsap.to(card, {
      duration: 0.6,
      rotationY: baseRotationRef.current,
      transformPerspective: 1000,
      transformOrigin: "center",
      ease: "back.out(1.2)",
      overwrite: "auto",
      onComplete: () => {
        const halfTurns = Math.round(baseRotationRef.current / 180);
        setFlipped(Math.abs(halfTurns % 2) === 1);
        currentTweenRef.current = null;
        isFlipping.current = false;
      },
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      aria-pressed={flipped}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      }}
      className={`relative w-64 sm:w-72 md:w-80 h-[480px] sm:h-[520px] md:h-[560px] rounded-3xl bg-gradient-to-b ${bgGradientClass} p-6 text-center border ${borderClass} cursor-pointer shadow-2xl hover:shadow-3xl transition-shadow duration-300`}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        perspective: 1000,
      }}
    >
      {/* FRONT FACE */}
      <div
        className="rounded-3xl w-full h-full flex flex-col overflow-hidden"
        style={{
          position: "relative",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(0deg)",
        }}
      >
        <div className="mb-3">
          <h2 className={`text-xl sm:text-2xl font-bold ${accentClass}`}>
            {name}
          </h2>

          <div className={LINKS_WRAPPER_CLASS}>
            <p className={`text-xs sm:text-sm mt-1`}>{role}</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative min-h-0">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={`${name} profile`}
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* NEW: consistent, theme-aware links wrapper */}
        {links.length > 0 && (
          <div className={LINKS_WRAPPER_CLASS}>
            {links.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={`${social.label}-${index}`}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`${LINK_BUTTON_CLASS} ${getPlatformHoverClass(
                    social.platform,
                  )}`}
                  title={social.label}
                >
                  {/* Lucide icons use currentColor, so they inherit text-base-content */}
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* BACK FACE */}
      <div
        className="rounded-3xl w-full h-full overflow-hidden"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        {backContent ? (
          backContent
        ) : (
          <div className="text-center w-full flex flex-col items-center">
            <h3 className={`text-lg font-semibold ${accentClass}`}>
              More about {name}
            </h3>
            <p className={`text-xs sm:text-sm ${roleColor} my-2`}>{role}</p>
            {linkCount > 0 && (
              <div className={LINKS_WRAPPER_CLASS}>
                {links.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={`${social.label}-back-${index}`}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`${LINK_BUTTON_CLASS} ${getPlatformHoverClass(
                        social.platform,
                      )}`}
                      title={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
