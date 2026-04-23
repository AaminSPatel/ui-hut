'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { FiSearch, FiTrash2, FiEdit2, FiEye, FiAlertTriangle, FiX, FiCheck, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = { style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } };

const STATUS_OPTIONS = ['completed', 'processing', 'refunded'];
const STATUS_COLORS = {
  completed: { bg: '#10b98120', color: '#10b981' },
  processing: { bg: '#f59e0b20', color: '#f59e0b' },
  refunded: { bg: '#ef444420', color: '#ef4444' },
};

function StatusModal({ order, onSave, onClose }) {
  const [status, setStatus] = useState(order.status);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-[var(--text)]">Update Order Status</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-muted)]"><FiX /></button>
        </div>
        <p className="text-sm text-[var(--text-muted)] mb-4">Order: <span className="font-mono font-bold text-[var(--text)]">{order.id}</span></p>
        <div className="space-y-2 mb-5">
          {STATUS_OPTIONS.map((s) => {
            const sc = STATUS_COLORS[s];
            return (
              <button key={s} onClick={() => setStatus(s)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-medium ${status === s ? 'border-[var(--primary)] bg-[var(--primary)]/10' : 'border-[var(--border)] hover:border-[var(--primary)]/30'}`}>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: sc.bg, color: sc.color }}>{s}</span>
                {status === s && <FiCheck className="w-4 h-4 text-[var(--primary)]" />}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <button onClick={() => onSave(status)} className="flex-1 btn-primary py-2.5 text-sm">Update Status</button>
          <button onClick={onClose} className="btn-ghost py-2.5 px-5 text-sm">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OrderDetailModal({ order, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 max-w-lg w-full shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-xl text-[var(--text)]">Order Details</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--surface-2)] text-[var(--text-muted)]"><FiX /></button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[['Order ID', order.id], ['Date', order.date], ['Customer', order.userName], ['Email', order.email], ['Payment', order.paymentMethod], ['Status', order.status]].map(([l, v]) => (
              <div key={l} className="p-3 rounded-xl bg-[var(--surface-2)]">
                <p className="text-xs text-[var(--text-muted)] mb-0.5">{l}</p>
                <p className="text-sm font-medium text-[var(--text)]">
                  {l === 'Status' ? (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: STATUS_COLORS[v]?.bg, color: STATUS_COLORS[v]?.color }}>{v}</span>
                  ) : v}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Items</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-2)]">
                  <span className="text-sm text-[var(--text)]">{item.name}</span>
                  <span className="font-bold text-[var(--primary)]">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)]">
            <span className="font-semibold text-[var(--text)]">Total</span>
            <span className="font-display font-extrabold text-xl text-[var(--primary)]">${order.total}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, deleteOrder } = useSite();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTarget, setEditTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.userName.toLowerCase().includes(search.toLowerCase()) || o.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  const handleUpdateStatus = async (status) => {
    await updateOrderStatus(editTarget.id, status);
    setEditTarget(null);
    toast.success('Order status updated!', toastStyle);
  };

  const handleDelete = async () => {
    await deleteOrder(deleteTarget.id);
    setDeleteTarget(null);
    toast.success('Order deleted', toastStyle);
  };

  const totalRevenue = filtered.filter((o) => o.status === 'completed').reduce((s, o) => s + o.total, 0);

  return (
    <div className="p-6">
      <AnimatePresence>
        {editTarget && <StatusModal order={editTarget} onSave={handleUpdateStatus} onClose={() => setEditTarget(null)} />}
        {viewTarget && <OrderDetailModal order={viewTarget} onClose={() => setViewTarget(null)} />}
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-4"><FiAlertTriangle className="w-6 h-6 text-red-400" /></div>
              <h3 className="font-display font-bold text-lg text-[var(--text)] text-center mb-2">Delete Order?</h3>
              <p className="text-sm text-[var(--text-muted)] text-center mb-6">Delete order <span className="font-mono font-bold text-[var(--text)]">{deleteTarget.id}</span>?</p>
              <div className="flex gap-3">
                <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm">Delete</button>
                <button onClick={() => setDeleteTarget(null)} className="flex-1 btn-ghost py-2.5 text-sm">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-[var(--text)]">Orders</h1>
          <p className="text-sm text-[var(--text-muted)]">{orders.length} total · Revenue: <span className="text-[var(--primary)] font-bold">${totalRevenue}</span></p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'All', count: orders.length, value: 'all', color: 'var(--primary)' },
          { label: 'Completed', count: orders.filter((o) => o.status === 'completed').length, value: 'completed', color: '#10b981' },
          { label: 'Processing', count: orders.filter((o) => o.status === 'processing').length, value: 'processing', color: '#f59e0b' },
          { label: 'Refunded', count: orders.filter((o) => o.status === 'refunded').length, value: 'refunded', color: '#ef4444' },
        ].map((s) => (
          <button key={s.value} onClick={() => setFilter(s.value)}
            className={`p-3 rounded-xl border text-left transition-all ${filter === s.value ? 'border-[var(--primary)]/30 bg-[var(--primary)]/10' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/20'}`}>
            <div className="font-display font-bold text-2xl" style={{ color: s.color }}>{s.count}</div>
            <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input type="text" placeholder="Search by order ID, customer name, or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-custom pl-10" />
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const sc = STATUS_COLORS[order.status] || STATUS_COLORS.completed;
              return (
                <tr key={order.id}>
                  <td><span className="font-mono text-xs font-bold text-[var(--primary)]">{order.id}</span></td>
                  <td>
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{order.userName}</p>
                      <p className="text-xs text-[var(--text-muted)]">{order.email}</p>
                    </div>
                  </td>
                  <td><span className="text-sm text-[var(--text-muted)]">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span></td>
                  <td><span className="font-bold text-[var(--primary)]">${order.total}</span></td>
                  <td><span className="text-xs px-2 py-1 rounded-lg border border-[var(--border)] text-[var(--text-muted)]">{order.paymentMethod}</span></td>
                  <td><span className="text-xs text-[var(--text-muted)]">{order.date}</span></td>
                  <td>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: sc.bg, color: sc.color }}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1.5">
                      <button onClick={() => setViewTarget(order)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-all" title="View"><FiEye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditTarget(order)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all" title="Edit Status"><FiEdit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteTarget(order)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 transition-all" title="Delete"><FiTrash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--text-muted)]">No orders found</div>
        )}
      </div>
    </div>
  );
}