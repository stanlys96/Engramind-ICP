import React from "react";

type ProgressBarProps = {
  value: number;
  className: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
}) => {
  return (
    <div
      className={`${className} w-full dark:bg-[#3F3F46] bg-[#E4E4E7] rounded-full h-[0.5rem] shadow-inner`}
    >
      <div
        className="dark:bg-[#A1A1AA] bg-[#52525B] h-full rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
};
