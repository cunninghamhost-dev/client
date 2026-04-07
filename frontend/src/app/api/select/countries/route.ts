import { NextResponse } from 'next/server';

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
    
    const rawData = await response.json();

    // Mapping based on the JSON content you provided
    let countries = rawData.map((c: any) => ({
      id: c.alpha3Code,      
      name: c.name,          
      code: c.alpha2Code,   
      continent: c.region,   
      flag: c.flag          
    }));

    // Filter by name or ISO code if search parameter exists
    if (search) {
      countries = countries.filter((c: any) => 
        c.name.toLowerCase().includes(search) || 
        c.code.toLowerCase().includes(search)
      );
    }

    return NextResponse.json(countries.slice(0, limit));

  } catch (error: any) {
    console.error('Country API Route Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
