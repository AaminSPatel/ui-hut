'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '@/components/ComponentCard';
import componentsData from '@/data/components.json';
import { FiSearch, FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ComponentsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');

  const categories = ['all', ...new Set(componentsData.map((c) => c.category))];

  const filtered = useMemo(() => {
    let list = componentsData.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === 'all' || c.category === category;
      return matchSearch && matchCat;
    });

    switch (sort) {
      case 'popular': return list.sort((a, b) => b.downloads - a.downloads);
      case 'newest': return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      case 'price-asc': return list.sort((a, b) => a.price - b.price);
      case 'price-desc': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [search, category, sort]);

  return (
    <div className="min-h-screen mesh-bg pt-10 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-4 border border-[var(--primary)]/20">
            🎨 Component Library
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-[var(--text)] mb-4">
            Complete <span className="gradient-text">UI Component</span> Library
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            {componentsData.length}+ production-ready components. Each built with best practices, fully accessible, and highly customizable.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 mb-8 shadow-[var(--shadow-sm)]"
        >
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
              <input
                type="text"
                placeholder="Search components, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-custom pl-10 pr-10"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]">
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="input-custom pl-9 pr-4 cursor-pointer min-w-[180px]"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              {/* View toggle */}
              <div className="flex border border-[var(--border)] rounded-xl overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2.5 ${view === 'grid' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'} transition-all`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2.5 ${view === 'list' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'} transition-all`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`category-pill ${category === cat ? 'active' : ''}`}
              >
                {cat === 'all' ? '✦ All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--text-muted)]">
            Showing <span className="text-[var(--text)] font-semibold">{filtered.length}</span> of {componentsData.length} components
            {search && <> for "<span className="text-[var(--primary)]">{search}</span>"</>}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-[var(--text)] mb-2">No components found</h3>
            <p className="text-[var(--text-muted)] mb-4">Try a different search term or category</p>
            <button onClick={() => { setSearch(''); setCategory('all'); }} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
            }
          >
            {filtered.map((component, i) => (
              <motion.div
                key={component.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {view === 'grid' ? (
                  <ComponentCard component={component} />
                ) : (
                  <ListCard component={component} />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ListCard({ component }) {
  const { addToCart, isInCart } = require('@/context/SiteContext').useSite();
  const inCart = isInCart(component.id);

  return (
    <div className="flex items-center gap-5 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl hover:shadow-[var(--shadow)] transition-all group">
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
        style={{ background: `${component.color}15` }}
      >
        {component.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display font-bold text-[var(--text)]">{component.name}</h3>
          {component.badge && (
            <span className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)]">{component.badge}</span>
          )}
        </div>
        <p className="text-sm text-[var(--text-muted)] line-clamp-1">{component.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-[var(--text-subtle)]">⭐ {component.rating}</span>
          <span className="text-xs text-[var(--text-subtle)]">↓ {component.downloads.toLocaleString()}</span>
          {component.tags.slice(0, 2).map((t) => (
            <span key={t} className="tag text-xs">#{t}</span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="text-right">
          <div className="font-display font-bold text-xl text-[var(--primary)]">${component.price}</div>
          {component.oldPrice && <div className="text-xs text-[var(--text-subtle)] line-through">${component.oldPrice}</div>}
        </div>
        <div className="flex gap-2">
          <a
            href={`/component/${component.slug}`}
            className="btn-ghost text-sm py-2 px-4"
          >
            Preview
          </a>
          <button
            onClick={() => { if (!inCart) addToCart(component); }}
            disabled={inCart}
            className="btn-primary text-sm py-2 px-4 disabled:opacity-60"
          >
            {inCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}