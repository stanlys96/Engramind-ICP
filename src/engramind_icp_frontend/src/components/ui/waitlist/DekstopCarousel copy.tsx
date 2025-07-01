import Image from 'next/image';
import React from 'react';

export const DesktopCarouselSlide = ({
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
  <div className="hidden relative md:flex flex-col justify-center items-center mt-12">
    {/* Image  */}
    <div className="w-full flex justify-center items-center h-[350px] relative">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="Engramind Background"
          width={300}
          height={300}
          className={`absolute object-contain transition-opacity duration-300 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === currentIndex}
        />
      ))}
    </div>

    {/* Title and Description */}
    <div className="relative z-10 lg:px-12 text-center flex justify-center items-center mx-auto container flex-col mt-12 ">
      <h2 className="text-base sm:text-lg md:text-2xl text-purple-600 font-semibold">
        {imageCaptions[currentIndex].title}
      </h2>
      <p className="text-base md:text-lg dark:text-zinc-200 text-zinc-800 leading-relaxed">
        {imageCaptions[currentIndex].subtitle}
      </p>
    </div>

    {/* Button  */}
    <div className="flex justify-center mt-8 space-x-2">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full cursor-pointer ${
            index === currentIndex ? 'bg-purple-600' : 'bg-gray-400'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
);
