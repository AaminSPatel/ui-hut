'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '@/context/SiteContext';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageCircle, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Corousel1 from './Carousel1';
import Corousel2 from './Carousel2';
import Corousel3 from './Carousel3';
import Corousel4 from './Carousel4';
import Corousel5 from './Carousel5';
import Corousel6 from './Carousel6';
import Corousel7 from './Carousel7';
import Corousel8 from './Carousel8';
import Corousel9 from './Carousel9';
import Corousel10 from './Carousel10';
import Corousel11 from './Carousel11';
import Corousel12 from './Carousel12';
/* import Corousel13 from './Carousel13'; */
const toastStyle = {
  style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
};

export default function ContactPage() {
  const { config } = useSite();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setSubmitting(false);
    toast.success('Message sent! We\'ll reply within 24 hours.', toastStyle);
  };

  const contactItems = [
    { icon: FiMail, title: 'Email', value: config.contact.email, color: '#6366f1', href: `mailto:${config.contact.email}` },
    { icon: FiPhone, title: 'Phone', value: config.contact.phone, color: '#10b981', href: `tel:${config.contact.phone}` },
    { icon: FiMapPin, title: 'Office', value: config.contact.address, color: '#f59e0b', href: '#' },
    { icon: FiClock, title: 'Business Hours', value: 'Mon–Fri: 9AM–6PM IST', color: '#8b5cf6', href: '#' },
  ];

  return (
    <div className="min-h-screen mesh-bg pb-20 pt-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
       <Corousel1 />
       <Corousel2 />
       <Corousel3 />
       <Corousel4 />
       <Corousel5 />
       <Corousel6 />
       <Corousel7 />
       <Corousel8 />
       <Corousel9 />
       <Corousel10 />
       <Corousel11 />
       <Corousel12 />
      {/*  <Corousel13 /> */}
      </div>
    </div>
  );
}