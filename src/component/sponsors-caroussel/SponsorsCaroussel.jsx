import { useEffect } from "react";

const sponsors = [
  {
    id: 1,
    name: "Futuro",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
  },
  {
    id: 1,
    name: "Futuro",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
  },
  {
    id: 1,
    name: "Futuro",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
  },
];

export default function SponsorsCaroussel() {
  useEffect(() => {
    // Get theme from localStorage (set by GenderContext)
    const theme = localStorage.getItem("theme") || "boyLight";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <section className="w-full py-10 bg-base-100 text-base-content transition-colors duration-300">
      <h2 className="text-center text-2xl font-bold mb-8">Our Sponsors</h2>

      <div className="overflow-hidden">
        <div className="flex animate-[scroll_20s_linear_infinite] w-[200%]">
          {sponsors.concat(sponsors).map((sponsor, i) => (
            <div
              key={i}
              className="w-1/3 md:w-1/5 flex flex-col justify-center items-center p-4"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-110"
              />
              <h1 className="mt-2 text-sm md:text-base font-medium text-secondary">
                <a href={sponsor.lien}> {sponsor.name}</a>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
