import Shuffle from "../ui/Shuffle";
import CountdownToNov18 from "./CountdownToNov18";

const HeroSection = () => {
  return (
    <section className="min-h-screen mt-10 flex flex-col justify-center items-center text-center px-6 bg-base-100 text-base-content transition-all duration-500">
      {/* Title */}
      <Shuffle
        text="Empowering"
        secondaryText="Future Tech Leaders"
        shuffleDirection="right"
        duration={0.35}
        animationMode="evenodd"
        shuffleTimes={1}
        ease="power3.out"
        stagger={0.03}
        threshold={0.1}
        loop={true}
        loopDelay={3}
        respectReducedMotion={true}
      />
      {/* Description */}
      <p className="max-w-xl text-base sm:text-lg md:text-xl text-gray-600 mb-8 mt-4">
        At CYBERNEXUS, we nurture talent and provide the tools, mentorship, and
        environment needed for aspiring tech innovators to thrive and shape the
        future of technology.
      </p>
      {/* CTA button */}
      <button className="btn btn-primary text-base-100 hover:scale-105 px-10 transition-transform">
        Join Us →
      </button>
      <CountdownToNov18 />
    </section>
  );
};

export default HeroSection;
