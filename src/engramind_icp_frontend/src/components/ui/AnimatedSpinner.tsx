import React from "react";

interface SpinnerProps {
  size?: number; // in pixels
  color?: string; // Tailwind color class (default: text-blue-600)
  show?: boolean;
}

export const AnimatedSpinner: React.FC<SpinnerProps> = ({
  size = 16,
  color = "text-white",
  show,
}) => {
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } animate-spin rounded-full border-2 border-t-transparent ${color}`}
      style={{ width: size, height: size }}
    />
  );
};
