'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import siteConfig from '@/data/siteConfig.json';
import componentsData from '@/data/components.json';

const SiteContext = createContext();
export const useSite = () => useContext(SiteContext);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_KEY || 'uihut_admin_2024';

const DUMMY_USER = {
  id: 'usr_001', name: 'Rahul Sharma', email: 'rahul@example.com',
  avatar: null, joinedAt: '2024-01-15', plan: 'Pro', role: 'user',
};

const DUMMY_ADMIN = {
  id: 'adm_001', name: 'Admin User', email: 'admin@uihut.dev',
  avatar: null, role: 'admin',
};

const DUMMY_ORDERS = [
  { id: 'ORD-001', userId: 'usr_001', userName: 'Rahul Sharma', email: 'rahul@example.com', date: '2024-12-01', status: 'completed', items: [{ id: 1, name: 'Hero Carousel Pro', price: 29, slug: 'hero-carousel-pro' }], total: 29, paymentMethod: 'Card' },
  { id: 'ORD-002', userId: 'usr_002', userName: 'Priya Singh', email: 'priya@example.com', date: '2024-11-20', status: 'completed', items: [{ id: 3, name: 'Auth System Complete', price: 39, slug: 'auth-system-complete' }, { id: 7, name: 'Notification System', price: 25, slug: 'notification-system' }], total: 64, paymentMethod: 'UPI' },
  { id: 'ORD-003', userId: 'usr_003', userName: 'Karan Joshi', email: 'karan@example.com', date: '2024-12-10', status: 'processing', items: [{ id: 2, name: 'Dashboard Analytics', price: 49, slug: 'dashboard-analytics' }], total: 49, paymentMethod: 'Card' },
  { id: 'ORD-004', userId: 'usr_004', userName: 'Sneha Patel', email: 'sneha@example.com', date: '2024-12-15', status: 'refunded', items: [{ id: 5, name: 'E-commerce Product Card', price: 19, slug: 'ecommerce-product-card' }], total: 19, paymentMethod: 'UPI' },
  { id: 'ORD-005', userId: 'usr_005', userName: 'Amit Kumar', email: 'amit@example.com', date: '2024-12-18', status: 'completed', items: [{ id: 6, name: 'Rich Text Editor', price: 45, slug: 'rich-text-editor' }], total: 45, paymentMethod: 'Card' },
];

const DUMMY_CUSTOMERS = [
  { id: 'usr_001', name: 'Rahul Sharma', email: 'rahul@example.com', plan: 'Pro', joinedAt: '2024-01-15', totalSpent: 93, orders: 2, status: 'active' },
  { id: 'usr_002', name: 'Priya Singh', email: 'priya@example.com', plan: 'Free', joinedAt: '2024-03-20', totalSpent: 64, orders: 1, status: 'active' },
  { id: 'usr_003', name: 'Karan Joshi', email: 'karan@example.com', plan: 'Pro', joinedAt: '2024-06-01', totalSpent: 49, orders: 1, status: 'active' },
  { id: 'usr_004', name: 'Sneha Patel', email: 'sneha@example.com', plan: 'Free', joinedAt: '2024-08-10', totalSpent: 19, orders: 1, status: 'inactive' },
  { id: 'usr_005', name: 'Amit Kumar', email: 'amit@example.com', plan: 'Enterprise', joinedAt: '2024-09-05', totalSpent: 220, orders: 5, status: 'active' },
];

const REVENUE_DATA = [
  { month: 'Jul', revenue: 820, orders: 18, customers: 12 },
  { month: 'Aug', revenue: 1240, orders: 27, customers: 19 },
  { month: 'Sep', revenue: 980, orders: 22, customers: 15 },
  { month: 'Oct', revenue: 1680, orders: 38, customers: 29 },
  { month: 'Nov', revenue: 2100, orders: 45, customers: 34 },
  { month: 'Dec', revenue: 2850, orders: 62, customers: 48 },
];

const CATEGORY_DATA = [
  { name: 'Layout', value: 35, color: '#6366f1' },
  { name: 'Dashboard', value: 22, color: '#f59e0b' },
  { name: 'Auth', value: 18, color: '#10b981' },
  { name: 'Forms', value: 14, color: '#ec4899' },
  { name: 'Data', value: 11, color: '#8b5cf6' },
];

