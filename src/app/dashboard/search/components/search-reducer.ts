import { Action, State } from '@/app/types/nasa';

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
