import React from "react";

const GridBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
  );
};

export default GridBackground;
