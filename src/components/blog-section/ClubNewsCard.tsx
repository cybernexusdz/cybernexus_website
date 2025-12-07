import { memo } from "react";
import { Calendar, MapPin, Users } from "lucide-react";

interface ClubNewsCardProps {
  onHover: (cardId: string | null) => void;
  clubNewsRef: React.RefObject<HTMLDivElement>;
  openDayImage: string;
}

const ClubNewsCard = memo<ClubNewsCardProps>(
  ({ onHover, clubNewsRef, openDayImage }) => {
    return (
      <div ref={clubNewsRef} className="mb-16 lg:mb-20">
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => onHover("clubNews")}
          onMouseLeave={() => onHover(null)}
        >
          {/* Gradient border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />

          <div className="relative bg-base-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent z-10 lg:bg-gradient-to-r lg:from-base-100 lg:to-transparent" />
                <img
                  src={openDayImage}
                  alt="CYBERNEXUS Open Day"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />

                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-primary text-primary-content px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Featured Event
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
                  <div className="w-8 h-0.5 bg-primary" />
                  Upcoming Event
                </div>

                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-base-content mb-4 leading-tight">
                  CYBERNEXUS Open Day
                </h3>

                <p className="text-base-content/70 text-base lg:text-lg mb-6 leading-relaxed">
                  Join us for an exciting open day event showcasing the latest
                  in tech innovation and student development. Connect with
                  fellow tech enthusiasts and explore opportunities.
                </p>

                {/* Event Details */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3 text-base-content/60">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm">Date: Coming Soon</span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/60">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm">Location: TBA</span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/60">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">Open to All Students</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-content rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 group/btn w-full sm:w-auto">
                  Learn More
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ClubNewsCard.displayName = "ClubNewsCard";

export default ClubNewsCard;
