'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import Link from 'next/link';
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

export default function CartDrawer() {
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useSite();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm z-[70] flex flex-col"
            style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="font-display font-bold text-lg text-[var(--text)]">Your Cart</h2>
                <span className="badge" style={{ background: 'var(--primary)', color: 'white' }}>
                  {cart.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-muted)] transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center mb-4">
                    <FiShoppingBag className="w-8 h-8 text-[var(--text-subtle)]" />
                  </div>
                  <h3 className="font-display font-bold text-[var(--text)] mb-2">Your cart is empty</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">Add some components to get started</p>
                  <Link
                    href="/components"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary text-sm"
                  >
                    Browse Components
                  </Link>
                </div>
              ) : (
                cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--text)] truncate">{item.name}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-[var(--primary)]">${item.price}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[var(--border)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Total</span>
                  <span className="font-display font-bold text-2xl gradient-text">${cartTotal}</span>
                </div>
                <button className="w-full btn-primary flex items-center justify-center gap-2 py-3">
                  Checkout Now <FiArrowRight />
                </button>
                <Link
                  href="/components"
                  onClick={() => setIsCartOpen(false)}
                  className="block text-center text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}