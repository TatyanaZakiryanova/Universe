import { InitialPhoto, Photo } from '../types';

export interface State {
  initialPhotos: InitialPhoto[];
  photos: Photo[];
  loading: boolean;
  error: boolean;
  selectedPhoto: Photo | null;
  isModalOpen: boolean;
  currentPageUrl: string | null;
  prevPageUrl: string | null;
}

export type Action =
  | { type: 'INITIALIZE_PHOTOS'; payload: InitialPhoto[] }
  | { type: 'FETCH_LOADING' }
  | {
      type: 'FETCH_SUCCESS';
      payload: {
        photos: Photo[];
        currentPageUrl: string;
        prevPageUrl: string;
      };
    }
  | { type: 'FETCH_ERROR' }
  | { type: 'OPEN_MODAL'; payload: Photo }
  | { type: 'CLOSE_MODAL' };

export const initialState: State = {
  initialPhotos: [],
  photos: [],
  loading: false,
  error: false,
  selectedPhoto: null,
  isModalOpen: false,
  currentPageUrl: null,
  prevPageUrl: null,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIALIZE_PHOTOS':
      return { ...state, initialPhotos: action.payload };
    case 'FETCH_LOADING':
      return { ...state, loading: true, error: false, photos: [] };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        photos: action.payload.photos,
        currentPageUrl: action.payload.currentPageUrl,
        prevPageUrl: action.payload.prevPageUrl,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: true };
    case 'OPEN_MODAL':
      return { ...state, selectedPhoto: action.payload, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, selectedPhoto: null, isModalOpen: false };
    default:
      return state;
  }
};
