'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSite } from '@/context/SiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiSun, FiMoon, FiShoppingCart,
  FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiChevronDown
} from 'react-icons/fi';

export default function Header() {
  const { config, darkMode, toggleDarkMode, cartCount, setIsCartOpen, user, wishlist } = useSite();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Components', href: '/components' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-[var(--shadow-sm)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
              U
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              {config.brandName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all"
              title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiSun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiMoon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all"
            >
              <FiHeart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="notif-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="notif-badge"
                  style={{ background: 'var(--primary)', border: '2px solid var(--bg)' }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[var(--surface-2)] transition-all"
              >
                <div className="avatar w-7 h-7 text-sm">
                  {user?.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-[var(--text)]">{user?.name.split(' ')[0]}</span>
                <FiChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)] overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-[var(--border)]">
                      <p className="font-semibold text-sm text-[var(--text)]">{user?.name}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{user?.email}</p>
                    </div>
                    <div className="p-1">
                      {[
                        { icon: FiUser, label: 'Profile', href: '/profile' },
                        { icon: FiPackage, label: 'My Orders', href: '/orders' },
                        { icon: FiHeart, label: 'Wishlist', href: '/wishlist' },
                        { icon: FiSettings, label: 'Admin Panel', href: '/admin' },
                      ].map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-[var(--border)] mt-1 pt-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all">
                          <FiLogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-muted)] transition-all"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-[var(--border)]"
            >
              <div className="py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-[var(--border)] mt-2 pt-2 flex flex-col gap-1">
                  <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
                    <FiUser className="w-4 h-4" /> Profile
                  </Link>
                  <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
                    <FiPackage className="w-4 h-4" /> My Orders
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}