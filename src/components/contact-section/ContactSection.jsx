import React, { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

      // Animate form container
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
          x: -50,
          duration: 1,
        });
      }

      // Animate map container
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
          x: 50,
          duration: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className=" mb-12 px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content text-center">
            Get In
            <span className=" ml-5 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mt-10 text-center">
            Interested in partnering with CYBERNEXUS? We welcome collaborations
            with companies and organizations looking to support tech innovation
            and student development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <div
            ref={formContainerRef}
            className="bg-accent rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-base-content mb-6">
              Send us a message
            </h3>

            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base-content font-medium mb-2"
                >
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-base-100 border-2 border-base-content/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-base-content"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-base-content font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us what you're interested in..."
                  className="w-full px-4 py-3 bg-base-100 border-2 border-base-content/10 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none text-base-content"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.email || !formData.message}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="bg-success/10 border-2 border-success text-success px-4 py-3 rounded-xl text-center font-medium">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapContainerRef}
            className="bg-accent rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-base-content mb-6">
              Our Location
            </h3>

            <div className="mb-4 flex items-start gap-3 text-base-content/80">
              <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-base-content">
                  Ibn Khaldoun University
                </p>
                <p>Faculty of Mathematics and Computer Science (FMI)</p>
                <p>Tiaret, Algeria</p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden border-2 border-base-content/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.4522640683!2d1.3209439433091803!3d35.350471531917535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1286d1b08df59eab%3A0xd7ba2589aab1d516!2z2YPZhNmK2Kkg2KfZhNix2YrYp9i22YrYp9iqINmIINin2YTYp9i52YTYp9mFINin2YTYotmE2Yo!5e0!3m2!1sen!2sdz!4v1762766791505!5m2!1sen!2sdz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ibn Khaldoun University Tiaret Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

<div className=" mb-12 px-4">
  <h2 className="text-4xl font-bold text-base-content mb-4">Get In Touch</h2>
  <p className=" text-lg text-start text-content/70  ">
    Interested in partnering with CYBERNEXUS? We welcome collaborations with
    companies and organizations looking to support tech innovation and student
    development.
  </p>
</div>;
