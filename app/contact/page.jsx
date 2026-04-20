'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageCircle, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = {
  style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
};

export default function ContactPage() {
  const { config } = useSite();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSubmitting(false);
    toast.success('Message sent! We\'ll reply within 24 hours.', toastStyle);
  };

  const contactItems = [
    { icon: FiMail, title: 'Email', value: config.contact.email, color: '#6366f1', href: `mailto:${config.contact.email}` },
    { icon: FiPhone, title: 'Phone', value: config.contact.phone, color: '#10b981', href: `tel:${config.contact.phone}` },
    { icon: FiMapPin, title: 'Office', value: config.contact.address, color: '#f59e0b', href: '#' },
    { icon: FiClock, title: 'Business Hours', value: 'Mon–Fri: 9AM–6PM IST', color: '#8b5cf6', href: '#' },
  ];

  return (
    <div className="min-h-screen mesh-bg pb-20 pt-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-4 border border-[var(--primary)]/20">
            ✉️ Get in Touch
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text)] mb-4">
            We'd love to <span className="gradient-text">hear from you</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Have questions about our components? Need help with integration? Our support team typically responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:shadow-[var(--shadow)] hover:border-[var(--primary)]/30 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${item.color}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-0.5">{item.title}</p>
                  <p className="font-medium text-[var(--text)]">{item.value}</p>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-2xl border border-green-500/30 bg-green-500/10"
            >
              <div className="flex items-center gap-3">
                <FiMessageCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-[var(--text-muted)] mb-0.5">Need a quick answer?</p>
                  <a
                    href={`https://wa.me/${config.contact.whatsapp}`}
                    className="font-bold text-green-500 hover:text-green-400 transition-colors flex items-center gap-1"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-[var(--shadow)]"
          >
            <h2 className="font-display font-bold text-2xl text-[var(--text)] mb-6">Send Us a Message</h2>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-[var(--success)]/15 flex items-center justify-center mb-5">
                  <FiCheck className="w-10 h-10 text-[var(--success)]" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[var(--text)] mb-3">Message Sent!</h3>
                <p className="text-[var(--text-muted)] mb-6">We've received your message and will get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="btn-ghost"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Your Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-custom" placeholder="Rahul Sharma" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Email Address *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-custom" placeholder="rahul@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Subject *</label>
                  <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-custom" placeholder="Question about a component..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-custom resize-none" placeholder="Tell us how we can help you..." />
                </div>
                <button type="submit" disabled={submitting} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><FiSend className="w-4 h-4" /> Send Message</>
                  )}
                </button>
                <p className="text-xs text-[var(--text-subtle)] text-center">
                  By submitting, you agree to our privacy policy. We'll never share your information.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}