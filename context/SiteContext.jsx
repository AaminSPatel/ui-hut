'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import siteConfig from '@/data/siteConfig.json';

const SiteContext = createContext();
export const useSite = () => useContext(SiteContext);

const DUMMY_USER = {
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  avatar: null,
  joinedAt: '2024-01-15',
  plan: 'Pro',
};

const DUMMY_ORDERS = [
  {
    id: 'ORD-001',
    date: '2024-12-01',
    status: 'completed',
    items: [
      { id: 1, name: 'Hero Carousel Pro', price: 29, slug: 'hero-carousel-pro' },
    ],
    total: 29,
  },
  {
    id: 'ORD-002',
    date: '2024-11-20',
    status: 'completed',
    items: [
      { id: 3, name: 'Auth System Complete', price: 39, slug: 'auth-system-complete' },
      { id: 7, name: 'Notification System', price: 25, slug: 'notification-system' },
    ],
    total: 64,
  },
];

export function SiteProvider({ children }) {
  const [config, setConfig] = useState(siteConfig);
  const [darkMode, setDarkMode] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user] = useState(DUMMY_USER);
  const [orders] = useState(DUMMY_ORDERS);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('uihut-theme');
    const isDark = savedTheme ? savedTheme === 'dark' : config.theme.darkMode;
    setDarkMode(isDark);
    applyTheme(isDark);

    const savedCart = localStorage.getItem('uihut-cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedWishlist = localStorage.getItem('uihut-wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', config.theme.primaryColor);
  }, [config.theme.primaryColor]);

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    applyTheme(newMode);
    localStorage.setItem('uihut-theme', newMode ? 'dark' : 'light');
  };

  const updateConfig = (newConfig) => {
    setConfig(newConfig);
  };

  // Cart functions
  const addToCart = (component) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === component.id);
      if (exists) return prev;
      const newCart = [...prev, { ...component, quantity: 1 }];
      localStorage.setItem('uihut-cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      localStorage.setItem('uihut-cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('uihut-cart');
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  // Wishlist functions
  const toggleWishlist = (component) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === component.id);
      let newList;
      if (exists) {
        newList = prev.filter((item) => item.id !== component.id);
      } else {
        newList = [...prev, component];
      }
      localStorage.setItem('uihut-wishlist', JSON.stringify(newList));
      return newList;
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <SiteContext.Provider
      value={{
        config,
        updateConfig,
        darkMode,
        toggleDarkMode,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        orders,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}