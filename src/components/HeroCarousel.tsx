// src/components/HeroCarousel.tsx
import { useEffect, useRef, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1920&q=80",
  "../assets/Homely Banner.png",
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    autoplayInterval.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      onSelect();
      autoplay();

      return () => {
        if (autoplayInterval.current) clearInterval(autoplayInterval.current);
      };
    }
  }, [emblaApi, autoplay]);

  return (
    <div
      className="relative w-screen h-[85vh] overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex h-full">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className="min-w-full h-full relative bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              >
                Find Your Dream Home with{" "}
                <span className="text-emerald-400">Homely</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg md:text-2xl mb-8 max-w-2xl"
              >
                Explore the best properties for rent, sale, and lease across
                Nigeria — all in one place.
              </motion.p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#featured"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Get Started
                </a>
                <a
                  href="#services"
                  className="px-6 py-3 border border-emerald-500 text-emerald-500 font-semibold rounded-lg hover:bg-emerald-50 transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-white scale-125"
                : "bg-gray-400 hover:bg-white/80"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
