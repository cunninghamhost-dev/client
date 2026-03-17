// src/components/website/GlobalLoadingDialog.tsx
'use client';

import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface IGlobalLoadingDialogProps {
  open: boolean;
  display_text?: string;
  sub_text?: string;
  onClose?: () => void;
}

export function GlobalLoadingDialog({
  onClose,
  sub_text,
  open = false,
  display_text = 'Processing...',
}: IGlobalLoadingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-white/80 backdrop-blur-sm border-none shadow-2xl'>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className='flex flex-col items-center justify-center py-10 gap-6'
            >
              <div className='relative'>
                <Loader2 className='h-16 w-16 animate-spin' style={{ color: '#E63A24' }} strokeWidth={2.5} />
                <div
                  className='absolute inset-0 rounded-full animate-ping-slow'
                  style={{
                    background: 'radial-gradient(circle, #E63A24 0%, transparent 70%)',
                    opacity: 0.15,
                  }}
                />
              </div>
              <div className='text-center space-y-1.5'>
                <p className='text-lg font-medium text-gray-900'>{display_text}</p>
                <p className='text-sm text-gray-500'>{sub_text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
