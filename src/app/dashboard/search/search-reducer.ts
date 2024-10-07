import { InitialPhoto, Photo } from './types';

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

export const initialState: State = {
  initialPhotos: [],
  photos: [],
  searchValue: '',
  loading: false,
  error: false,
  isSearched: false,
  selectedPhoto: null,
  isModalOpen: false,
  currentPageUrl: null,
  prevPageUrl: null,
  totalItems: 0,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIALIZE_PHOTOS':
      return { ...state, initialPhotos: action.payload };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'FETCH_LOADING':
      return { ...state, loading: true, error: false, photos: [], isSearched: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        photos: action.payload.photos,
        currentPageUrl: action.payload.currentPageUrl,
        prevPageUrl: action.payload.prevPageUrl,
        totalItems: action.payload.totalItems,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: true };
    case 'SET_IS_SEARCHED':
      return { ...state, isSearched: action.payload };
    case 'OPEN_MODAL':
      return { ...state, selectedPhoto: action.payload, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, selectedPhoto: null, isModalOpen: false };
    default:
      return state;
  }
};