async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  try {
    const headers = { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) };
    const res = await fetch(`${API_BASE}${endpoint}`, { method, headers, ...(body && { body: JSON.stringify(body) }) });
    if (!res.ok) throw new Error(`API ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[UI Hut] Backend not connected, using local state:', err.message);
    return null;
  }
}

export function SiteProvider({ children }) {
  const [config, setConfig] = useState(siteConfig);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [components, setComponents] = useState(componentsData);
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [customers, setCustomers] = useState(DUMMY_CUSTOMERS);
  const [revenueData] = useState(REVENUE_DATA);
  const [categoryData] = useState(CATEGORY_DATA);

  useEffect(() => {
    const savedTheme = localStorage.getItem('uihut-theme');
    const isDark = savedTheme ? savedTheme === 'dark' : config.theme.darkMode;
    applyTheme(isDark);
    setDarkMode(isDark);

    try {
      const savedCart = localStorage.getItem('uihut-cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('uihut-wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      const savedUser = localStorage.getItem('uihut-user');
      if (savedUser) setUser(JSON.parse(savedUser));
      const savedToken = localStorage.getItem('uihut-token');
      if (savedToken) setAuthToken(savedToken);
      const adminAuth = sessionStorage.getItem('uihut-admin-auth');
      if (adminAuth === 'true') { setIsAdminAuthenticated(true); setAdminUser(DUMMY_ADMIN); }
    } catch (e) {}
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', config.theme.primaryColor);
  }, [config.theme.primaryColor]);

  const applyTheme = (isDark) => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const toggleDarkMode = () => {
    const n = !darkMode;
    setDarkMode(n);
    applyTheme(n);
    localStorage.setItem('uihut-theme', n ? 'dark' : 'light');
  };

  const updateConfig = (newConfig) => {
    setConfig(newConfig);
    apiCall('/admin/config', 'PUT', newConfig, authToken);
  };

  // USER AUTH
  const signIn = async (email, password) => {
    setAuthLoading(true); setAuthError(null);
    try {
      const data = await apiCall('/auth/login', 'POST', { email, password });
      if (data?.token) {
        setAuthToken(data.token); setUser(data.user);
        localStorage.setItem('uihut-token', data.token);
        localStorage.setItem('uihut-user', JSON.stringify(data.user));
        return { success: true };
      }
      if (email === 'demo@uihut.dev' && password === 'demo123') {
        setUser(DUMMY_USER);
        localStorage.setItem('uihut-user', JSON.stringify(DUMMY_USER));
        return { success: true };
      }
      throw new Error('Invalid email or password');
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally { setAuthLoading(false); }
  };

  const signUp = async (name, email, password) => {
    setAuthLoading(true); setAuthError(null);
    try {
      const data = await apiCall('/auth/register', 'POST', { name, email, password });
      if (data?.token) {
        setAuthToken(data.token); setUser(data.user);
        localStorage.setItem('uihut-token', data.token);
        localStorage.setItem('uihut-user', JSON.stringify(data.user));
        return { success: true };
      }
      const newUser = { id: `usr_${Date.now()}`, name, email, plan: 'Free', joinedAt: new Date().toISOString().split('T')[0], role: 'user' };
      setUser(newUser);
      localStorage.setItem('uihut-user', JSON.stringify(newUser));
      return { success: true };
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally { setAuthLoading(false); }
  };

  const signOut = () => {
    setUser(null); setAuthToken(null);
    localStorage.removeItem('uihut-token');
    localStorage.removeItem('uihut-user');
  };

  // ADMIN AUTH
  const adminLogin = async (email, password, secretKey) => {
    setAuthLoading(true); setAuthError(null);
    try {
      if (secretKey !== ADMIN_SECRET) throw new Error('Invalid admin secret key');
      const data = await apiCall('/admin/auth/login', 'POST', { email, password, secretKey });
      if (data?.token) {
        setAuthToken(data.token); setAdminUser(data.admin);
        setIsAdminAuthenticated(true);
        sessionStorage.setItem('uihut-admin-auth', 'true');
        return { success: true };
      }
      if (email === 'admin@uihut.dev' && password === 'admin123') {
        setAdminUser(DUMMY_ADMIN); setIsAdminAuthenticated(true);
        sessionStorage.setItem('uihut-admin-auth', 'true');
        return { success: true };
      }
      throw new Error('Invalid admin credentials');
    } catch (err) {
      setAuthError(err.message);
      return { success: false, error: err.message };
    } finally { setAuthLoading(false); }
  };

  const adminLogout = () => {
    setAdminUser(null); setIsAdminAuthenticated(false);
    sessionStorage.removeItem('uihut-admin-auth');
  };

  // CART
  const addToCart = (c) => setCart((prev) => {
    if (prev.find((i) => i.id === c.id)) return prev;
    const n = [...prev, { ...c, quantity: 1 }];
    localStorage.setItem('uihut-cart', JSON.stringify(n));
    return n;
  });
  const removeFromCart = (id) => setCart((prev) => {
    const n = prev.filter((i) => i.id !== id);
    localStorage.setItem('uihut-cart', JSON.stringify(n));
    return n;
  });
  const clearCart = () => { setCart([]); localStorage.removeItem('uihut-cart'); };
  const isInCart = (id) => cart.some((i) => i.id === id);
  const cartTotal = cart.reduce((s, i) => s + i.price, 0);
  const cartCount = cart.length;

  // WISHLIST
  const toggleWishlist = (c) => setWishlist((prev) => {
    const exists = prev.find((i) => i.id === c.id);
    const n = exists ? prev.filter((i) => i.id !== c.id) : [...prev, c];
    localStorage.setItem('uihut-wishlist', JSON.stringify(n));
    return n;
  });
  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  // ADMIN CRUD: Components
  const createComponent = async (data) => {
    const newComp = { ...data, id: Date.now(), slug: data.name.toLowerCase().replace(/ /g, '-'), downloads: 0, rating: 5.0, updatedAt: new Date().toISOString().split('T')[0] };
    setComponents((prev) => [newComp, ...prev]);
    await apiCall('/admin/components', 'POST', newComp, authToken);
    return newComp;
  };
  const updateComponent = async (id, data) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString().split('T')[0] } : c)));
    await apiCall(`/admin/components/${id}`, 'PUT', data, authToken);
  };
  const deleteComponent = async (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
    await apiCall(`/admin/components/${id}`, 'DELETE', null, authToken);
  };

  // ADMIN CRUD: Orders
  const updateOrderStatus = async (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await apiCall(`/admin/orders/${id}`, 'PUT', { status }, authToken);
  };
  const deleteOrder = async (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await apiCall(`/admin/orders/${id}`, 'DELETE', null, authToken);
  };

  // ADMIN CRUD: Customers
  const updateCustomer = async (id, data) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    await apiCall(`/admin/customers/${id}`, 'PUT', data, authToken);
  };
  const deleteCustomer = async (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    await apiCall(`/admin/customers/${id}`, 'DELETE', null, authToken);
  };

  // ANALYTICS
  const analyticsStats = {
    totalRevenue: orders.filter((o) => o.status === 'completed').reduce((s, o) => s + o.total, 0),
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalComponents: components.length,
    avgOrderValue: orders.length ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0,
    completedOrders: orders.filter((o) => o.status === 'completed').length,
    processingOrders: orders.filter((o) => o.status === 'processing').length,
    refundedOrders: orders.filter((o) => o.status === 'refunded').length,
  };

  return (
    <SiteContext.Provider value={{
      config, updateConfig,
      darkMode, toggleDarkMode,
      user, authToken, authLoading, authError, signIn, signUp, signOut,
      adminUser, isAdminAuthenticated, adminLogin, adminLogout,
      cart, addToCart, removeFromCart, clearCart, isInCart, cartTotal, cartCount,
      isCartOpen, setIsCartOpen,
      wishlist, toggleWishlist, isInWishlist,
      components, setComponents, createComponent, updateComponent, deleteComponent,
      orders, setOrders, updateOrderStatus, deleteOrder,
      customers, setCustomers, updateCustomer, deleteCustomer,
      revenueData, categoryData, analyticsStats,
    }}>
      {children}
    </SiteContext.Provider>
  );
}