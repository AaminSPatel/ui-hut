'use client';

import { useState, useEffect } from 'react';
import { useSite } from '@/context/SiteContext';
import { motion } from 'framer-motion';
import { FiSave, FiRefreshCw, FiImage, FiSettings, FiPackage, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';
import componentsData from '@/data/components.json';

export default function AdminPage() {
  const { config, updateConfig } = useSite();
  const [activeTab, setActiveTab] = useState('general');
  const [siteSettings, setSiteSettings] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updateConfig(siteSettings);
      toast.success('Settings saved successfully!');
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your website settings, components, and content</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: 'general', label: 'General Settings', icon: FiSettings },
                  { id: 'components', label: 'Components', icon: FiPackage },
                  { id: 'carousel', label: 'Carousel Images', icon: FiImage },
                  { id: 'seo', label: 'SEO Info', icon: FiInfo },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">General Settings</h2>
                  
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Brand Name</label>
                    <input
                      type="text"
                      value={siteSettings.brandName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, brandName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Tagline</label>
                    <input
                      type="text"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Primary Color (Hex)</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={siteSettings.theme.primaryColor}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings,
                          theme: { ...siteSettings.theme, primaryColor: e.target.value }
                        })}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={siteSettings.theme.primaryColor}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings,
                          theme: { ...siteSettings.theme, primaryColor: e.target.value }
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={siteSettings.contact.email}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        contact: { ...siteSettings.contact, email: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={siteSettings.contact.phone}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        contact: { ...siteSettings.contact, phone: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
                    <textarea
                      value={siteSettings.contact.address}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        contact: { ...siteSettings.contact, address: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'components' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Components</h2>
                  <div className="space-y-4">
                    {componentsData.map((component) => (
                      <div key={component.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{component.name}</h3>
                            <p className="text-sm text-gray-500">${component.price}</p>
                          </div>
                          <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors">
                    + Add New Component
                  </button>
                </div>
              )}

              {activeTab === 'carousel' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Carousel Images</h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Drag & drop images here or click to upload</p>
                    <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
                      Upload Images
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Settings</h2>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={siteSettings.seo?.title || ''}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        seo: { ...siteSettings.seo, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
                    <textarea
                      value={siteSettings.seo?.description || ''}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        seo: { ...siteSettings.seo, description: e.target.value }
                      })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <FiRefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <FiSave className="w-5 h-5" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save All Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}