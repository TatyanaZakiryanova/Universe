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
  center: string;
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
  center: string;
}

export interface Item {
  data: DataItem[];
  links: Link[];
}

export interface CollectionLink {
  href?: string;
  rel?: string;
}

export interface ApiResponse {
  collection: {
    items: Item[];
    links: CollectionLink[];
    metadata: {
      total_hits: number;
    };
  };
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
  currentPageUrl: string | null;
  prevPageUrl: string | null;
  totalItems: number;
}

export type Action =
  | { type: 'INITIALIZE_PHOTOS'; payload: InitialPhoto[] }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'FETCH_LOADING' }
  | {
      type: 'FETCH_SUCCESS';
      payload: {
        photos: Photo[];
        currentPageUrl: string;
        prevPageUrl: string;
        totalItems: number;
      };
    }
  | { type: 'FETCH_ERROR' }
  | { type: 'SET_IS_SEARCHED'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload: Photo }
  | { type: 'CLOSE_MODAL' };
