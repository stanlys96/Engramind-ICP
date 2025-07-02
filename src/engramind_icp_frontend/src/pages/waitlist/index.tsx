"use client";

import Header from "../../components/layout/Header";
import { DesktopCarouselSlide } from "../../components/ui/waitlist/DekstopCarousel copy";
import FormSubmit from "../../components/ui/waitlist/FormSubmit";
import { MobileCarouselSlide } from "../../components/ui/waitlist/MobileCarousel";
import { useTheme } from "../../theme";
import { useEffect, useState } from "react";

export default function WaitlistPage() {
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesDark = [
    "/assets/waitlist/immortalize_dark.svg",
    "/assets/waitlist/transform_dark.png",
    "/assets/waitlist/paid_dark.svg",
  ];

  const imagesLight = [
    "/assets/waitlist/immortalize.svg",
    "/assets/waitlist/transform.png",
    "/assets/waitlist/paid.svg",
  ];
  const images = theme() === "dark" ? imagesDark : imagesLight;
  const imageCaptions = [
    {
      title: "Immortalize",
      subtitle:
        "your memories knowledge and experiences for future generations",
    },
    {
      title: "Transform",
      subtitle:
        "your knowledge & experiences into personalized virtual characters",
    },
    {
      title: "Get Paid",
      subtitle:
        "everytime people consult your virtual characters so you can do what you love",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col md:flex-row w-full overflow-hidden dark:bg-zinc-900 bg-zinc-100">
      <Header isFixed={false} />
      <div className="relative pt-4 md:py-24 max-w-6xl mx-auto container grid grid-cols-1 md:grid-cols-2 dark:bg-zinc-900 bg-zinc-100">
        {/* Image  */}
        <div className="col-span-1 relative bg-zinc-100 dark:bg-zinc-900 ">
          <div className="h-auto md:hidden mt-4">
            <MobileCarouselSlide
              images={images}
              imageCaptions={imageCaptions}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>

          <DesktopCarouselSlide
            images={images}
            imageCaptions={imageCaptions}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>

        {/* Form  */}
        <div
          id="waitlist-form"
          className="w-full flex flex-col items-end justify-end  col-span-1 bg-zinc-100 dark:bg-zinc-900"
        >
          <FormSubmit />
        </div>
      </div>
    </div>
  );
}
