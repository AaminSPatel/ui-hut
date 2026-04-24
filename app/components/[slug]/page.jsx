"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import componentPreviews from '../../../data/component-previews.json';

function importComponent(fileName) {
  const fileBase = fileName.replace('.jsx', '');
  try {
    return require('../../components/' + fileBase);
  } catch (e) {
    try {
      return require('../../comp/' + fileBase);
    } catch (e2) {
      console.error('Load error:', e2);
      return null;
    }
  }
}

export default function ComponentPage() {
  const { slug } = useParams();
  const info = componentPreviews.find(c => c.slug === slug);
  const [Demo, setDemo] = useState(null);

  useEffect(() => {
    if (!info) return;
    const mod = importComponent(info.file);
    if (mod) setDemo(() => mod[info.demo] || mod.default);
  }, [info]);

  if (!info || !Demo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-12 bg-white/10 rounded-3xl border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-4">Component Not Found</h1>
          <Link href="/components" className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl">Back to Components</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <Link href="/components">Back to Components</Link>
          <span>/</span>
          <span className="font-semibold text-white">{info.name}</span>
        </div>
        <div className="bg-white/5 rounded-3xl border border-white/20 p-8">
          <h1 className="text-3xl font-black text-white mb-6">{info.name}</h1>
          <div className="min-h-[500px] rounded-2xl border-4 border-white/10 bg-black/20 p-8 flex items-center justify-center">
            <Demo />
          </div>
        </div>
      </div>
    </div>
  );
}
