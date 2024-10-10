'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { extractPaginationLinks, extractPhotosData } from './utils';
import { ApiResponse, InitialPhoto, Photo } from './types';
import { initialState, reducer } from './search-reducer';
import SearchInput from '../../ui/search-input';
import Pagination from '../../ui/pagination';
import Modal from '@/app/ui/modal';
import PhotoList from './photo-list';

export default function Search({ initialPhotos }: { initialPhotos: InitialPhoto[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const {
    initialPhotos: initialStatePhotos,
    photos,
    loading,
    error,
    selectedPhoto,
    isModalOpen,
    currentPageUrl,
    prevPageUrl,
  } = state;

  useEffect(() => {
    if (initialPhotos) {
      dispatch({ type: 'INITIALIZE_PHOTOS', payload: initialPhotos });
    }
  }, [initialPhotos]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const fetchData = useCallback(
    async (
      url: string = `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`,
    ) => {
      dispatch({ type: 'FETCH_LOADING' });
      setIsSearched(true);
      try {
        const response = await fetch(url);
        const data: ApiResponse = await response.json();
        const photosData = extractPhotosData(data.collection.items);
        const { nextPageUrl, prevPageUrl } = extractPaginationLinks(data.collection.links);
        const totalItems = data.collection.metadata?.total_hits || 0;
        setTotalItems(totalItems);

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            photos: photosData,
            currentPageUrl: nextPageUrl,
            prevPageUrl: prevPageUrl,
          },
        });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    },
    [searchValue, dispatch],
  );

  const searchKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        fetchData();
      }
    },
    [fetchData],
  );

  const openModal = useCallback(
    (photo: Photo) => {
      dispatch({ type: 'OPEN_MODAL', payload: photo });
    },
    [dispatch],
  );

  const closeModal = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL' });
  }, [dispatch]);

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
