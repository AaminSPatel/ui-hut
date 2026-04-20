'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import Link from 'next/link';
import { FiPackage, FiDownload, FiEye, FiCheck, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi';

const statusConfig = {
  completed: { label: 'Completed', color: '#10b981', bg: '#10b98115' },
  processing: { label: 'Processing', color: '#f59e0b', bg: '#f59e0b15' },
  refunded: { label: 'Refunded', color: '#ef4444', bg: '#ef444415' },
};

import componentsData from '@/data/components.json';

export default function OrdersPage() {
  const { orders } = useSite();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.items.some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const totalItems = orders.reduce((s, o) => s + o.items.length, 0);

  return (
    <div className="min-h-screen mesh-bg pb-20 pt-10">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display font-extrabold text-4xl text-[var(--text)] mb-2">My Orders</h1>
          <p className="text-[var(--text-muted)]">Track and download your purchased components</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: FiPackage, label: 'Total Orders', value: orders.length, color: '#6366f1' },
            { icon: FiCheck, label: 'Components', value: totalItems, color: '#10b981' },
            { icon: FiDownload, label: 'Total Spent', value: `$${totalSpent}`, color: '#f59e0b' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-[var(--text)]">{s.value}</div>
                <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search orders by ID or component name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-custom pl-11"
          />
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">No orders found</h3>
            <p className="text-[var(--text-muted)] mb-6">
              {search ? 'Try a different search term' : "You haven't made any purchases yet."}
            </p>
            <Link href="/components" className="btn-primary inline-flex items-center gap-2">
              Browse Components <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((order, i) => {
              const status = statusConfig[order.status] || statusConfig.completed;
              const isExpanded = selected === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-[var(--shadow-sm)]"
                >
                  {/* Order Header */}
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-[var(--surface-2)] transition-colors"
                    onClick={() => setSelected(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-[var(--text)]">{order.id}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ color: status.color, background: status.bg }}
                          >
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display font-bold text-xl text-[var(--primary)]">${order.total}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded items */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-[var(--border)]"
                    >
                      <div className="p-5 space-y-3">
                        {order.items.map((item) => {
                          const comp = componentsData.find((c) => c.id === item.id);
                          return (
                            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                style={{ background: comp ? `${comp.color}15` : 'var(--surface)' }}
                              >
                                {comp?.icon || '📦'}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-[var(--text)]">{item.name}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">{comp?.category || 'Component'}</p>
                              </div>
                              <span className="font-bold text-[var(--primary)]">${item.price}</span>
                              <div className="flex gap-2">
                                <Link
                                  href={`/component/${item.slug || comp?.slug || ''}`}
                                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                                >
                                  <FiEye className="w-3.5 h-3.5" /> View
                                </Link>
                                <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 hover:bg-[var(--primary)]/20 transition-all">
                                  <FiDownload className="w-3.5 h-3.5" /> Download
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                          <span className="text-sm text-[var(--text-muted)]">Order Total</span>
                          <span className="font-display font-bold text-lg text-[var(--primary)]">${order.total}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}