'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave, FiShield, FiBell, FiPackage, FiHeart, FiStar } from 'react-icons/fi';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, orders, wishlist } = useSite();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { icon: FiPackage, label: 'Total Orders', value: orders.length, color: '#6366f1' },
    { icon: FiHeart, label: 'Wishlist', value: wishlist.length, color: '#ec4899' },
    { icon: FiStar, label: 'Total Spent', value: `$${totalSpent}`, color: '#f59e0b' },
    { icon: FiShield, label: 'Plan', value: user.plan, color: '#10b981' },
  ];

  return (
    <div className="min-h-screen mesh-bg pb-20 pt-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display font-extrabold text-4xl text-[var(--text)] mb-2">My Profile</h1>
          <p className="text-[var(--text-muted)]">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Avatar + info */}
          <div className="lg:col-span-1 space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 text-center"
            >
              <div className="relative inline-block mb-4">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-display font-bold text-white mx-auto shadow-[var(--shadow-lg)]"
                  style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
                >
                  {user.name.charAt(0)}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[var(--surface)] flex items-center justify-center text-xs text-white"
                  style={{ background: '#10b981' }}
                >
                  ✓
                </div>
              </div>
              <h2 className="font-display font-bold text-xl text-[var(--text)] mb-1">{user.name}</h2>
              <p className="text-sm text-[var(--text-muted)] mb-3">{user.email}</p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                {user.plan} Member
              </span>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[var(--text-subtle)]">
                <FiCalendar className="w-3 h-3" />
                Joined {new Date(user.joinedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
              </div>
            </motion.div>

            {/* Quick links */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 space-y-1">
              {[
                { icon: FiPackage, label: 'My Orders', href: '/orders' },
                { icon: FiHeart, label: 'Wishlist', href: '/wishlist' },
                { icon: FiBell, label: 'Notifications', href: '#' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all"
                >
                  <item.icon className="w-4 h-4 text-[var(--primary)]" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Stats + edit form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 text-center hover:shadow-[var(--shadow)] transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${stat.color}15` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div className="font-display font-bold text-xl text-[var(--text)]">{stat.value}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Edit Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-lg text-[var(--text)]">Account Information</h3>
                <button
                  onClick={() => setEditing(!editing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    editing
                      ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20'
                      : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                  }`}
                >
                  {editing ? <FiSave className="w-4 h-4" /> : <FiEdit2 className="w-4 h-4" />}
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { icon: FiUser, label: 'Full Name', field: 'name', type: 'text' },
                  { icon: FiMail, label: 'Email Address', field: 'email', type: 'email' },
                ].map((f) => (
                  <div key={f.field}>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      {f.label}
                    </label>
                    <div className="relative">
                      <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type={f.type}
                        value={form[f.field]}
                        onChange={(e) => setForm({ ...form, [f.field]: e.target.value })}
                        disabled={!editing}
                        className="input-custom pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Member Since
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={new Date(user.joinedAt).toLocaleDateString()}
                      disabled
                      className="input-custom pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Current Plan
                  </label>
                  <div className="relative">
                    <FiShield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
                    <input
                      type="text"
                      value={user.plan + ' Plan'}
                      disabled
                      className="input-custom pl-10 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {editing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-5 p-4 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-sm text-[var(--primary)]"
                >
                  💡 Click "Save Changes" to update your profile information.
                </motion.div>
              )}
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
            >
              <h3 className="font-display font-bold text-lg text-[var(--text)] mb-4">Security</h3>
              <div className="space-y-3">
                {[
                  { label: 'Change Password', desc: 'Update your account password' },
                  { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security' },
                  { label: 'Active Sessions', desc: 'Manage where you are logged in' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                    <div>
                      <p className="font-medium text-sm text-[var(--text)]">{item.label}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                    </div>
                    <button className="btn-ghost text-xs py-1.5 px-3">Manage</button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}