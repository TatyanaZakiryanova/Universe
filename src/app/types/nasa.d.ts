export interface NASAData {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}

export interface InitialPhoto {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
}

export interface Photo {
  title: string;
  description: string;
  imageLink?: string;
  fullImageLink?: string;
  date_created: string;
}

export interface Link {
  href: string;
  rel: string;
  render?: string;
}

export interface DataItem {
  title: string;
  description: string;
  date_created: string;
}

export interface Item {
  data: DataItem[];
  links: Link[];
}

export interface State {
  initialPhotos: InitialPhoto[];
  photos: Photo[];
  searchValue: string;
  loading: boolean;
  error: boolean;
  isSearched: boolean;
  selectedPhoto: Photo | null;
  isModalOpen: boolean;
}

export type Action =
  | { type: 'INITIALIZE_PHOTOS'; payload: InitialPhoto[] }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Photo[] }
  | { type: 'FETCH_ERROR' }
  | { type: 'SET_IS_SEARCHED'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload: Photo }
  | { type: 'CLOSE_MODAL' };
