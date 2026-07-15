'use client';

import { useEffect, useState } from 'react';

type Props = {
  message: string;
  variant?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
};

const icons: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export default function Toast({ message, variant = 'success', onClose, duration = 3500 }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [exiting, onClose]);

  return (
    <div className={`toast toast-${variant} ${exiting ? 'exiting' : ''}`}>
      <span className="toast-icon">{icons[variant]}</span>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={() => setExiting(true)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
