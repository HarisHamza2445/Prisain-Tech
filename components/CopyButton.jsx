"use client";

import { useCopy } from "@/components/Toast";

export function CopyButton({ value, children, ...rest }) {
  const copy = useCopy();
  return (
    <button type="button" onClick={() => copy(value)} {...rest}>
      {children}
    </button>
  );
}
