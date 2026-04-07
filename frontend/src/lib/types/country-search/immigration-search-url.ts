import { TImmigrationMainForm } from '@/lib/schemas/website/immigration.schema';

export type ImmigrationSearchQuery = {
  origin: string;
  destination: string;
};

export function buildImigrationSearchUrl(immigrationType: string, data: TImmigrationMainForm) {
  const query: ImmigrationSearchQuery = {
    origin: data.citizen,
    destination: data.destination,
  };
  const encodedImmigrationType = encodeURIComponent(immigrationType.toLowerCase().replace(/\s+/g, '-'));

  const search = new URLSearchParams(query).toString();

  return `/immigration/${encodedImmigrationType}?${search}`;
}
