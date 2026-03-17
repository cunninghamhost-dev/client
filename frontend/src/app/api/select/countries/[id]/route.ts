import prisma from '@/lib/prisma';
import { CountryResponseSchema } from '@/lib/schemas/server/defaults/countries.schema';
import { failure, success } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const responseData = await prisma.country.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        iso2: true,
        continent: true,
      },
    });
    if (!responseData) return failure('Country not found', 404);

    const country = CountryResponseSchema.parse(responseData);

    return success(country, 'Successful retrieval');
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET /api/select/country/[id] error:', err);
    return failure(message, 500);
  }
}
