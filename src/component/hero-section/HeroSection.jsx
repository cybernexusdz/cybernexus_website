import CountdownToNov18 from "./CountdownToNov18";

const HeroSection = () => {
  return (
    <section className="min-h-screen mt-10 flex flex-col justify-center items-center text-center px-6 bg-base-100 text-base-content transition-all duration-500">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl flex flex-col gap-4 md:text-6xl font-bold mb-4 ">
        <span>Empowering Future</span>{" "}
        <span>Tech Leaders</span>
      </h2>

      {/* Description */}
      <p className="max-w-xl text-base sm:text-lg md:text-xl text-gray-600 mb-8">
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
