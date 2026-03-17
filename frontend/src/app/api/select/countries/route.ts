import { serviceLoadCountries } from '@/app/service/domain/select/loadCountries.select';
import { countrySearchSchema } from '@/lib/schemas/server/defaults/countries.schema';
import { failure } from '@/lib/utils/server/response.util';
import { getErrorMessage } from '@/utils/errors';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const parsed = countrySearchSchema.safeParse(Object.fromEntries(searchParams));
    if (!parsed.success) {
      return failure(JSON.stringify(parsed.error.flatten()), 400);
    }

    const { search, continent } = parsed.data;

    const fetch_countries = await serviceLoadCountries();

    let filtered = fetch_countries;

    if (search) {
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(search));
    }

    if (continent) {
      filtered = filtered.filter((c) => c.continent === continent);
    }

    return Response.json(
      { profile: filtered },
      {
        headers: {
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      },
    );
  } catch (err) {
    const message = getErrorMessage(err);
    console.error('GET api/select/countries error', message);
    return failure(message, 500);
  }
}
