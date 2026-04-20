'use client';

import { useState } from 'react';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';

export default function EditableText({ 
  initialText, 
  onSave, 
  className = "",
  isEditable = true,
  tag: Tag = 'span'
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(initialText);
    setIsEditing(false);
  };

  if (!isEditable) {
    return <Tag className={className}>{text}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-primary rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        <button onClick={handleSave} className="text-green-500 hover:text-green-600">
          <FiCheck />
        </button>
        <button onClick={handleCancel} className="text-red-500 hover:text-red-600">
          <FiX />
        </button>
      </div>
    );
  }

  return (
    <div className="group relative inline-block">
      <Tag className={className}>{text}</Tag>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary"
      >
        <FiEdit2 size={14} />
      </button>
    </div>
  );
}