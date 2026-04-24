'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import Link from 'next/link';
import {
  FiTrendingUp, FiTrendingDown, FiShoppingBag, FiUsers,
  FiPackage, FiDollarSign, FiArrowRight, FiActivity,
  FiEye, FiRefreshCw
} from 'react-icons/fi';

// Mini bar chart component (no recharts dependency)
function MiniBarChart({ data, color = 'var(--primary)' }) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.revenue / max) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="w-full rounded-t-sm min-h-[4px]"
            style={{ background: i === data.length - 1 ? color : `${color}50` }}
          />
        </div>
      ))}
    </div>
  );
}

// Donut chart (SVG)
function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const radius = 40;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32">
      {data.map((segment, i) => {
        const pct = segment.value / total;
        const offset = cumulative * circumference;
        cumulative += pct;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={20}
            strokeDasharray={`${pct * circumference} ${circumference}`}
            strokeDashoffset={-offset + circumference / 4}
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={30} fill="var(--surface)" />
    </svg>
  );
}

// Line chart (SVG)
function LineChart({ data, color = '#6366f1' }) {
  const max = Math.max(...data.map((d) => d.revenue));
  const min = Math.min(...data.map((d) => d.revenue));
  const W = 300, H = 80;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((d.revenue - min) / (max - min)) * H * 0.8 - H * 0.1;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${H} ${points} ${W},${H}`}
        fill="url(#lineGrad)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * W;
        const y = H - ((d.revenue - min) / (max - min)) * H * 0.8 - H * 0.1;
        return <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 4 : 2.5} fill={color} />;
      })}
    </svg>
  );
}

export default function AdminDashboard() {
  const { analyticsStats, revenueData, categoryData, orders, components } = useSite();
  const [period, setPeriod] = useState('6m');

  const recentOrders = orders.slice(0, 5);
  const topComponents = [...components].sort((a, b) => b.downloads - a.downloads).slice(0, 5);

  const statCards = [
    { label: 'Total Revenue', value: `$${analyticsStats.totalRevenue}`, icon: FiDollarSign, change: '+24%', up: true, color: '#6366f1', sub: 'vs last month' },
    { label: 'Total Orders', value: analyticsStats.totalOrders, icon: FiShoppingBag, change: '+12%', up: true, color: '#f59e0b', sub: `${analyticsStats.completedOrders} completed` },
    { label: 'Customers', value: analyticsStats.totalCustomers, icon: FiUsers, change: '+8%', up: true, color: '#10b981', sub: 'Total registered' },
    { label: 'Components', value: analyticsStats.totalComponents, icon: FiPackage, change: '+3', up: true, color: '#ec4899', sub: 'Published components' },
  ];

  const statusConfig = {
    completed: { bg: '#10b98120', color: '#10b981' },
    processing: { bg: '#f59e0b20', color: '#f59e0b' },
    refunded: { bg: '#ef444420', color: '#ef4444' },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-[var(--text)]">Dashboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          {['1m', '3m', '6m', '1y'].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${period === p ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
              {p}
            </button>
          ))}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] ml-2">
            <FiRefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 relative overflow-hidden group hover:shadow-[var(--shadow)] transition-shadow"
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -translate-y-8 translate-x-8" style={{ background: card.color }} />
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15` }}>
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${card.up ? 'text-green-500 bg-green-500/10' : 'text-red-400 bg-red-400/10'}`}>
                {card.up ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                {card.change}
              </div>
            </div>
            <div className="font-display font-extrabold text-2xl text-[var(--text)]">{card.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">{card.label}</div>
            <div className="text-xs text-[var(--text-subtle)] mt-1">{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-bold text-[var(--text)]">Revenue Overview</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Monthly revenue trend</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" /> Revenue
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="mb-4">
            <LineChart data={revenueData} />
          </div>

          {/* Month labels */}
          <div className="flex justify-between text-xs text-[var(--text-subtle)]">
            {revenueData.map((d) => <span key={d.month}>{d.month}</span>)}
          </div>

          {/* Mini bar chart below */}
          <div className="mt-6 pt-5 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Orders per Month</p>
            </div>
            <div className="flex items-end gap-2 h-12">
              {revenueData.map((d, i) => {
                const max = Math.max(...revenueData.map((r) => r.orders));
                const pct = (d.orders / max) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                      className="w-full rounded-t-sm min-h-[4px]"
                      style={{ background: i === revenueData.length - 1 ? 'var(--accent)' : 'var(--accent)50' }}
                    />
                    <span className="text-xs text-[var(--text-subtle)]">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Category donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6"
        >
          <h3 className="font-display font-bold text-[var(--text)] mb-1">Sales by Category</h3>
          <p className="text-xs text-[var(--text-muted)] mb-5">Component category distribution</p>

          <div className="flex justify-center mb-5">
            <DonutChart data={categoryData} />
          </div>

          <div className="space-y-2.5">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                <span className="text-xs text-[var(--text-muted)] flex-1">{cat.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-[var(--surface-2)] rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${cat.value}%`, background: cat.color }} />
                  </div>
                  <span className="text-xs font-semibold text-[var(--text)] w-7 text-right">{cat.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <div>
              <h3 className="font-display font-bold text-[var(--text)]">Recent Orders</h3>
              <p className="text-xs text-[var(--text-muted)]">{orders.length} total orders</p>
            </div>
            <Link href="/admin/orders" className="text-xs text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentOrders.map((order) => {
              const s = statusConfig[order.status] || statusConfig.completed;
              return (
                <div key={order.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface-2)] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <FiShoppingBag className="w-3.5 h-3.5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--text)] truncate">{order.userName}</p>
                    <p className="text-xs text-[var(--text-muted)]">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[var(--text)]">${order.total}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ color: s.color, background: s.bg }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <div>
              <h3 className="font-display font-bold text-[var(--text)]">Top Components</h3>
              <p className="text-xs text-[var(--text-muted)]">By downloads</p>
            </div>
            <Link href="/admin/components" className="text-xs text-[var(--primary)] flex items-center gap-1 hover:gap-2 transition-all">
              Manage <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {topComponents.map((comp, i) => (
              <div key={comp.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface-2)] transition-colors">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${comp.color}20` }}>
                  {comp.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--text)] truncate">{comp.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 bg-[var(--surface-2)] rounded-full h-1">
                      <div className="h-1 rounded-full" style={{ width: `${(comp.downloads / 4500) * 100}%`, background: comp.color }} />
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">{comp.downloads.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[var(--primary)]">${comp.price}</p>
                  <p className="text-xs text-[var(--text-muted)]">⭐{comp.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5"
      >
        <h3 className="font-display font-bold text-[var(--text)] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Component', icon: FiPackage, href: '/admin/components?action=create', color: '#6366f1' },
            { label: 'View Orders', icon: FiShoppingBag, href: '/admin/orders', color: '#f59e0b' },
            { label: 'Manage Customers', icon: FiUsers, href: '/admin/customers', color: '#10b981' },
            { label: 'Site Settings', icon: FiActivity, href: '/admin/settings', color: '#ec4899' },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] hover:shadow-[var(--shadow)] hover:border-[var(--primary)]/30 transition-all text-center group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${action.color}15` }}>
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)] group-hover:text-[var(--text)]">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}