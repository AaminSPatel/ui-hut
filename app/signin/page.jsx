'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiGithub } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = { style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } };

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { signIn, signUp, authLoading, authError } = useSite();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'signup' && form.password !== form.confirm) {
      toast.error('Passwords do not match', toastStyle);
      return;
    }
    const result = mode === 'signin'
      ? await signIn(form.email, form.password)
      : await signUp(form.name, form.email, form.password);

    if (result.success) {
      toast.success(mode === 'signin' ? 'Welcome back!' : 'Account created!', toastStyle);
      router.push('/');
    } else {
      toast.error(result.error || 'Something went wrong', toastStyle);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              U
            </div>
            <span className="text-2xl font-display font-bold gradient-text">UI Hut</span>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-[var(--shadow-lg)]"
        >
          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-[var(--surface-2)] rounded-xl mb-7 border border-[var(--border)]">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setForm({ name: '', email: '', password: '', confirm: '' }); }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? 'bg-[var(--primary)] text-white shadow-lg'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'signin' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-display font-bold text-2xl text-[var(--text)] mb-1">
                {mode === 'signin' ? 'Welcome back 👋' : 'Join UI Hut 🚀'}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                {mode === 'signin' ? 'Sign in to access your components & orders.' : 'Create an account to start building faster.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input type="text" required value={form.name} onChange={set('name')} placeholder="Rahul Sharma" className="input-custom pl-10" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input type="email" required value={form.email} onChange={set('email')} placeholder={mode === 'signin' ? 'demo@uihut.dev' : 'you@example.com'} className="input-custom pl-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input type={showPass ? 'text' : 'password'} required value={form.password} onChange={set('password')} placeholder={mode === 'signin' ? 'demo123' : 'Min 8 characters'} className="input-custom pl-10 pr-10" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]">
                      {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input type={showPass ? 'text' : 'password'} required value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" className="input-custom pl-10" />
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-[var(--primary)] hover:underline">Forgot password?</button>
                  </div>
                )}

                {authError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {authError}
                  </div>
                )}

                <button type="submit" disabled={authLoading} className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 text-sm font-bold">
                  {authLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>{mode === 'signin' ? 'Sign In' : 'Create Account'} <FiArrowRight /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="divider-text my-5 text-xs">or continue with</div>

              {/* OAuth */}
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/30 transition-all text-sm font-medium">
                <FiGithub className="w-4 h-4" />
                Continue with GitHub
              </button>

              {/* Demo hint */}
              {mode === 'signin' && (
                <div className="mt-4 p-3 rounded-xl bg-[var(--primary)]/8 border border-[var(--primary)]/15 text-xs text-[var(--text-muted)]">
                  💡 Demo: <span className="text-[var(--primary)] font-mono">demo@uihut.dev</span> / <span className="text-[var(--primary)] font-mono">demo123</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-xs text-[var(--text-subtle)] mt-5">
          By continuing, you agree to our{' '}
          <Link href="#" className="text-[var(--primary)] hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link href="#" className="text-[var(--primary)] hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}