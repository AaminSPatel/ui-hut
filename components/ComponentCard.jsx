'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiShoppingCart, FiEye, FiStar, FiHeart, FiDownload } from 'react-icons/fi';
import { useSite } from '@/context/SiteContext';
import toast from 'react-hot-toast';

export default function ComponentCard({ component }) {
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useSite();
  const inCart = isInCart(component.id);
  const inWishlist = isInWishlist(component.id);

  const handleCart = (e) => {
    e.preventDefault();
    if (inCart) return;
    addToCart(component);
    toast.success(`${component.name} added to cart!`, {
      style: {
        background: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(component);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!', {
      style: {
        background: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--border)',
      },
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-300"
    >
      {/* Card preview area */}
      <div
        className="relative h-48 overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${component.color}22, ${component.color}08)`,
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${component.color}40 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 text-6xl float"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {component.icon}
        </motion.div>

        {/* Price badge */}
        <div className="absolute top-3 left-3">
          <div
            className="px-3 py-1 rounded-lg text-white text-sm font-bold shadow-lg"
            style={{ background: `linear-gradient(135deg, ${component.color}, ${component.color}cc)` }}
          >
            ${component.price}
            {component.oldPrice && (
              <span className="ml-1 line-through opacity-60 text-xs">${component.oldPrice}</span>
            )}
          </div>
        </div>

        {/* Badge */}
        {component.badge && (
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white"
              style={{
                background: component.badge === 'New' ? '#10b981' :
                            component.badge === 'Hot' ? '#ef4444' :
                            component.badge === 'Sale' ? '#f59e0b' : '#8b5cf6',
              }}
            >
              {component.badge}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-[var(--surface)]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <FiHeart
            className={`w-4 h-4 transition-colors ${inWishlist ? 'text-red-500 fill-current' : 'text-[var(--text-muted)]'}`}
          />
        </button>
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Category + Rating */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: `${component.color}15`, color: component.color }}
          >
            {component.category}
          </span>
          <div className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5 fill-current text-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-[var(--text)]">{component.rating}</span>
            <span className="text-xs text-[var(--text-muted)]">({component.downloads.toLocaleString()})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-lg text-[var(--text)] mb-1.5 leading-tight">
          {component.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">
          {component.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {component.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-xs">
              #{tag}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {component.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <Link
            href={`/component/${component.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all"
          >
            <FiEye className="w-4 h-4" />
            Preview
          </Link>
          <button
            onClick={handleCart}
            disabled={inCart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-60"
            style={{
              background: inCart
                ? '#10b981'
                : `linear-gradient(135deg, var(--primary), var(--primary-dark))`,
              boxShadow: !inCart ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
            }}
          >
            {inCart ? (
              <>✓ In Cart</>
            ) : (
              <><FiShoppingCart className="w-4 h-4" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>

      {/* Bottom shine on hover */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${component.color}, transparent)` }}
      />
    </motion.div>
  );
}