import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-base-content/70 bg-base-100 mb-4 p-10 md:p-16 w-full transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none mb-6"></div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-12">
        {/* About Section */}
        <div className="flex flex-col gap-5">
          <h3 className="text-base-content font-semibold text-xl">
            Cyber Nexus
          </h3>
          <p className="text-base-content/70 leading-relaxed">
            Empowering creativity and innovation through technology. Join our
            community to explore, learn, and build amazing projects together.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-base-content font-semibold text-xl mb-4">
            Contact
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:+213555123456"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="phone">
                  📞
                </span>{" "}
                +213 555 123 456
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@ClubNexus.com"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="mail">
                  ✉️
                </span>{" "}
                contact@ClubNexus.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="location">
                📍
              </span>{" "}
              Tiaret, Algeria
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-base-content font-semibold text-xl mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/team" className="hover:text-primary transition-colors">
                Team
              </a>
            </li>
            <li>
              <a
                href="/events"
                className="hover:text-primary transition-colors"
              >
                Events
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-primary transition-colors">
                Blogs
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="hover:text-primary transition-colors"
              >
                Projects
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-base-content font-semibold text-xl mb-4">
            Follow Us
          </h3>
          <ul className="space-y-3">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="instagram">
                  📸
                </span>{" "}
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="linkedin">
                  💼
                </span>{" "}
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span role="img" aria-label="facebook">
                  👥
                </span>{" "}
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-px w-full bg-base-content/20 mb-6 mt-6"></div>

      {/* Bottom Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/60">
        <div>© {currentYear} Cyber Nexus. All rights reserved.</div>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
