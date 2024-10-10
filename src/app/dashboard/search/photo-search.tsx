'use client';

import { ChangeEvent, useEffect, useReducer } from 'react';
import { extractPaginationLinks, extractPhotosData } from './utils';
import { ApiResponse, InitialPhoto, Photo } from './types';
import { initialState, reducer } from './search-reducer';
import SearchInput from '../../ui/search-input';
import Pagination from '../../ui/pagination';
import Modal from '@/app/ui/modal';
import PhotoList from './photo-list';

export default function Search({ initialPhotos }: { initialPhotos: InitialPhoto[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    initialPhotos: initialStatePhotos,
    photos,
    searchValue,
    loading,
    error,
    isSearched,
    selectedPhoto,
    isModalOpen,
    currentPageUrl,
    prevPageUrl,
    totalItems,
  } = state;

  useEffect(() => {
    if (initialPhotos) {
      dispatch({ type: 'INITIALIZE_PHOTOS', payload: initialPhotos });
    }
  }, [initialPhotos]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value });
  };

  const fetchData = async (
    url: string = `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`,
  ) => {
    dispatch({ type: 'FETCH_LOADING' });
    try {
      const response = await fetch(url);
      const data: ApiResponse = await response.json();
      const photosData = extractPhotosData(data.collection.items);
      const { nextPageUrl, prevPageUrl } = extractPaginationLinks(data.collection.links);
      const totalItems = data.collection.metadata?.total_hits || 0;

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          photos: photosData,
          currentPageUrl: nextPageUrl,
          prevPageUrl: prevPageUrl,
          totalItems: totalItems,
        },
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR' });
    }
  };

  const searchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const openModal = (photo: Photo) => {
    dispatch({ type: 'OPEN_MODAL', payload: photo });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
      <SearchInput
        searchValue={searchValue}
        handleSearch={handleSearch}
        searchKey={searchKey}
        fetchData={fetchData}
        loading={loading}
      />
      <PhotoList
        photos={photos}
        initialStatePhotos={initialStatePhotos}
        loading={loading}
        isSearched={isSearched}
        openModal={openModal}
        error={error}
        totalItems={totalItems}
      />
      {photos.length > 0 && (
        <Pagination
          prevPageUrl={prevPageUrl}
          nextPageUrl={currentPageUrl}
          fetchData={fetchData}
          loading={loading}
        />
      )}
      {selectedPhoto && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedPhoto.fullImageLink || selectedPhoto.imageLink}
          description={selectedPhoto.description}
          center={selectedPhoto.center}
        />
      )}
    </>
  );
}
