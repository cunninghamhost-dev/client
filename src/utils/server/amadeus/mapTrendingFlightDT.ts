import { AmadeusResponse } from '@/types/server/amadeus.types';

export function mapTrendingFlightData(response: AmadeusResponse) {
  const locations = response.dictionaries?.locations ?? {};
  const currencies = response.dictionaries?.currencies ?? {};
  const currency = response.meta?.currency ?? 'EUR';
  return (response.data ?? []).map((item) => {
    const originInfo = locations[item.origin] || {};
    const destInfo = locations[item.destination] || {};
    const currencyInfo = currencies[currency];
    return {
      origin: item.origin,
      originName: originInfo.detailedName || item.origin,
      destination: item.destination,
      destinationName: destInfo.detailedName || item.destination,
      departureDate: item.departureDate,
      returnDate: item.returnDate,
      price: item.price?.total,
      currency: currencyInfo,
      flightOffersUrl: item.links?.flightOffers,
      imageUrl: `/images/${item.destination}.jpg`,
    };
  });
}
