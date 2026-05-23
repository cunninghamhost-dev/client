// src/app/[locale]/authentication/layout.tsx
import React from 'react';
import LayoutSignon from './LayoutSignon';

export default function SignonLayout({ children }: { children: React.ReactNode }) {
  return <LayoutSignon>{children}</LayoutSignon>;
}
