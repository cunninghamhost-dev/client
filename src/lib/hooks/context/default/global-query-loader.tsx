// src/lib/hooke/context/default/global-query-loader.tsx
'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { GlobalLoadingDialog } from '@/components/website/GlobalLoadingDialog';

interface IGlobalQueryLoaderProps {
  children: React.ReactNode;
  loadingText?: string;
  loadingSubText?: string;
}

export function GlobalQueryLoader({ children, loadingText, loadingSubText }: IGlobalQueryLoaderProps) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching > 0 || isMutating > 0;

  const effectiveText = loadingText || 'Loading...';

  return (
    <>
      {children}
      <GlobalLoadingDialog open={isLoading} display_text={effectiveText} sub_text={loadingSubText} />
    </>
  );
}
