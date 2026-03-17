import { generateReference } from '@/lib/helper/crypto-generator.helper';
import { Prisma } from 'generated/prisma/client';

export async function createBookingWithUniqueReference(
  tx: Prisma.TransactionClient,
  bookingData: Prisma.BookingCreateInput,
) {
  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await tx.booking.create({
        data: {
          ...bookingData,
          referenceCode: generateReference(),
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002' // Unique constraint failed
      ) {
        continue; // retry with new reference
      }

      throw err;
    }
  }
}
