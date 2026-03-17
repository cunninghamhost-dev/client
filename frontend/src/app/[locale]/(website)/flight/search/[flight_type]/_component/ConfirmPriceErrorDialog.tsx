'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  title: string;
  description: string;
  actionLabel?: string;
  onClose: () => void;
  onAction?: () => void;
}

export function ConfirmPriceErrorDialog({ open, title, description, actionLabel = 'Close', onClose, onAction }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl'
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
            <p className='mt-2 text-sm text-gray-600'>{description}</p>

            <div className='mt-6 flex justify-end gap-3'>
              <button onClick={onClose} className='rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100'>
                Cancel
              </button>

              <button
                onClick={onAction ?? onClose}
                className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90'
              >
                {actionLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
