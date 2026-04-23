'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck, FiEye, FiGrid, FiList, FiAlertTriangle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = { style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' } };

const EMPTY_FORM = {
  name: '', category: 'ui', price: '', oldPrice: '', description: '',
  longDescription: '', icon: '🎨', color: '#6366f1', badge: '',
  features: '', tags: '', techStack: '',
};

const CATEGORIES = ['layout', 'dashboard', 'auth', 'forms', 'data', 'ecommerce', 'marketing', 'ui'];

function ComponentForm({ initial = EMPTY_FORM, onSave, onCancel, title }) {
  const [form, setForm] = useState(initial);
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      price: parseFloat(form.price),
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
      features: typeof form.features === 'string' ? form.features.split('\n').filter(Boolean) : form.features,
      tags: typeof form.tags === 'string' ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : form.tags,
      techStack: typeof form.techStack === 'string' ? form.techStack.split(',').map((t) => t.trim()).filter(Boolean) : form.techStack,
    });
  };

  const InputGroup = ({ label, field, type = 'text', placeholder, required = false }) => (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} required={required} value={form[field]} onChange={set(field)} placeholder={placeholder} className="input-custom" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] sticky top-0 bg-[var(--surface)] z-10">
          <h2 className="font-display font-bold text-xl text-[var(--text)]">{title}</h2>
          <button onClick={onCancel} className="p-2 rounded-xl hover:bg-[var(--surface-2)] text-[var(--text-muted)]"><FiX /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Component Name" field="name" required placeholder="Hero Carousel" />
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Category</label>
              <select value={form.category} onChange={set('category')} className="input-custom">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <InputGroup label="Price ($)" field="price" type="number" required placeholder="29" />
            <InputGroup label="Old Price ($)" field="oldPrice" type="number" placeholder="49 (optional)" />
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Badge</label>
              <select value={form.badge} onChange={set('badge')} className="input-custom">
                <option value="">None</option>
                {['New', 'Hot', 'Sale', 'Popular', 'Bestseller'].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Icon (emoji)" field="icon" placeholder="🎨" />
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Accent Color</label>
              <div className="flex gap-2">
                <input type="color" value={form.color} onChange={set('color')} className="w-10 h-10 rounded-lg cursor-pointer border border-[var(--border)]" />
                <input type="text" value={form.color} onChange={set('color')} className="input-custom flex-1" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Short Description *</label>
            <textarea required value={form.description} onChange={set('description')} rows={2} placeholder="One-line description for cards..." className="input-custom resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Long Description</label>
            <textarea value={form.longDescription} onChange={set('longDescription')} rows={3} placeholder="Detailed description for component page..." className="input-custom resize-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Features (one per line)</label>
            <textarea
              value={typeof form.features === 'object' ? form.features.join('\n') : form.features}
              onChange={set('features')} rows={4}
              placeholder={'Touch support\nKeyboard navigation\nDark mode'}
              className="input-custom resize-none font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Tags (comma separated)</label>
              <input type="text" value={typeof form.tags === 'object' ? form.tags.join(', ') : form.tags} onChange={set('tags')} placeholder="carousel, hero, animation" className="input-custom" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Tech Stack (comma separated)</label>
              <input type="text" value={typeof form.techStack === 'object' ? form.techStack.join(', ') : form.techStack} onChange={set('techStack')} placeholder="React, Framer Motion, Tailwind" className="input-custom" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
              <FiCheck className="w-4 h-4" /> Save Component
            </button>
            <button type="button" onClick={onCancel} className="btn-ghost py-3 px-6">Cancel</button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function DeleteConfirm({ name, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 max-w-sm w-full shadow-[var(--shadow-lg)]"
      >
        <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="font-display font-bold text-lg text-[var(--text)] text-center mb-2">Delete Component?</h3>
        <p className="text-sm text-[var(--text-muted)] text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-[var(--text)]">"{name}"</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors">Delete</button>
          <button onClick={onCancel} className="flex-1 btn-ghost py-2.5 text-sm">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminComponentsPage() {
  const { components, createComponent, updateComponent, deleteComponent } = useSite();
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = components.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (data) => {
    await createComponent(data);
    setShowForm(false);
    toast.success('Component created!', toastStyle);
  };

  const handleUpdate = async (data) => {
    await updateComponent(editTarget.id, data);
    setEditTarget(null);
    toast.success('Component updated!', toastStyle);
  };

  const handleDelete = async () => {
    await deleteComponent(deleteTarget.id);
    setDeleteTarget(null);
    toast.success('Component deleted', toastStyle);
  };

  const toFormValues = (c) => ({
    ...c,
    features: Array.isArray(c.features) ? c.features.join('\n') : c.features || '',
    tags: Array.isArray(c.tags) ? c.tags.join(', ') : c.tags || '',
    techStack: Array.isArray(c.techStack) ? c.techStack.join(', ') : c.techStack || '',
    oldPrice: c.oldPrice || '',
    badge: c.badge || '',
  });

  return (
    <div className="p-6">
      <AnimatePresence>
        {showForm && <ComponentForm title="Add New Component" onSave={handleCreate} onCancel={() => setShowForm(false)} />}
        {editTarget && <ComponentForm title={`Edit: ${editTarget.name}`} initial={toFormValues(editTarget)} onSave={handleUpdate} onCancel={() => setEditTarget(null)} />}
        {deleteTarget && <DeleteConfirm name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-[var(--text)]">Components</h1>
          <p className="text-sm text-[var(--text-muted)]">{components.length} components in library</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <FiPlus className="w-4 h-4" /> Add Component
        </button>
      </div>

      {/* Search + view */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input type="text" placeholder="Search components..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-custom pl-10" />
        </div>
        <div className="flex border border-[var(--border)] rounded-xl overflow-hidden">
          {[['grid', FiGrid], ['list', FiList]].map(([v, Icon]) => (
            <button key={v} onClick={() => setView(v)} className={`p-2.5 ${view === v ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]'} transition-all`}>
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((comp, i) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-[var(--shadow)] transition-shadow"
            >
              <div className="p-4 flex items-center gap-3 border-b border-[var(--border)]" style={{ background: `${comp.color}08` }}>
                <div className="text-3xl">{comp.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-[var(--text)] truncate">{comp.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{comp.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-[var(--primary)]">${comp.price}</p>
                  {comp.badge && <span className="text-xs" style={{ color: comp.color }}>{comp.badge}</span>}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">{comp.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-subtle)]">
                    <span>⭐ {comp.rating}</span>
                    <span>↓ {comp.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => window.open(`/component/${comp.slug}`, '_blank')} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-all">
                      <FiEye className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setEditTarget(comp)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteTarget(comp)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 transition-all">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Component</th>
                <th>Category</th>
                <th>Price</th>
                <th>Downloads</th>
                <th>Rating</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((comp) => (
                <tr key={comp.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{comp.icon}</span>
                      <div>
                        <p className="font-medium text-sm text-[var(--text)]">{comp.name}</p>
                        {comp.badge && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: `${comp.color}15`, color: comp.color }}>{comp.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td><span className="text-xs px-2 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)]">{comp.category}</span></td>
                  <td>
                    <span className="font-bold text-[var(--primary)]">${comp.price}</span>
                    {comp.oldPrice && <span className="text-xs text-[var(--text-subtle)] line-through ml-1">${comp.oldPrice}</span>}
                  </td>
                  <td className="text-sm text-[var(--text-muted)]">{comp.downloads.toLocaleString()}</td>
                  <td className="text-sm text-[var(--text)]">⭐ {comp.rating}</td>
                  <td className="text-xs text-[var(--text-muted)]">{comp.updatedAt}</td>
                  <td>
                    <div className="flex gap-1.5">
                      <button onClick={() => window.open(`/component/${comp.slug}`, '_blank')} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] transition-all"><FiEye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditTarget(comp)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all"><FiEdit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteTarget(comp)} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 transition-all"><FiTrash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}