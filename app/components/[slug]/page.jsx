'use client';
import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import componentsData from '@/data/components.json';
import { useSite } from '@/context/SiteContext';
import toast from 'react-hot-toast';
import {
  FiShoppingCart, FiHeart, FiShare2, FiDownload, FiStar,
  FiCheck, FiCode, FiEye, FiZap, FiArrowLeft, FiCopy,
  FiPackage, FiRefreshCw, FiShield, FiUsers
} from 'react-icons/fi';

const toastStyle = {
  style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
};

export default function SingleComponentPage() {
  const { slug } = useParams();
  const component = componentsData.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useSite();

  if (!component) return notFound();

  const inCart = isInCart(component.id);
  const inWishlist = isInWishlist(component.id);

  const handleCart = () => {
    if (inCart) return;
    addToCart(component);
    toast.success(`${component.name} added to cart!`, toastStyle);
  };

  const handleWishlist = () => {
    toggleWishlist(component);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', toastStyle);
  };

  const handleCopy = () => {
    const code = `npm install ${component.slug}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard!', toastStyle);
  };

  const related = componentsData.filter((c) => c.id !== component.id && c.category === component.category).slice(0, 3);
  const otherRelated = componentsData.filter((c) => c.id !== component.id && c.category !== component.category).slice(0, 3 - related.length);
  const relatedComponents = [...related, ...otherRelated].slice(0, 3);

  const savings = component.oldPrice ? component.oldPrice - component.price : 0;
  const discount = component.oldPrice ? Math.round((savings / component.oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen mesh-bg pb-20">
      <div className="container mx-auto px-6 pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/components" className="hover:text-[var(--primary)] transition-colors">Components</Link>
          <span>/</span>
          <span className="text-[var(--primary)] font-medium">{component.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — Preview + Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-5"
          >
            {/* Preview Box */}
            <div
              className="relative rounded-2xl overflow-hidden min-h-[380px] flex items-center justify-center border border-[var(--border)]"
              style={{
                background: `linear-gradient(135deg, ${component.color}20, ${component.color}08, transparent)`,
              }}
            >
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, ${component.color}50 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Glow orbs */}
              <div
                className="absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl opacity-30"
                style={{ background: component.color }}
              />
              <div
                className="absolute bottom-10 left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ background: component.color }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  className="text-8xl mb-4 float"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {component.icon}
                </motion.div>
                <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">{component.name}</h3>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm text-white font-medium"
                  style={{ background: component.color }}
                >
                  {component.category}
                </span>
              </div>

              {/* Badge */}
              {component.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold text-white shadow-lg"
                    style={{
                      background: component.badge === 'New' ? '#10b981' :
                                  component.badge === 'Hot' ? '#ef4444' :
                                  component.badge === 'Sale' ? '#f59e0b' :
                                  component.badge === 'Bestseller' ? '#8b5cf6' : '#6366f1',
                    }}
                  >
                    {component.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div className="flex border-b border-[var(--border)]">
                {[
                  { id: 'preview', icon: FiEye, label: 'Overview' },
                  { id: 'code', icon: FiCode, label: 'Code Sample' },
                  { id: 'features', icon: FiCheck, label: 'Features' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-b-2 border-[var(--primary)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'preview' && (
                  <div className="space-y-4">
                    <p className="text-[var(--text-muted)] leading-relaxed">{component.longDescription}</p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {[
                        { icon: FiRefreshCw, label: 'Updated', value: component.updatedAt },
                        { icon: FiDownload, label: 'Downloads', value: component.downloads.toLocaleString() },
                        { icon: FiUsers, label: 'Rating', value: `${component.rating}/5` },
                        { icon: FiPackage, label: 'Stack', value: component.techStack.slice(0,2).join(', ') },
                      ].map((info, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]">
                          <info.icon className="w-4 h-4 text-[var(--primary)]" />
                          <div>
                            <p className="text-xs text-[var(--text-muted)]">{info.label}</p>
                            <p className="text-sm font-medium text-[var(--text)]">{info.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <span className="text-xs font-mono text-[var(--text-muted)]">installation.sh</span>
                      </div>
                      <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                        {copied ? <FiCheck className="w-3.5 h-3.5 text-green-400" /> : <FiCopy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-5 text-sm font-mono text-[var(--text-muted)] overflow-x-auto bg-[#0d1117] leading-relaxed">
                      <code className="text-green-400">{`# Install the package
npm install ${component.slug}

# Usage
import { ${component.name.replace(/ /g, '')} } from 'ui-hut';

export default function App() {
  return (
    <${component.name.replace(/ /g, '')}
      // Props here
    />
  );
}`}</code>
                    </pre>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {component.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]"
                      >
                        <div className="w-6 h-6 rounded-full bg-[var(--success)]/15 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="w-3 h-3 text-[var(--success)]" />
                        </div>
                        <span className="text-sm text-[var(--text-muted)]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right — Purchase Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Price Card */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow)]">
              <div className="flex items-start justify-between mb-3">
                <h1 className="font-display font-extrabold text-2xl text-[var(--text)] leading-tight">{component.name}</h1>
                <button
                  onClick={handleWishlist}
                  className={`p-2.5 rounded-xl border transition-all hover:scale-105 ${
                    inWishlist
                      ? 'border-red-400/30 bg-red-400/10 text-red-400'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:border-red-400/30 hover:text-red-400'
                  }`}
                >
                  <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(component.rating) ? 'text-amber-400' : 'text-[var(--border)]'}`}>★</span>
                  ))}
                </div>
                <span className="font-semibold text-sm text-[var(--text)]">{component.rating}</span>
                <span className="text-sm text-[var(--text-muted)]">({component.downloads.toLocaleString()} downloads)</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-2">
                <span className="font-display font-extrabold text-4xl text-[var(--primary)]">${component.price}</span>
                {component.oldPrice && (
                  <>
                    <span className="text-xl text-[var(--text-subtle)] line-through mb-1">${component.oldPrice}</span>
                    <span className="mb-1 px-2 py-0.5 rounded-lg bg-green-500/15 text-green-500 text-sm font-bold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              {component.oldPrice && (
                <p className="text-xs text-[var(--text-muted)] mb-5">You save ${savings}!</p>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 mb-5">
                <button
                  onClick={handleCart}
                  disabled={inCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all disabled:opacity-70"
                  style={{
                    background: inCart ? '#10b981' : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    boxShadow: !inCart ? '0 6px 20px rgba(99,102,241,0.35)' : 'none',
                  }}
                >
                  {inCart ? (
                    <><FiCheck className="w-5 h-5" /> Added to Cart</>
                  ) : (
                    <><FiShoppingCart className="w-5 h-5" /> Add to Cart — ${component.price}</>
                  )}
                </button>
                <button
                  onClick={() => { handleCart(); }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  <FiZap className="w-4 h-4" /> Buy Now
                </button>
              </div>

              {/* Guarantee */}
              <div className="space-y-2">
                {[
                  { icon: FiShield, text: '30-day money-back guarantee' },
                  { icon: FiRefreshCw, text: 'Lifetime free updates' },
                  { icon: FiUsers, text: 'Private Discord community' },
                  { icon: FiDownload, text: 'Instant download after purchase' },
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                    <g.icon className="w-4 h-4 text-[var(--success)]" />
                    {g.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-display font-bold text-[var(--text)] mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {component.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-display font-bold text-[var(--text)] mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {component.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Share */}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              <FiShare2 className="w-4 h-4" /> Share this Component
            </button>
          </motion.div>
        </div>

        {/* Related Components */}
        {relatedComponents.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-extrabold text-2xl text-[var(--text)] mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedComponents.map((c) => (
                <Link
                  key={c.id}
                  href={`/component/${c.slug}`}
                  className="flex items-center gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:shadow-[var(--shadow)] hover:border-[var(--primary)]/30 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${c.color}15` }}
                  >
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[var(--text)] truncate">{c.name}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{c.category}</p>
                  </div>
                  <span className="font-display font-bold text-[var(--primary)]">${c.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Components
          </Link>
        </div>
      </div>
    </div>
  );
}