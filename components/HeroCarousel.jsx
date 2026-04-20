'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import carouselData from '@/data/carousel.json';

const stats = [
  { value: '10K+', label: 'Developers' },
  { value: '200+', label: 'Components' },
  { value: '50+', label: 'Countries' },
  { value: '4.9★', label: 'Rating' },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const slides = carouselData.slides;

  useEffect(() => {
    if (!carouselData.autoPlay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, carouselData.interval);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentIndex];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section className="relative h-[560px] md:h-[640px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated blobs */}
          <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30"
                >
                  <span className="w-2 h-2 bg-white rounded-full pulse-dot" />
                  Premium Components
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-display font-extrabold text-white leading-tight mb-4"
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href={slide.buttonHref}
                    className="group flex items-center gap-2 px-7 py-3.5 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
                  >
                    {slide.buttonText}
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium border border-white/30 hover:bg-white/20 transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/25 transition-all border border-white/20 hover:scale-110 z-20"
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/25 transition-all border border-white/20 hover:scale-110 z-20"
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-0 bg-white/10 backdrop-blur-xl border-t border-white/20 rounded-t-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`px-6 py-4 text-center ${i < stats.length - 1 ? 'border-r border-white/20' : ''}`}
              >
                <div className="font-display font-extrabold text-xl text-white">{stat.value}</div>
                <div className="text-xs text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}