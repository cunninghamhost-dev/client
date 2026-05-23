// src/lib/hooks/context/fetch-with-indicator.hook.ts

import { useServerIndicatorStore } from '@/store/server-indicator.store';

export async function fetchWithIndicatorHook(input: RequestInfo, init?: RequestInit) {
  const { startRequest, endRequest } = useServerIndicatorStore.getState();

  startRequest();
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const error = new Error(text || `Request failed with status ${res.status}`);

      // attach status so callers can inspect
      //(error as any).status = res.status;
      throw error;
    }
    return res;
  } finally {
    endRequest();
  }
}
