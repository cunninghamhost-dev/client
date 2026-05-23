import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  return (
    <main className='mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-5 px-6 text-center'>
      <CheckCircle2 className='h-14 w-14 text-green-600' />
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-900'>Payment successful</h1>
        <p className='text-sm leading-6 text-gray-600'>
          Your flight payment has been received. We will send your booking confirmation to your contact email.
        </p>
      </div>
      <Button asChild className='bg-[#E63A24] hover:bg-[#c5311e]'>
        <Link href='/'>Back to home</Link>
      </Button>
    </main>
  );
}
