'use client';
import { useState, Suspense } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import componentsData from '@/data/component-previews.json';
import { useSite } from '@/context/SiteContext';
import toast from 'react-hot-toast';
import {
  FiShoppingCart, FiHeart, FiShare2, FiDownload, FiStar, FiCheck,
  FiCode, FiEye, FiZap, FiArrowLeft, FiCopy, FiPackage, FiRefreshCw,
  FiShield, FiUsers, FiLock, FiUnlock,
} from 'react-icons/fi';

// ── Real Preview Components ───────────────────────────────────────────────────
import Carousel1 from '@/components/preview/Carousel1';
import Carousel2 from '@/components/preview/Carousel2';
import Carousel3 from '@/components/preview/Carousel3';
import Carousel4 from '@/components/preview/Carousel4';
import Carousel5 from '@/components/preview/Carousel5';
import Carousel6 from '@/components/preview/Carousel6';
import Carousel7 from '@/components/preview/Carousel7';
import Carousel8 from '@/components/preview/Carousel8';
import Carousel9 from '@/components/preview/Carousel9';
import Carousel10 from '@/components/preview/Carousel10';
import Carousel11 from '@/components/preview/Carousel11';
import Carousel12 from '@/components/preview/Carousel12';
import Corousel13 from '@/components/preview/Corousel13';

const toastStyle = { style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } };

// ── Live Demo Components ──────────────────────────────────────────────────────
function GradientButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <button className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
        Primary Action ✨
      </button>
      <button className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
        Warning Button
      </button>
      <button className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-xl hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
        Success Action
      </button>
    </div>
  );
}

function MagneticButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="w-20 h-20 rounded-2xl text-5xl flex items-center justify-center" style={{ background: '#ec489915' }}>🧲</div>
      <p className="text-sm text-[var(--text-muted)] max-w-xs">Move cursor near the button to see the magnetic spring effect!</p>
      <button className="px-8 py-3.5 rounded-full font-semibold text-white shadow-lg hover:shadow-pink-500/30 transition-all hover:-translate-y-1"
        style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>
        🧲 I Follow Your Cursor
      </button>
    </div>
  );
}

function ProfileCardDemo() {
  const [followed, setFollowed] = useState(false);
  return (
    <div className="w-72 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6 text-center border border-gray-100 dark:border-gray-700">
      <img src="https://i.pravatar.cc/100?img=5" className="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-pink-400" alt="Sarah" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Sarah Johnson</h3>
      <p className="text-sm text-gray-400 mt-1">UI/UX Designer · Mumbai</p>
      <p className="text-sm text-gray-400 mt-3 leading-relaxed">Creating beautiful interfaces. Open to opportunities. ✨</p>
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div><p className="font-bold text-gray-900 dark:text-white">248</p><p className="text-gray-400 text-xs">Posts</p></div>
        <div><p className="font-bold text-gray-900 dark:text-white">12.4k</p><p className="text-gray-400 text-xs">Followers</p></div>
        <div><p className="font-bold text-gray-900 dark:text-white">94</p><p className="text-gray-400 text-xs">Following</p></div>
      </div>
      <button onClick={() => setFollowed(!followed)}
        className="mt-5 w-full py-2.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
        style={{ background: followed ? '#10b981' : 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>
        {followed ? '✓ Following' : '+ Follow'}
      </button>
    </div>
  );
}

function ContactFormDemo() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  if (sent) return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-2xl bg-green-500/15 flex items-center justify-center mx-auto mb-4">
        <FiCheck className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-xl font-bold text-[var(--text)] mb-2">Message Sent!</h3>
      <button onClick={() => setSent(false)} className="text-sm text-[var(--primary)] hover:underline">Send another</button>
    </div>
  );
  return (
    <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="w-full max-w-sm space-y-3">
      <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form,name:e.target.value})}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
      <input type="email" placeholder="Email address" value={form.email} onChange={e => setForm({...form,email:e.target.value})}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
      <textarea rows={3} placeholder="Your message..." value={form.message} onChange={e => setForm({...form,message:e.target.value})}
        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
      <button type="submit" className="w-full py-2.5 rounded-xl text-white font-semibold text-sm hover:-translate-y-0.5 transition-all"
        style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
        Send Message ✉️
      </button>
    </form>
  );
}

