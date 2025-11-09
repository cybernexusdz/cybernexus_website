import { useEffect, useState } from "react";

export default function CountdownToNov18() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      let targetDate = new Date(currentYear, 10, 18); // November 18

      // If November 18 has passed, count to next year
      if (today > targetDate) {
        targetDate = new Date(currentYear + 1, 10, 18);
      }

      const diffTime = targetDate - today;

      // Calculate time units
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
      const seconds = Math.floor((diffTime / 1000) % 60);

      setDaysLeft(days);
      setHoursLeft(hours);
      setMinutesLeft(minutes);
      setSecondsLeft(seconds);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center  bg-base-100 text-base-content p-6 rounded-2xl  transition-all duration-300">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md text-center">
        <div className="bg-accent text-base-content rounded-xl p-4 shadow-md">
          <p className="text-3xl font-bold">{daysLeft}</p>
          <p className="text-sm font-semibold opacity-75">Days</p>
        </div>
        <div className="bg-accent text-base-content rounded-xl p-4 shadow-md">
          <p className="text-3xl font-bold">{hoursLeft}</p>
          <p className="text-sm font-semibold opacity-75">Hours</p>
        </div>
        <div className="bg-accent text-base-content rounded-xl p-4 shadow-md">
          <p className="text-3xl font-bold">{minutesLeft}</p>
          <p className="text-sm font-semibold opacity-75">Minutes</p>
        </div>
        <div className="bg-accent text-base-content rounded-xl p-4 shadow-md">
          <p className="text-3xl font-bold">{secondsLeft}</p>
          <p className="text-sm font-semibold opacity-75">Seconds</p>
        </div>
      </div>

      <p className="mt-6 text-sm md:text-base opacity-80 text-center">
        Target Date: <span className="font-semibold">18 November</span>
      </p>
    </div>
  );
}
