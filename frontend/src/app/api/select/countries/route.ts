import { NextResponse } from 'next/server';
type RawCountry = {
  alpha3Code: string;
  alpha2Code: string;
  name: string;
  region: string;
  flag: string;
};

type Country = {
  id: string;
  name: string;
  code: string;
  continent: string;
  flag: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const limit = parseInt(searchParams.get('limit') || '250');

    // Fetch from the API
    const response = await fetch('https://www.apicountries.com/countries', {
      next: { revalidate: 86400 } // Cache locally for 24 hours
    });

    if (!response.ok) throw new Error('Failed to fetch from apicountries');
    
    const rawData: RawCountry[] = await response.json();

    // Mapping based on the JSON content you provided
    let countries: Country[] = rawData.map((c) => ({
		  id: c.alpha3Code,
		  name: c.name,
		  code: c.alpha2Code,
		  continent: c.region,
		  flag: c.flag,
		}));

    // Filter by name or ISO code if search parameter exists
    if (search) {
	  countries = countries.filter((c) =>
		c.name.toLowerCase().includes(search) ||
		c.code.toLowerCase().includes(search)
	  );
	}

    return NextResponse.json(countries.slice(0, limit));

  } catch (error: unknown) {
	  if (error instanceof Error) {
		console.error('Country API Route Error:', error.message);
	  } else {
		console.error('Country API Route Error:', error);
	  }

	  return NextResponse.json(
		{ error: 'Internal Server Error' },
		{ status: 500 }
	  );
	}
}
