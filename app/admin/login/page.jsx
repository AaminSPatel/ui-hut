'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiKey, FiEye, FiEyeOff, FiShield, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = { style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } };

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '', secretKey: '' });
  const [showPass, setShowPass] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const { adminLogin, authLoading, authError } = useSite();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attempts >= 5) {
      toast.error('Too many failed attempts. Try again later.', toastStyle);
      return;
    }
    const result = await adminLogin(form.email, form.password, form.secretKey);
    if (result.success) {
      toast.success('Welcome, Admin!', toastStyle);
      router.push('/admin/dashboard');
    } else {
      setAttempts((a) => a + 1);
      toast.error(result.error || 'Access denied', toastStyle);
    }
  };

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[var(--bg)] to-slate-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-red-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/5 blur-3xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Warning badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            <FiAlertTriangle className="w-3.5 h-3.5" />
            Restricted Area — Authorized Personnel Only
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-[var(--shadow-lg)]"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiShield className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-[var(--text)]">Admin Panel</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">Three-factor authentication required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Admin Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input type="email" required value={form.email} onChange={set('email')} placeholder="admin@uihut.dev" className="input-custom pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={set('password')} placeholder="admin123 (demo)" className="input-custom pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                <FiKey className="inline w-3.5 h-3.5 mr-1" />
                Secret Admin Key
              </label>
              <div className="relative">
                <FiKey className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                <input
                  type={showKey ? 'text' : 'password'}
                  required
                  value={form.secretKey}
                  onChange={set('secretKey')}
                  placeholder="uihut_admin_2024 (demo)"
                  className="input-custom pl-10 pr-10 border-red-500/30 focus:border-red-500"
                />
                <button type="button" onClick={() => setShowKey(!showKey)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  {showKey ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[var(--text-subtle)] mt-1">Set via NEXT_PUBLIC_ADMIN_KEY env variable</p>
            </div>

            {attempts > 0 && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                ⚠ Failed attempts: {attempts}/5. Account will be locked after 5 attempts.
              </div>
            )}

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {authError}
              </div>
            )}

            <button type="submit" disabled={authLoading || attempts >= 5} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60 transition-all"
              style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 15px rgba(239,68,68,0.3)' }}
            >
              {authLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><FiShield className="w-4 h-4" /> Access Admin Panel</>}
            </button>
          </form>

          <div className="mt-5 p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Email: <span className="font-mono text-[var(--primary)]">admin@uihut.dev</span></p>
            <p>Password: <span className="font-mono text-[var(--primary)]">admin123</span></p>
            <p>Secret Key: <span className="font-mono text-[var(--primary)]">uihut_admin_2024</span></p>
          </div>
        </motion.div>

        <div className="text-center mt-5">
          <Link href="/" className="text-xs text-[var(--text-subtle)] hover:text-[var(--text-muted)] transition-colors">
            ← Back to UI Hut
          </Link>
        </div>
      </div>
    </div>
  );
}