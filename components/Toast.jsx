"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const say = useCallback((text) => {
    setMessage(text);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2200);
  }, []);

  return (
    <ToastContext.Provider value={say}>
      {children}
      <div className={visible ? "toast show" : "toast"} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}

// Copies text and confirms with a toast; falls back to showing it when the clipboard is unavailable.
export function useCopy() {
  const say = useToast();
  return useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        say("Copied");
      } catch {
        say("Select and copy: " + text);
      }
    },
    [say],
  );
}
