'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';

export default function EditableText({
  initialText,
  onSave,
  className = '',
  isEditable = true,
  tag: Tag = 'span',
  placeholder = 'Click to edit...',
  multiline = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current.select) inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (text.trim() === '') { handleCancel(); return; }
    onSave?.(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(initialText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  if (!isEditable) return <Tag className={className}>{text}</Tag>;

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 w-full"
      >
        {multiline ? (
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-2 rounded-lg border border-[var(--primary)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
            rows={3}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--primary)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
          />
        )}
        <button
          onClick={handleSave}
          className="p-1.5 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors flex-shrink-0"
        >
          <FiCheck className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors flex-shrink-0"
        >
          <FiX className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    );
  }

  return (
    <div
      className="group relative inline-flex items-center gap-1.5 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      <Tag className={`${className} ${hovered ? 'opacity-80' : ''} transition-opacity`}>
        {text || <span className="text-[var(--text-subtle)] italic">{placeholder}</span>}
      </Tag>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1 }}
            className="flex-shrink-0 p-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)]"
          >
            <FiEdit2 className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}