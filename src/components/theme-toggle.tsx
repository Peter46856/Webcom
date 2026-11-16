'use client';
import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
const subscribe = (callback: () => void) => {
  window.addEventListener('webcom-theme', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('webcom-theme', callback);
    window.removeEventListener('storage', callback);
  };
};
function snapshot() {
  return document.documentElement.dataset.theme === 'light';
}
export function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, snapshot, () => false);
  function toggle() {
    const theme = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('webcom-theme', theme);
    } catch {}
    window.dispatchEvent(new Event('webcom-theme'));
  }
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {light ? <Moon size={18} /> : <Sun size={18} />}
      <span>{light ? 'Dark mode' : 'Light mode'}</span>
    </button>
  );
}
