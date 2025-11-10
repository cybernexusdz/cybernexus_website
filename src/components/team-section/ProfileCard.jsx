import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function ProfileCard({ name, role, image, socialLinks }) {
  const defaultSocialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
  ];

  const links = socialLinks || defaultSocialLinks;

  return (
    <div className="relative w-64 sm:w-72 md:w-80 rounded-3xl bg-gradient-to-b from-white/5 to-base-300 p-6 sm:p-6 sm:pb-0 pb-0 text-center hover:shadow-2xl transition-all duration-300 border border-base-200 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Name and Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-base-content">
        {name}
      </h2>
      <p className="text-xs sm:text-sm text-base-content/70 mb-4 sm:mb-6">
        {role}
      </p>

      {/* Profile Image */}
      <div className="flex justify-center relative">
        <img
          src={image}
          alt="Profile"
          className="w-auto h-72 sm:h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-300/30 to-transparent" />
      </div>

      {/* Bottom Contact Bar */}
      <div className="absolute bottom-0 left-0 right-0 mb-2 mx-4 sm:mx-8 md:mx-10 rounded-2xl border border-white/5 h-12 sm:h-14 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-md bg-gradient-to-t from-base-300/20 to-transparent px-3 sm:px-6">
        {/* Social Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-primary text-base-content hover:text-white transition-all duration-200 border border-white/10"
              >
                <Icon size={20} className="sm:w-[18px] sm:h-[18px]" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
