import React from "react";

const WaterBackground = ({ children }) => {
  return (
    <div
      className="water-background w-full h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(270deg, #00b4db, #0083b0, #00b4db, #0083b0)",
        backgroundSize: "400% 400%",
        animation: "waterFlow 10s ease infinite",
      }}
    >
      {children}
    </div>
  );
};

export default WaterBackground;
