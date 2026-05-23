import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentCancelPage() {
  return (
    <main className='mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-5 px-6 text-center'>
      <XCircle className='h-14 w-14 text-red-600' />
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Payment was cancelled</h1>
        <p className='text-sm leading-6 text-gray-600'>
          No payment was taken. You can return to flight search and choose a fare when you are ready.
        </p>
      </div>
      <Button asChild variant='outline'>
        <Link href='/'>Back to home</Link>
      </Button>
    </main>
  );
}
