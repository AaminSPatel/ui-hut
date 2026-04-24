"use client"; // Next.js App Router ke liye zaroori

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Play } from 'lucide-react';

// Mock Data (Thoda zyada data takis stack dikhe)
const MOVIES = [
  { id: 1, title: 'The Mandalorian', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop' },
  { id: 2, title: 'Loki', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop' },
  { id: 3, title: 'Black Widow', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=500&auto=format&fit=crop' },
  { id: 4, title: 'WandaVision', image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=500&auto=format&fit=crop' },
  { id: 5, title: 'Iron Man', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop' },
  { id: 6, title: 'Iron Man', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop' },
  { id: 7, title: 'Iron Man', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=500&auto=format&fit=crop' },
];

export default function HotstarCarouselV2() {
  const [index, setIndex] = useState(0);

  // Requirement 1: Double Speed Swipe Logic
  const handleDragEnd = (event, info) => {
    // Velocity aur offset dono check karte hain fast swipe ke liye
    const swipeThreshold = 50; 
    const velocityThreshold = 500; // Fast swipe detect karne ke liye

    if (
      (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) &&
      index < MOVIES.length - 1
    ) {
      setIndex(index + 1);
    } else if (
      (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) &&
      index > 0
    ) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative h-[650px] w-full flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      
      {/* Carousel Container */}
      <div className="relative w-full max-w-[380px] h-[520px] flex items-center justify-center">
        <AnimatePresence initial={false}>
          {MOVIES.map((movie, i) => {
            const distanceFromCenter = i - index;
            const isCenter = i === index;
            const isLeft = i < index;
            const isRight = i > index;

            // Optimisation: Sirf center, 1 left, aur 3 right slides render karein
            if (distanceFromCenter < -1 || distanceFromCenter > 3) return null;

            // --- Calculation Logic for Asymmetric View ---
            
            // Default values
            let xPosition = 0;
            let scale = 1;
            let zIndex = 10 - Math.abs(distanceFromCenter);
            let brightness = 100;

            if (isCenter) {
              xPosition = 0;
              scale = 1;
              zIndex = 10;
              brightness = 100;
            } 
            // Requirement 2: Left Slide Logic (Same size, minimal peek)
            else if (isLeft) {
              xPosition = -330; // Slide ko bahar push karein takis thodi si dikhe
              scale = 1;        // Center jaisi hi badi rahegi
              zIndex = 9;       // Center ke just pichhe
              brightness = 60;  // Kafi dark
            }
            // Requirement 3: Right Stack Logic (3 slides getting smaller)
            else if (isRight) {
              // Har slide ke liye x gap kam hota jayega (tight stack)
              // Stack base position + (index base multiplication)
              const rightSpacing = 40; // Base gap between stacked slides
              xPosition = 230 + (distanceFromCenter - 1) * rightSpacing; 
              
              // Scale dheere-dheere kam hoga: Right1=0.85, Right2=0.75, Right3=0.65
              scale = 0.95 - (distanceFromCenter * 0.1); 
              
              // Darkness badhti jayegi
              brightness = 80 - (distanceFromCenter * 15);
            }

            return (
              <motion.div
                key={movie.id}
                drag="x"
                // Constraints restrict drag unwanted movement
                dragConstraints={{ left: 0, right: 0 }}
                // Requirement 1: dragElastic makes it feel responsive/fast
                dragElastic={0.7} 
                onDragEnd={handleDragEnd}
                
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: xPosition,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: 1,
                  filter: `brightness(${brightness}%)`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400, // Higher stiffness for fast snap
                  damping: 35,    // Smooth settling
                  mass: 0.8
                }}
                // Mobile device width management
                className="absolute w-[80%] aspect-[3/4] cursor-grab active:cursor-grabbing origin-center"
                style={{
                  // Perspective ensures smooth 3D-like scaling
                  perspective: '1000px'
                }}
              >
                {/* Poster Card UI */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.5)] border border-white/5 bg-gray-900">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />

                  {/* Gradient & Buttons (Only for Center) */}
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />

                        {/* Action Buttons */}
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="absolute bottom-6 right-5 flex flex-col items-center gap-3"
                        >
                          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white/20 transition-colors">
                            <Plus size={20} />
                          </button>
                          
                          <button className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-2xl hover:scale-105 transition-transform">
                            <Play size={32} fill="currentColor" className="ml-1.5" />
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Dots (Optional, moved down) */}
      <div className="absolute bottom-12 flex gap-1.5">
        {MOVIES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}