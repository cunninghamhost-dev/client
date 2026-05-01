// src/app/[locale]/(website)/flight/search/[flight_type]/_component/ConfirmPriceErrorDialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

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
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* ✅ The missing DialogTitle */}
          <DialogTitle className="text-xl text-red-600 font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-end gap-3 sm:justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onAction ?? onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            {actionLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
