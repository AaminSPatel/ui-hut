'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import ComponentCard from '@/components/ComponentCard';
import { useSite } from '@/context/SiteContext';
import componentsData from '@/data/components.json';
import { FiTrendingUp, FiShield, FiZap, FiUsers, FiCode, FiDownload, FiArrowRight, FiCheck } from 'react-icons/fi';

const features = [
  { icon: FiZap, title: 'Lightning Fast', desc: 'Save 1000+ hours with our pre-built, production-ready components.', color: '#f59e0b' },
  { icon: FiShield, title: 'Production Ready', desc: 'Every component tested, audited for accessibility and performance.', color: '#10b981' },
  { icon: FiTrendingUp, title: 'Always Updated', desc: 'Monthly new components + free lifetime updates on all purchases.', color: '#6366f1' },
  { icon: FiUsers, title: 'Community Driven', desc: 'Join 10,000+ developers. Get support in our private Discord.', color: '#ec4899' },
];

const stackBadges = ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'TanStack', 'Recharts', 'Zod'];

const testimonials = [
  { name: 'Aditya Kumar', role: 'Frontend Engineer', text: 'UI Hut saved us 3 weeks of development time. The components are incredibly well-made.', avatar: 'A' },
  { name: 'Priya Singh', role: 'Startup Founder', text: 'Best component library I have used. Clean code, great docs, and responsive support.', avatar: 'P' },
  { name: 'Rohit Mehta', role: 'Full-Stack Dev', text: 'Worth every penny. I use UI Hut for every project now. Cannot imagine going back.', avatar: 'R' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const { config } = useSite();
  const featured = componentsData.slice(0, 3);

  return (
    <div className="min-h-screen mesh-bg">
      <HeroCarousel />

      {/* Tech Stack Banner */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)] py-4 overflow-hidden">
        <div className="flex gap-6 animate-none">
          <div className="flex gap-6 shrink-0">
            {[...stackBadges, ...stackBadges].map((tech, i) => (
              <span key={i} className="text-sm font-medium text-[var(--text-muted)] whitespace-nowrap flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Components */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-4 border border-[var(--primary)]/20">
              ⭐ Featured Components
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--text)] mb-4">
              Hand-picked <span className="gradient-text">Premium Components</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Battle-tested in production. Built for React & Next.js. Fully customizable.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((component) => (
              <motion.div key={component.id} variants={itemVariants}>
                <ComponentCard component={component} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link href="/components" className="inline-flex items-center gap-2 btn-primary py-3 px-8">
              View All Components <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-[var(--surface)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--text)] mb-4">
              Why Developers Love <span className="gradient-text">{config.brandName}</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
              Stop reinventing the wheel. Build amazing products faster than ever before.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface)] transition-all hover:shadow-[var(--shadow)]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${f.color}15` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-display font-bold text-[var(--text)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison / Included section */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-4 border border-[var(--accent)]/20">
                💎 What's Included
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--text)] mb-5">
                Everything you need to <span className="gradient-text-accent">ship faster</span>
              </h2>
              <div className="space-y-3">
                {[
                  'Production-ready React & Next.js components',
                  'Comprehensive documentation & examples',
                  'Lifetime free updates with every purchase',
                  'TypeScript support included',
                  'Dark & light mode out of the box',
                  'Priority email & Discord support',
                  'Cross-browser tested & accessible',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[var(--success)]/15 flex items-center justify-center flex-shrink-0">
                      <FiCheck className="w-3 h-3 text-[var(--success)]" />
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link href="/components" className="inline-flex items-center gap-2 btn-primary mt-8 py-3 px-7">
                Start Browsing <FiArrowRight />
              </Link>
            </motion.div>

            {/* Code preview card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-[var(--shadow-lg)]"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-[var(--text-muted)] ml-2 font-mono">hero-carousel.jsx</span>
              </div>
              <pre className="p-6 text-sm font-mono overflow-x-auto text-[var(--text-muted)] leading-relaxed">
                <code>{`import { HeroCarousel } from 'ui-hut';

// Just import and use!
export default function App() {
  return (
    <HeroCarousel
      slides={[
        {
          title: "Ship Faster",
          gradient: "from-indigo-600 to-purple-600",
          buttonText: "Get Started"
        }
      ]}
      autoPlay
      interval={5000}
    />
  );
}`}</code>
              </pre>
              <div className="px-6 pb-5">
                <div className="flex items-center gap-3 p-3 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-xl">
                  <FiDownload className="w-4 h-4 text-[var(--success)]" />
                  <span className="text-xs text-[var(--success)] font-medium">Install in minutes. Ship in hours.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[var(--surface)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--text)] mb-4">
              Loved by <span className="gradient-text">Developers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] hover:shadow-[var(--shadow)] transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="avatar">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--text)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark), #7c3aed)' }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4">
                Ready to build something amazing?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join 10,000+ developers. Start with our free components or unlock the full library today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/components" className="flex items-center gap-2 px-8 py-3.5 bg-white text-[var(--primary-dark)] rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                  Browse Components <FiArrowRight />
                </Link>
                <Link href="/contact" className="flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium border border-white/30 hover:bg-white/20 transition-all">
                  Contact Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}