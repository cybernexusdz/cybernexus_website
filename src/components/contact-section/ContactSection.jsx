import { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formContainerRef = useRef(null);
  const mapContainerRef = useRef(null);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using EmailJS
      const templateParams = {
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setSubmitStatus("success");
      setFormData({ email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");

      // Clear error message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header section
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
        });
      }

      // Animate form container - fixed for mobile
      if (formContainerRef.current) {
        gsap.from(formContainerRef.current, {
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          x: window.innerWidth > 1024 ? -50 : 0, // Only animate x on desktop
          y: window.innerWidth <= 1024 ? 30 : 0, // Animate y on mobile/tablet
          duration: 1,
        });
      }

      // Animate map container - fixed for mobile
      if (mapContainerRef.current) {
        gsap.from(mapContainerRef.current, {
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
            markers: false,
          },
          opacity: 0,
          x: window.innerWidth > 1024 ? 50 : 0, // Only animate x on desktop
          y: window.innerWidth <= 1024 ? 30 : 0, // Animate y on mobile/tablet
          duration: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 bg-base-100 overflow-hidden"
      id="Contact"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div ref={headerRef} className="mb-8 sm:mb-12 px-2 sm:px-4 w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content text-center">
            Get In
            <span
              ref={glitchRef}
              className="ml-2 sm:ml-3 lg:ml-5 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
            >
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mt-6 sm:mt-8 lg:mt-10 text-center px-2">
            Interested in partnering with CYBERNEXUS? We welcome collaborations
            with companies and organizations looking to support tech innovation
            and student development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start w-full px-2 sm:px-0">
          {/* Contact Form */}
          <div
            ref={formContainerRef}
            className="bg-accent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg w-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-4 sm:mb-6">
              Send us a message
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base-content font-medium mb-2 text-sm sm:text-base"
                >
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-base-100 border-2 border-base-content/10 rounded-lg sm:rounded-xl focus:border-primary focus:outline-none transition-colors text-base-content text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-base-content font-medium mb-2 text-sm sm:text-base"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us what you're interested in..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-base-100 border-2 border-base-content/10 rounded-lg sm:rounded-xl focus:border-primary focus:outline-none transition-colors resize-none text-base-content text-sm sm:text-base"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.email || !formData.message}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="bg-success/10 border-2 border-success text-success px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-center font-medium text-sm sm:text-base">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapContainerRef}
            className="bg-accent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg w-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-base-content mb-4 sm:mb-6">
              Our Location
            </h3>

            <div className="mb-4 flex items-start gap-3 text-base-content/80">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 text-primary flex-shrink-0" />
              <div className="text-sm sm:text-base">
                <p className="font-medium text-base-content">
                  Ibn Khaldoun University
                </p>
                <p>Faculty of Mathematics and Computer Science (FMI)</p>
                <p>Tiaret, Algeria</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-[250px] sm:h-[300px] lg:h-[400px] rounded-lg sm:rounded-xl overflow-hidden border-2 border-base-content/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.4522640683!2d1.3209439433091803!3d35.350471531917535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1286d1b08df59eab%3A0xd7ba2589aab1d516!2z2YPZhNmK2Kkg2KfZhNix2YrYp9i22YrYp9iqINmIINin2YTYp9i52YTYp9mFINin2YTYotmE2Yo!5e0!3m2!1sen!2sdz!4v1762766791505!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ibn Khaldoun University Tiaret Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