function PricingDemo() {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: 'Free', price: 0, annual: 0, features: ['5 Projects', '2GB Storage'], color: '#6366f1' },
    { name: 'Pro', price: 29, annual: 19, features: ['Unlimited', '50GB', 'Priority'], color: '#10b981', popular: true },
    { name: 'Biz', price: 99, annual: 79, features: ['Everything', '500GB', 'SLA'], color: '#f59e0b' },
  ];
  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-3 mb-5">
        <span className="text-sm text-[var(--text-muted)]">Monthly</span>
        <button onClick={() => setAnnual(!annual)}
          className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-green-500' : 'bg-[var(--border)]'}`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${annual ? 'left-7' : 'left-1'}`} />
        </button>
        <span className="text-sm text-[var(--text-muted)]">Annual <span className="text-green-500 text-xs font-bold">-30%</span></span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {plans.map(p => (
          <div key={p.name} className={`p-3 rounded-xl border-2 ${p.popular ? 'border-green-500' : 'border-[var(--border)]'} bg-[var(--surface)]`}>
            {p.popular && <p className="text-xs font-bold text-green-500 mb-1">⭐ POPULAR</p>}
            <p className="font-bold text-[var(--text)] text-sm">{p.name}</p>
            <p className="text-xl font-black mt-1" style={{ color: p.color }}>${annual ? p.annual : p.price}</p>
            <ul className="mt-2 space-y-1">
              {p.features.map(f => <li key={f} className="text-xs text-[var(--text-muted)]">✓ {f}</li>)}
            </ul>
            <button className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: p.color }}>Choose</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsCardDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {[
        { title: 'Revenue', value: '$28,450', change: '+12.5%', up: true, color: '#6366f1' },
        { title: 'Users', value: '4,820', change: '+8.2%', up: true, color: '#10b981' },
        { title: 'Bounce Rate', value: '24.6%', change: '-3.1%', up: false, color: '#f59e0b' },
        { title: 'Sessions', value: '12,394', change: '+15.7%', up: true, color: '#ec4899' },
      ].map((s, i) => (
        <div key={i} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-muted)] mb-1">{s.title}</p>
          <p className="text-lg font-black text-[var(--text)]">{s.value}</p>
          <p className={`text-xs font-semibold mt-1 ${s.up ? 'text-green-500' : 'text-red-400'}`}>{s.change}</p>
          <div className="h-1 mt-2 rounded-full bg-[var(--surface-2)]">
            <div className="h-1 rounded-full w-3/4" style={{ background: s.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function GlassModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-center">
      <button onClick={() => setOpen(true)}
        className="px-6 py-3 rounded-xl text-white font-semibold hover:-translate-y-0.5 transition-all"
        style={{ background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)' }}>
        Open Glass Modal
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
              className="max-w-sm w-full rounded-2xl p-7 text-center"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="text-5xl mb-3">🪟</div>
              <h2 className="text-xl font-bold text-white mb-2">Glass Modal</h2>
              <p className="text-white/70 text-sm mb-5">Glassmorphism with spring animation and backdrop blur.</p>
              <div className="flex gap-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl text-white/80 border border-white/20 hover:bg-white/10 text-sm transition-colors">Cancel</button>
                <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)' }}>Confirm</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BadgesDemo() {
  return (
    <div className="flex flex-wrap gap-2.5 justify-center p-4">
      {[
        { label: 'Default', bg: '#6366f115', color: '#6366f1' },
        { label: '🟢 Live', bg: '#10b98115', color: '#10b981', pulse: true },
        { label: '⚠ Warning', bg: '#f59e0b15', color: '#f59e0b' },
        { label: '✕ Error', bg: '#ef444415', color: '#ef4444' },
        { label: '🔥 Hot', bg: '#f9731615', color: '#f97316' },
        { label: 'Beta', bg: '#06b6d415', color: '#06b6d4' },
        { label: 'Pro', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', color: 'white', gradient: true },
        { label: 'New', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', gradient: true },
      ].map((b, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: b.bg, color: b.color, border: b.gradient ? 'none' : `1px solid ${b.color}30` }}>
          {b.pulse && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
          {b.label}
        </span>
      ))}
    </div>
  );
}

function MarqueeDemo() {
  const items = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zod', 'TanStack', 'Radix UI'];
  return (
    <div className="w-full overflow-hidden space-y-3">
      <style>{`
        @keyframes sl-l{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes sl-r{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        .sl-l{animation:sl-l 12s linear infinite}
        .sl-r{animation:sl-r 15s linear infinite}
      `}</style>
      {[false,true].map((rev,row) => (
        <div key={row} className="overflow-hidden">
          <div className={rev?'sl-r flex':'sl-l flex'}>
            {[...items,...items].map((item,i) => (
              <span key={i} className="flex-shrink-0 flex items-center gap-2 mx-2 px-4 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)] text-sm font-medium whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[var(--primary)]"/>{item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function InputDemo() {
  const [show,setShow]=useState(false);
  const [val,setVal]=useState('');
  return (
    <div className="space-y-3 max-w-xs w-full">
      <input type="text" placeholder="Default input" className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"/>
      <div className="relative">
        <input type={show?'text':'password'} placeholder="Password input" className="w-full px-4 py-2.5 pr-10 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"/>
        <button onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs">{show?'🙈':'👁'}</button>
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">🔍</span>
        <input type="text" placeholder="Search..." value={val} onChange={e=>setVal(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"/>
        {val&&<button onClick={()=>setVal('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs">✕</button>}
      </div>
    </div>
  );
}

const DEMO_MAP = {
  'carousel-cube': Carousel1,
  'carousel-tilt-cards': Carousel2,
  'carousel-flip-cards': Carousel3,
  'carousel-coverflow': Carousel4,
  'carousel-hero-slider': Carousel5,
  'carousel-3d-wheel': Carousel6,
  'carousel-swipe-stack': Carousel7,
  'carousel-3d-ring': Carousel8,
  'carousel-expandable-portfolio': Carousel9,
  'carousel-parallax-layers': Carousel10,
  'carousel-diagonal-split': Carousel11,
  'carousel-book-flip': Carousel12,
  'carousel-hotstar-stack': Corousel13,
};

function FallbackPreview({ component }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-12 px-6">
      <div className="text-8xl mb-4">{component.icon}</div>
      <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">{component.name}</h3>
      <p className="text-sm text-[var(--text-muted)] mb-5 max-w-xs leading-relaxed">{component.description}</p>
      {component.previewImage && (
        <img src={component.previewImage} alt={component.name} className="w-full max-w-sm rounded-xl border border-[var(--border)] mt-2" />
      )}
      {!component.isFree && (
        <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <FiLock className="w-4 h-4 text-[var(--primary)]"/>
          <span className="text-sm text-[var(--text-muted)]">Purchase to unlock live preview</span>
        </div>
      )}
    </div>
  );
}

export default function SingleComponentPage() {
  const { slug } = useParams();
  const component = componentsData.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useSite();

  if (!component) return notFound();

  const inCart = isInCart(component.slug);
  const inWishlist = isInWishlist(component.slug);
  const DemoComponent = DEMO_MAP[component.slug];

  const handleCart = () => {
    if (component.isFree) { toast.success('This is free! Copy the code below.', toastStyle); return; }
    if (!inCart) addToCart({ id: component.slug, ...component });
    toast.success(inCart ? 'Already in cart' : `${component.name} added to cart!`, toastStyle);
  };

  const handleWishlist = () => {
    toggleWishlist({ id: component.slug, ...component });
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', toastStyle);
  };

  const handleCopy = () => {
    if (!component.code) { toast.error('Purchase this component to get the code', toastStyle); return; }
    navigator.clipboard.writeText(component.code);
    setCopied(true);
    toast.success('Code copied!', toastStyle);
    setTimeout(() => setCopied(false), 2000);
  };

  const related = componentsData.filter(c => c.slug !== slug && c.category === component.category).slice(0, 3);

  return (
    <div className="min-h-screen mesh-bg pb-20">
      <div className="container mx-auto px-6 pt-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-7">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/components" className="hover:text-[var(--primary)] transition-colors">Components</Link>
          <span>/</span>
          <span className="text-[var(--primary)] font-medium">{component.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3 space-y-4">
            {/* Live Preview */}
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]">
              <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                    <div className="w-3 h-3 rounded-full bg-green-400"/>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-mono">Live Preview — {component.name}</span>
                  {component.isFree && (
                    <span className="text-xs text-green-500 font-semibold px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1">
                      <FiUnlock className="w-3 h-3"/> Free
                    </span>
                  )}
                </div>
                <button onClick={handleCopy}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${copied?'text-green-400 bg-green-400/10':'text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10'}`}>
                  {copied?<FiCheck className="w-3 h-3"/>:<FiCopy className="w-3 h-3"/>}
                  {copied?'Copied!':'Copy Code'}
                </button>
              </div>
              <div className="min-h-[420px]  flex items-center justify-center p-8 w-full"
                /* style={{ background: DemoComponent ? 'var(--bg)' : `linear-gradient(135deg, ${component.color}10, transparent)` }} */>
                {DemoComponent ? <DemoComponent /> : <FallbackPreview component={component} />}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
              <div className="flex border-b border-[var(--border)]">
                {[
                  { id:'preview', icon:FiEye, label:'Description' },
                  { id:'features', icon:FiCheck, label:'Features' },
                  { id:'code', icon:FiCode, label:component.isFree?'Source Code':'Installation' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all ${activeTab===tab.id?'bg-[var(--primary)]/10 text-[var(--primary)] border-b-2 border-[var(--primary)]':'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'}`}>
                    <tab.icon className="w-4 h-4"/>
                    {tab.label}
                    {tab.id==='code' && component.isFree && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 font-bold border border-green-500/20">FREE</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === 'preview' && (
                  <div className="space-y-4">
                    <p className="text-[var(--text-muted)] leading-relaxed">{component.longDescription || component.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        [FiPackage,'Category',component.category],
                        [FiRefreshCw,'Updated','2024-12-10'],
                        [FiUsers,'Downloads',component.downloads?.toLocaleString()],
                        [FiStar,'Rating',`${component.rating}/5.0`],
                      ].map(([Icon,label,value],i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]">
                          <Icon className="w-4 h-4 text-[var(--primary)]"/>
                          <div><p className="text-xs text-[var(--text-muted)]">{label}</p><p className="text-sm font-medium text-[var(--text)]">{value}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Ready to use','Fully customizable','Responsive design','Dark mode support','Tailwind CSS','No extra dependencies','React 18 compatible','Accessible (WCAG)'].map((f,i) => (
                      <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-2)]">
                        <div className="w-5 h-5 rounded-full bg-[var(--success)]/15 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="w-3 h-3 text-[var(--success)]"/>
                        </div>
                        <span className="text-sm text-[var(--text-muted)]">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {activeTab === 'code' && (
                  <div>
                    {component.isFree && component.code ? (
                      <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-green-400"/>
                            </div>
                            <span className="text-xs font-mono text-[var(--text-muted)]">{component.file}</span>
                          </div>
                          <button onClick={handleCopy}
                            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all ${copied?'text-green-400 bg-green-400/10 border border-green-500/20':'text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] hover:text-[var(--primary)]'}`}>
                            {copied?<FiCheck className="w-3 h-3"/>:<FiCopy className="w-3 h-3"/>}
                            {copied?'Copied!':'Copy'}
                          </button>
                        </div>
                        <pre className="p-5 text-xs font-mono overflow-x-auto bg-[#0d1117] leading-relaxed max-h-96">
                          <code className="text-green-300">{component.code}</code>
                        </pre>
                      </div>
                    ) : !component.isFree ? (
                      <div className="text-center py-8">
                        <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                          <FiLock className="w-7 h-7 text-[var(--primary)]"/>
                        </div>
                        <h3 className="font-display font-bold text-lg text-[var(--text)] mb-2">Premium Component</h3>
                        <p className="text-sm text-[var(--text-muted)] mb-5">Purchase to access the complete source code and all future updates.</p>
                        <button onClick={handleCart} className="btn-primary flex items-center gap-2 mx-auto">
                          <FiShoppingCart className="w-4 h-4"/> Buy for ${component.price}
                        </button>
                        <pre className="mt-5 p-4 text-xs font-mono bg-[var(--surface-2)] rounded-xl text-[var(--text-muted)] text-left overflow-x-auto">
                          <code>{`// After purchase:
// 1. Download from your orders page
// 2. Copy to: src/components/${component.path}
// 3. Import:
import ${component.name.replace(/ /g,'')} from '@/components/${component.file}';`}</code>
                        </pre>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-[var(--shadow)]">
              <div className="flex items-start justify-between mb-3">
                <h1 className="font-display font-extrabold text-2xl text-[var(--text)] leading-tight pr-3">{component.name}</h1>
                <button onClick={handleWishlist}
                  className={`flex-shrink-0 p-2.5 rounded-xl border transition-all hover:scale-105 ${inWishlist?'border-red-400/30 bg-red-400/10 text-red-400':'border-[var(--border)] text-[var(--text-muted)] hover:border-red-400/30 hover:text-red-400'}`}>
                  <FiHeart className={`w-5 h-5 ${inWishlist?'fill-current':''}`}/>
                </button>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_,i) => (
                    <span key={i} className={`text-sm ${i<Math.floor(component.rating)?'text-amber-400':'text-[var(--border)]'}`}>★</span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[var(--text)]">{component.rating}</span>
                <span className="text-sm text-[var(--text-muted)]">· {component.downloads?.toLocaleString()}</span>
              </div>

              {component.isFree ? (
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-display font-extrabold text-4xl text-green-500">FREE</span>
                  <span className="px-3 py-1 rounded-xl bg-green-500/10 text-green-500 text-sm font-bold border border-green-500/20">Open Source</span>
                </div>
              ) : (
                <div className="flex items-end gap-3 mb-5">
                  <span className="font-display font-extrabold text-4xl text-[var(--primary)]">${component.price}</span>
                  <span className="text-xl text-[var(--text-subtle)] line-through mb-1">${Math.round(component.price*1.4)}</span>
                  <span className="mb-1 px-2 py-0.5 rounded-lg bg-green-500/15 text-green-500 text-sm font-bold">SAVE 28%</span>
                </div>
              )}

              <div className="space-y-3 mb-5">
                {component.isFree ? (
                  <>
                    <button onClick={handleCopy}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background:'linear-gradient(135deg,#10b981,#06b6d4)', boxShadow:'0 6px 20px rgba(16,185,129,0.3)' }}>
                      {copied?<><FiCheck className="w-5 h-5"/> Code Copied!</>:<><FiCopy className="w-5 h-5"/> Copy Code — Free!</>}
                    </button>
                    <button onClick={() => setActiveTab('code')}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-green-500/30 hover:text-green-500 transition-all">
                      <FiCode className="w-4 h-4"/> View Source Code
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleCart} disabled={inCart}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all disabled:opacity-70 hover:-translate-y-0.5"
                      style={{ background:inCart?'#10b981':'linear-gradient(135deg,var(--primary),var(--primary-dark))', boxShadow:!inCart?'0 6px 20px rgba(99,102,241,0.35)':'none' }}>
                      {inCart?<><FiCheck className="w-5 h-5"/> In Cart</>:<><FiShoppingCart className="w-5 h-5"/> Add to Cart — ${component.price}</>}
                    </button>
                    <button onClick={handleCart}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all">
                      <FiZap className="w-4 h-4"/> Buy Now
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-2 border-t border-[var(--border)] pt-4">
                {[[FiShield,'30-day money-back guarantee'],[FiRefreshCw,'Lifetime free updates'],[FiDownload,'Instant download after purchase'],[FiUsers,'Private Discord access']].map(([Icon,text],i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                    <Icon className="w-4 h-4 text-[var(--success)] flex-shrink-0"/>{text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-display font-bold text-[var(--text)] mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {component.techStack?.map(t => (
                  <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)]">{t}</span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-display font-bold text-[var(--text)] mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {component.tags?.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all">
              <FiShare2 className="w-4 h-4"/> Share this Component
            </button>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-extrabold text-2xl text-[var(--text)] mb-5">More in {component.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(c => (
                <Link key={c.slug} href={`/component/${c.slug}`}
                  className="flex items-center gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:shadow-[var(--shadow)] hover:border-[var(--primary)]/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background:`${c.color}15` }}>
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[var(--text)] truncate">{c.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{c.category}</p>
                  </div>
                  <span className={`font-display font-bold text-sm ${c.isFree?'text-green-500':'text-[var(--primary)]'}`}>
                    {c.isFree?'FREE':`$${c.price}`}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link href="/components" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
            <FiArrowLeft className="w-4 h-4"/> Back to Components
          </Link>
        </div>
      </div>
    </div>
  );
}