import CountdownToNov18 from "./CountdownToNov18";

const HeroSection = () => {
  return (
    <section className="mt-[calc(4rem+5rem)] min-h-screen flex flex-col justify-center items-center text-center px-6 bg-base-100 text-base-content transition-all duration-500">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
        Empowering Future <br className="hidden sm:block" /> Tech Leaders
      </h2>

      {/* Subtitle */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-2">
        CYBERNEXUS
      </h3>

      {/* Motto */}
      <p className="uppercase tracking-widest text-sm sm:text-base text-secondary mb-8">
        Ambition · Discipline · Passion
      </p>
      <CountdownToNov18 />
      {/* CTA button */}
      <button className="btn btn-primary text-base-100 hover:scale-105 transition-transform">
        Join Us →
      </button>
    </section>
  );
};

export default HeroSection;
