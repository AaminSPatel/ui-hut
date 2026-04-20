'use client';
import Link from 'next/link';
import { useSite } from '@/context/SiteContext';
import { FiMail, FiPhone, FiMapPin, FiTwitter, FiGithub, FiLinkedin, FiInstagram, FiArrowUpRight } from 'react-icons/fi';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Components', href: '/components' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Refund Policy', href: '#' },
];

export default function Footer() {
  const { config } = useSite();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <span className="text-xl font-display font-bold gradient-text">{config.brandName}</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
              Premium UI components for modern web development. Save time, build faster, ship better.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FiTwitter, href: config.socialLinks.twitter, label: 'Twitter' },
                { icon: FiGithub, href: config.socialLinks.github, label: 'GitHub' },
                { icon: FiLinkedin, href: config.socialLinks.linkedin, label: 'LinkedIn' },
                { icon: FiInstagram, href: config.socialLinks.instagram, label: 'Instagram' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="p-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all hover:scale-110"
                  title={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-[var(--text)] mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors group"
                  >
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-[var(--text)] mb-4">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: FiMail, value: config.contact.email },
                { icon: FiPhone, value: config.contact.phone },
                { icon: FiMapPin, value: config.contact.address },
              ].map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                  <c.icon className="w-4 h-4 mt-0.5 text-[var(--primary)] flex-shrink-0" />
                  <span>{c.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-[var(--text)] mb-4">Stay Updated</h4>
            <p className="text-sm text-[var(--text-muted)] mb-4">Get new components and updates directly in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-custom flex-1 text-sm py-2"
              />
              <button className="btn-primary py-2 px-4 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <div className="mt-4 space-y-1">
              {legalLinks.map((l) => (
                <Link key={l.name} href={l.href} className="block text-xs text-[var(--text-subtle)] hover:text-[var(--text-muted)] transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © 2024 <span className="text-[var(--primary)] font-semibold">{config.brandName}</span>. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-subtle)]">
            Built with ❤️ for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}