'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  FiShoppingCart, FiHeart, FiEye, FiStar, FiChevronLeft, FiChevronRight,
  FiCopy, FiCheck, FiSearch, FiX, FiZap, FiCode, FiLock, FiUnlock,
} from 'react-icons/fi';
import { useSite } from '@/context/SiteContext';
import componentsData from '@/data/component-previews.json';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 9;
const CATEGORIES = ['All', ...new Set(componentsData.map((c) => c.category))];
const toastStyle = { style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } };

// ─── 3D Tilt ─────────────────────────────────────────────────────────────────
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotY = useTransform(mx, [-0.5, 0.5], ['-8deg', '8deg']);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyBtn({ code, label = 'Copy Code', small = false }) {
  const [copied, setCopied] = useState(false);
  const handle = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!code) { toast.error('Code not available for this component', toastStyle); return; }
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied!', toastStyle);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handle}
      className={`flex items-center gap-1.5 rounded-lg font-semibold transition-all ${small ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'}
        ${copied ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]'}`}
    >
      {copied ? <FiCheck className="w-3 h-3" /> : <FiCopy className="w-3 h-3" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
function MarqueeStrip({ items, reverse = false, speed = 35 }) {
  const anim = reverse ? 'marquee-r' : 'marquee-l';
  return (
    <div className="overflow-hidden relative group/marquee">
      <style>{`
        @keyframes marquee-l { 0%{ transform:translateX(0) } 100%{ transform:translateX(-50%) } }
        @keyframes marquee-r { 0%{ transform:translateX(-50%) } 100%{ transform:translateX(0) } }
        .anim-marquee-l { animation: marquee-l ${speed}s linear infinite; }
        .anim-marquee-r { animation: marquee-r ${speed + 5}s linear infinite; }
        .group\\/marquee:hover .anim-marquee-l,
        .group\\/marquee:hover .anim-marquee-r { animation-play-state: paused; }
      `}</style>
      <div className={`flex anim-${anim}`}>
        {[...items, ...items].map((c, i) => (
          <Link key={i} href={`/component/${c.slug}`}>
            <div className="flex-shrink-0 flex items-center gap-2.5 mx-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-sm)] transition-all group cursor-pointer"
              style={{ minWidth: 180 }}>
              <span className="text-xl">{c.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors">{c.name}</p>
                <p className="text-xs" style={{ color: c.isFree ? '#10b981' : 'var(--text-subtle)' }}>
                  {c.isFree ? '🆓 Free' : `$${c.price}`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Component Card ───────────────────────────────────────────────────────────
function CompCard({ component, index }) {
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useSite();
  const inCart = isInCart(component.slug);
  const inWishlist = isInWishlist(component.slug);
  const isBig = component.size === 'full';

  const handleCart = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (component.isFree) { toast.success('Free! Open preview to copy code.', toastStyle); return; }
    const item = { id: component.slug, ...component };
    addToCart(item);
    toast.success(`${component.name} added to cart!`, toastStyle);
  };

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist({ id: component.slug, ...component });
    toast.success(inWishlist ? 'Removed' : 'Added to wishlist', toastStyle);
  };

  return (
    <TiltCard className="h-full">
      <div className="group relative h-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:border-[var(--primary)]/20 transition-all duration-300">
        {/* Preview image */}
        <Link href={`/component/${component.slug}`}>
          <div className="relative overflow-hidden cursor-pointer" style={{ height: isBig ? 220 : 190 }}>
            {component.previewImage ? (
              <>
                <img src={component.previewImage} alt={component.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${component.color}25, ${component.color}08)` }}>
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: `radial-gradient(${component.color} 1px, transparent 0)`, backgroundSize: '20px 20px' }} />
                <span className="relative text-7xl">{component.icon}</span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                <FiEye className="w-4 h-4" /> Live Preview
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {component.isFree
                ? <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500 text-white text-xs font-bold shadow-md"><FiUnlock className="w-2.5 h-2.5" />FREE</span>
                : <span className="px-2.5 py-0.5 rounded-full text-white text-xs font-bold shadow-md"
                    style={{ background: `linear-gradient(135deg, ${component.color}ee, ${component.color}99)` }}>
                    ${component.price}
                  </span>
              }
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-sm">
              <FiStar className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-white text-xs font-medium">{component.rating}</span>
            </div>
            <div className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs">
              {isBig ? '2/3' : '1/3'}
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-1.5"
                style={{ background: `${component.color}18`, color: component.color }}>
                {component.category}
              </span>
              <Link href={`/component/${component.slug}`}>
                <h3 className="font-display font-bold text-[var(--text)] hover:text-[var(--primary)] transition-colors line-clamp-1 text-base leading-tight">
                  {component.name}
                </h3>
              </Link>
            </div>
            <button onClick={handleWishlist}
              className={`flex-shrink-0 p-1.5 rounded-lg transition-all hover:scale-110 ${inWishlist ? 'text-red-400 bg-red-400/10' : 'text-[var(--text-subtle)] hover:text-red-400 hover:bg-red-400/10'}`}>
              <FiHeart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">{component.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {component.tags?.slice(0, 3).map((t) => (
              <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-subtle)] border border-[var(--border)]">#{t}</span>
            ))}
          </div>

          <div className="flex gap-2">
            <Link href={`/component/${component.slug}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/30 transition-all">
              <FiEye className="w-3 h-3" /> Preview
            </Link>
            {component.isFree
              ? <CopyBtn code={component.code} label="Get Code" small />
              : <button onClick={handleCart} disabled={inCart}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-60"
                  style={{ background: inCart ? '#10b981' : `linear-gradient(135deg, var(--primary), var(--primary-dark))`, boxShadow: !inCart ? '0 3px 12px rgba(99,102,241,0.3)' : 'none' }}>
                  {inCart ? <><FiCheck className="w-3 h-3" /> Added</> : <><FiShoppingCart className="w-3 h-3" /> ${component.price}</>}
                </button>
            }
          </div>
        </div>

        {/* Shimmer bottom */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${component.color}, transparent)` }} />
      </div>
    </TiltCard>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ComponentsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [freeFilter, setFreeFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = componentsData.filter((c) => {
    const q = search.toLowerCase();
    const ms = c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.tags?.some(t => t.includes(q));
    const mc = category === 'All' || c.category === category;
    const mf = freeFilter === 'all' || (freeFilter === 'free' ? c.isFree : !c.isFree);
    return ms && mc && mf;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const goTo = (p) => { setPage(Math.max(1, Math.min(p, totalPages))); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  useEffect(() => setPage(1), [search, category, freeFilter]);

  const marqueeAll = componentsData;
  const freeItems = componentsData.filter(c => c.isFree);
  const paidItems = componentsData.filter(c => !c.isFree);

  return (
    <div className="min-h-screen mesh-bg pb-20">
      {/* Hero */}
      <section className="pt-14 pb-8">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-5 border border-[var(--primary)]/20">
              <FiZap className="w-3.5 h-3.5 animate-pulse" />
              {componentsData.length}+ Production-Ready Components
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-[var(--text)] mb-4 leading-tight">
              Copy-Paste <span className="gradient-text">UI Library</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto mb-5">
              Live demos, interactive previews, and instant copy-paste for free components. Zero dependencies, pure React + Tailwind.
            </p>
            <div className="flex items-center justify-center gap-5 text-sm">
              <span className="flex items-center gap-1.5 text-green-500 font-semibold">
                <FiUnlock className="w-3.5 h-3.5" /> {freeItems.length} Free components
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span className="flex items-center gap-1.5 text-[var(--primary)] font-semibold">
                <FiLock className="w-3.5 h-3.5" /> {paidItems.length} Premium components
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee strips */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)] py-4 mb-10 space-y-3 overflow-hidden">
        <p className="text-center text-xs text-[var(--text-subtle)] mb-1">✨ Hover to pause · Click to preview live</p>
        <MarqueeStrip items={freeItems.length > 3 ? freeItems : marqueeAll.slice(0, 10)} speed={30} />
        <MarqueeStrip items={paidItems.length > 3 ? paidItems : marqueeAll.slice(5, 14)} reverse speed={40} />
      </div>

      <div className="container mx-auto px-6">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 mb-6 shadow-[var(--shadow-sm)]">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input type="text" placeholder="Search components, tags..." value={search}
                onChange={e => setSearch(e.target.value)} className="input-custom pl-10 pr-10" />
              {search && <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"><FiX className="w-4 h-4" /></button>}
            </div>
            <div className="flex gap-2">
              {[['all','✦ All'],['free','🆓 Free'],['paid','💎 Premium']].map(([v,l]) => (
                <button key={v} onClick={() => setFreeFilter(v)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${freeFilter===v ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] text-[var(--text-muted)] bg-[var(--surface-2)] hover:border-[var(--primary)]/30'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`category-pill ${category===cat?'active':''}`}>
                {cat === 'All' ? '✦ All' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-[var(--text-muted)]">
            <span className="text-[var(--text)] font-semibold">{filtered.length}</span> components
            {category !== 'All' && <> · <span className="text-[var(--primary)]">{category}</span></>}
          </p>
          <p className="text-xs text-[var(--text-subtle)]">Page {page}/{totalPages || 1}</p>
        </div>

        {/* Pinterest Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-20 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">Nothing found</h3>
            <p className="text-[var(--text-muted)] mb-5">Try different terms or clear filters</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setFreeFilter('all'); }} className="btn-primary">Clear Filters</button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={`${category}-${freeFilter}-${page}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {paginated.map((comp, i) => (
                <motion.div key={comp.slug}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={comp.size === 'full' ? 'md:col-span-2' : 'col-span-1'}>
                  <CompCard component={comp} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-4">
            <button onClick={() => goTo(page - 1)} disabled={page === 1}
              className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => goTo(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${p === page ? 'bg-[var(--primary)] text-white shadow-lg' : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)]'}`}>
                  {p}
                </button>
              ))}
            </div>
            <button onClick={() => goTo(page + 1)} disabled={page === totalPages}
              className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <p className="text-center text-xs text-[var(--text-subtle)]">
          Showing {(page-1)*ITEMS_PER_PAGE+1}–{Math.min(page*ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
        </p>
      </div>
    </div>
  );
}