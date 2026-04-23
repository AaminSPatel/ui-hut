'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import {
  FiGrid, FiPackage, FiShoppingBag, FiUsers, FiSettings,
  FiBarChart2, FiLogOut, FiMenu, FiX, FiSun, FiMoon,
  FiLayers, FiImage, FiLayout, FiShield
} from 'react-icons/fi';

const navItems = [
  { icon: FiGrid, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FiPackage, label: 'Components', href: '/admin/components' },
  { icon: FiLayout, label: 'Pages', href: '/admin/pages' },
  { icon: FiLayers, label: 'Sections', href: '/admin/sections' },
  { icon: FiShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: FiUsers, label: 'Customers', href: '/admin/customers' },
  { icon: FiImage, label: 'Media', href: '/admin/media' },
  { icon: FiBarChart2, label: 'Analytics', href: '/admin/analytics' },
  { icon: FiSettings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const { isAdminAuthenticated, adminUser, adminLogout, darkMode, toggleDarkMode } = useSite();
  const router = useRouter();``
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [isAdminAuthenticated, pathname]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (!isAdminAuthenticated) return null;

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)] overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed lg:static lg:translate-x-0 top-0 left-0 h-full w-64 bg-[var(--surface)] border-r border-[var(--border)] z-50 lg:z-auto flex flex-col"
        style={{ transform: undefined }}
      >
        <div className={`flex flex-col h-full`}>
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                <FiShield className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[var(--text)]">Admin Panel</p>
                <p className="text-xs text-[var(--text-muted)]">UI Hut</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[var(--text-muted)]">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 overflow-y-auto space-y-0.5">
            {navItems.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${active ? 'text-[var(--primary)]' : ''}`} />
                  {item.label}
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-3 border-t border-[var(--border)] space-y-1">
            <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-all">
              <span>🌐</span> View Website
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
              <FiLogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-[var(--surface)] border-b border-[var(--border)] px-5 h-14 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-muted)]">
              <FiMenu className="w-5 h-5" />
            </button>
            <div className="hidden lg:block">
              <nav className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <span>Admin</span>
                <span>/</span>
                <span className="text-[var(--text)] font-medium capitalize">
                  {pathname.split('/').pop()}
                </span>
              </nav>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-muted)] transition-all">
              {darkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-[var(--border)]">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-[var(--text)]">{adminUser?.name || 'Admin'}</p>
                <p className="text-xs text-[var(--text-muted)]">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}