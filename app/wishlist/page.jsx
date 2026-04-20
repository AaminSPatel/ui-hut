'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import Link from 'next/link';
import ComponentCard from '@/components/ComponentCard';
import { FiHeart, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, isInCart } = useSite();

  const handleRemove = (item) => {
    toggleWishlist(item);
    toast.success('Removed from wishlist', {
      style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
    });
  };

  const handleAddAll = () => {
    wishlist.forEach((item) => { if (!isInCart(item.id)) addToCart(item); });
    toast.success('All items added to cart!', {
      style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
    });
  };

  return (
    <div className="min-h-screen mesh-bg pb-20 pt-10">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="font-display font-extrabold text-4xl text-[var(--text)] mb-2">
              My Wishlist <span className="gradient-text">({wishlist.length})</span>
            </h1>
            <p className="text-[var(--text-muted)]">Components you've saved for later</p>
          </div>
          {wishlist.length > 0 && (
            <button onClick={handleAddAll} className="btn-primary flex items-center gap-2">
              Add All to Cart <FiArrowRight />
            </button>
          )}
        </motion.div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 bg-[var(--surface)] border border-[var(--border)] rounded-3xl">
            <div className="w-24 h-24 rounded-3xl bg-[var(--surface-2)] flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-10 h-10 text-[var(--text-subtle)]" />
            </div>
            <h2 className="font-display font-bold text-2xl text-[var(--text)] mb-3">Your wishlist is empty</h2>
            <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
              Browse our component library and click the heart icon to save components for later.
            </p>
            <Link href="/components" className="btn-primary inline-flex items-center gap-2 py-3 px-7">
              Browse Components <FiArrowRight />
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ComponentCard component={item} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}