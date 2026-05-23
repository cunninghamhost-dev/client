export interface SearchParams {
  location: string;
  checkin: string;
  checkout: string;
  guests: number;
}

export interface HeroSearchProps {
  onSearch: (params: SearchParams) => void;
}
