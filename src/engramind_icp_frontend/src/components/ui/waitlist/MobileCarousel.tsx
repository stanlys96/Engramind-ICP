import React from "react";

export const MobileCarouselSlide = ({
  images,
  imageCaptions,
  currentIndex,
  setCurrentIndex,
}: {
  images: string[];
  imageCaptions: { title: string; subtitle: string }[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => (
  <div className="relative inset-0 flex flex-col items-center justify-start text-center text-white z-20 px-4 pt-18 pb-10 md:hidden">
    <div className="w-full flex justify-center items-center mb-8 h-[250px] relative">
      <img
        src={images[currentIndex]}
        alt="Engramind Mobile Background"
        width={250}
        height={250}
        className="mb-6"
      />
    </div>

    <h2 className="text-2xl text-purple-600 font-semibold mb-2">
      {imageCaptions[currentIndex].title}
    </h2>
    <p className="text-base font-medium text-neutral-700 dark:text-neutral-300 mb-6 px-4">
      {imageCaptions[currentIndex].subtitle}
    </p>
    <div className="flex justify-center mb-12 space-x-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full cursor-pointer ${
            index === currentIndex ? "bg-purple-600" : "bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
    <button
      onClick={() =>
        document
          .getElementById("waitlist-form")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-purple-600 font-medium leading-relaxed text-white text-sm px-6 py-2 rounded-md shadow-md"
    >
      Join the Waitlist
    </button>
  </div>
);
