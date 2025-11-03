import React from "react";

const Footer = () => {
  return (
    <footer className="bg-bgPrimary text-textSecondary py-8 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold text-textPrimary mb-2">
              Cyber Nexus
            </h2>
            <p className="text-sm text-textSecondary max-w-xs mx-auto md:mx-0">
              Empowering creativity and innovation through technology. Join our
              community to explore, learn, and build amazing projects together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors duration-200"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@ClubNexus.com</li>
              <li>Phone: +213 555 123 456</li>
              <li>Address: Tiaret, Algeria</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-accent/30 mt-8 pt-4 text-center text-sm text-textSecondary">
          © {new Date().getFullYear()} Cyber Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
