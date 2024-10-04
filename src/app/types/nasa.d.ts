export interface NASAData {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}

export interface Photo {
  title: string;
  description: string;
  imageLink?: string;
  fullImageLink?: string;
}

export interface Link {
  href: string;
  rel: string;
  render?: string;
}

export interface DataItem {
  title: string;
  description: string;
}

export interface Item {
  data: DataItem[];
  links: Link[];
}

export interface State {
  photos: Photo[];
  searchValue: string;
  loading: boolean;
  error: boolean;
  isSearched: boolean;
  selectedPhoto: Photo | null;
  isModalOpen: boolean;
}

export type Action =
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Photo[] }
  | { type: 'FETCH_ERROR' }
  | { type: 'SET_IS_SEARCHED'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload: Photo }
  | { type: 'CLOSE_MODAL' };
