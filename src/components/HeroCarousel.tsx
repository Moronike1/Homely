// src/components/HeroCarousel.tsx
import { useEffect, useRef, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

const heroImages = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1920&q=80',
  '../assets/Homely Banner.png'
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
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on('select', onSelect);
      onSelect();
      autoplay();

      return () => {
        if (autoplayInterval.current) clearInterval(autoplayInterval.current);
      };
    }
  }, [emblaApi, autoplay]);

  return (
    <div className="relative w-screen h-[80vh] w-full overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className="min-w-full h-full relative bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
              <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4">
                Find Your Dream Home with <span className="text-blue-300">Homely</span>
              </motion.h1>
              <p className="text-lg md:text-2xl mb-6">
                Explore properties for rent, sale, and lease with ease.
              </p>
              <div className="flex gap-4">
               <a href="#hero-section" className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
>
  Get Started
</a>
                <a href="#features" className="px-6 py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === selectedIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}