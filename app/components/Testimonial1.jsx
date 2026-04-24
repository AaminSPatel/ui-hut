"use client";
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO @ DesignCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    text: "These components saved us 300+ hours of development time. Stunning quality and perfect documentation.",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "CTO @ TechStart",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "Production-ready from day one. The glassmorphism effects are chef's kiss 👌.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Founder @ StartupX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Best investment we've made for our landing pages. Copy-paste perfection!",
    rating: 5
  }
];

export default function Testimonial1() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900/80 via-purple-900/30 to-slate-900 py-24 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-2xl mb-12 mx-auto">
          <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-white font-semibold">Trusted by 10,000+ Developers</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-16 leading-tight">
          What developers are saying
        </h2>

        {/* Main testimonial */}
        <div className="max-w-2xl mx-auto relative">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
            
            {/* Avatar & quote */}
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <img 
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-2xl"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {testimonials[current].rating === 5 ? '★' : testimonials[current].rating}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-emerald-400 mb-2">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-2xl font-semibold text-white/95 italic leading-relaxed">
                  "{testimonials[current].text}"
                </p>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-8 border-t border-white/20">
              <img 
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/40"
              />
              <div className="text-left">
                <h4 className="font-bold text-lg text-white">{testimonials[current].name}</h4>
                <p className="text-gray-400">{testimonials[current].role}</p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 scale-125 shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mt-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full shadow-lg transition-all duration-1000"
              style={{ width: `${((5000 - (5000 % 5000)) / 5000) * 100}%` }}
            />
          </div>
        </div>

        {/* All testimonials carousel preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {testimonials.slice(1).map(testimonial => (
            <div key={testimonial.id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/10 hover:scale-105 transition-all">
              <p className="text-gray-300 italic mb-4 line-clamp-3">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-xl" />
                <div>
                  <h5 className="font-semibold text-white text-sm">{testimonial.name}</h5>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Demo
export function Testimonial1Demo() {
  return <Testimonial1 />;
}

