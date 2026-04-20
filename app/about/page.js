'use client';
import { motion } from 'framer-motion';
import { FiUsers, FiPackage, FiGlobe, FiZap, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const milestones = [
  { year: '2024 Q1', title: 'UI Hut Founded', desc: 'Started with 10 free components and a mission to help developers ship faster.' },
  { year: '2024 Q2', title: '100 Components', desc: 'Crossed 100 production-ready components, serving 1,000+ developers worldwide.' },
  { year: '2024 Q3', title: 'Pro Plan Launch', desc: 'Launched the Pro subscription with unlimited access and priority support.' },
  { year: '2024 Q4', title: '10K+ Developers', desc: 'Over 10,000 developers from 50+ countries now use UI Hut in their projects.' },
];

const team = [
  { name: 'Arjun Verma', role: 'Founder & Lead Developer', avatar: 'A', desc: 'Full-stack dev with 8+ years building SaaS products.' },
  { name: 'Sneha Patel', role: 'UI/UX Designer', avatar: 'S', desc: 'Designer passionate about accessible, beautiful interfaces.' },
  { name: 'Karan Joshi', role: 'Component Engineer', avatar: 'K', desc: 'React specialist who ensures every component is pixel-perfect.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen mesh-bg pb-20">
      {/* Hero */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-6 border border-[var(--primary)]/20">
              🏠 About UI Hut
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[var(--text)] mb-6 leading-tight">
              Our Mission: <span className="gradient-text">Empower</span> Every Developer
            </h1>
            <p className="text-xl text-[var(--text-muted)] leading-relaxed">
              Founded in 2024, UI Hut was born from a simple observation: developers spend too much time rebuilding the same UI components over and over again. We're here to fix that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FiUsers, value: '10K+', label: 'Developers', color: '#6366f1' },
              { icon: FiPackage, value: '200+', label: 'Components', color: '#f59e0b' },
              { icon: FiGlobe, value: '50+', label: 'Countries', color: '#10b981' },
              { icon: FiZap, value: '1M+', label: 'Hours Saved', color: '#ec4899' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center hover:shadow-[var(--shadow)] transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${stat.color}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text)]">{stat.value}</div>
                <div className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-extrabold text-3xl text-[var(--text)] mb-5">The Problem We're Solving</h2>
              <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
                <p>Every developer knows the feeling. You start a new project, and before you can even think about the unique features that make your product special, you need to build yet another navigation bar, another modal dialog, another data table.</p>
                <p>These essential components are the building blocks of every web application, yet they consume countless hours of development time. According to industry research, developers spend approximately <span className="text-[var(--primary)] font-semibold">30-40% of their time</span> on repetitive UI work that could be easily templated and reused.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-extrabold text-3xl text-[var(--text)] mb-5">Our Solution</h2>
              <div className="space-y-4 text-[var(--text-muted)] leading-relaxed">
                <p>UI Hut provides a curated marketplace of production-ready UI components. Every component in our library is built with best practices, thoroughly tested across browsers, and optimized for performance.</p>
                <p>We don't just sell code; we sell <span className="text-[var(--primary)] font-semibold">confidence</span>. When you purchase a component from UI Hut, you're getting something reviewed by experienced developers, battle-tested in real applications, with comprehensive documentation and lifetime support.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-[var(--surface)]">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl text-[var(--text)] text-center mb-10"
          >
            Our <span className="gradient-text">Journey</span>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border)]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6 pl-14"
                >
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-[var(--primary)] bg-[var(--bg)]" style={{ transform: 'translateX(-50%)' }} />
                  <div>
                    <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">{m.year}</span>
                    <h3 className="font-display font-bold text-lg text-[var(--text)] mt-1 mb-1">{m.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-extrabold text-3xl text-[var(--text)] text-center mb-10"
          >
            Meet the <span className="gradient-text">Team</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center hover:shadow-[var(--shadow)] transition-all group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-bold text-white mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                >
                  {member.avatar}
                </div>
                <h3 className="font-display font-bold text-[var(--text)] mb-1">{member.name}</h3>
                <p className="text-xs text-[var(--primary)] font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
          >
            <h2 className="font-display font-extrabold text-3xl text-white mb-4">Join Our Community</h2>
            <p className="text-white/80 mb-6">Over 10,000 developers trust UI Hut. Start building better products, faster.</p>
            <Link href="/components" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[var(--primary-dark)] rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105">
              Get Started Today <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}