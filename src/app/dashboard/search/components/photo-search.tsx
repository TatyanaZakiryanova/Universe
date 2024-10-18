'use client';

import { ChangeEvent, useCallback, useEffect, useReducer, useState } from 'react';
import { extractPaginationLinks, extractPhotosData } from '../utils/utils';
import { ApiResponse, InitialPhoto, Photo } from '../types';
import { initialState, reducer } from '../store/search-reducer';
import PhotoList from './photo-list';

import dynamic from 'next/dynamic';

import Pagination from '@/app/ui/pagination';
import PhotoModal from '@/app/ui/photo-modal';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';

const Modal = dynamic(() => import('@/app/ui/modal'), { ssr: false });

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
        console.error(error);
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
      <div className="mb-5 flex flex-col justify-center md:flex-row">
        <Input
          id="Search-input"
          name="Search"
          inputValue={searchValue}
          handleInput={handleSearch}
          searchKey={searchKey}
          loading={loading}
          className="mb-3 w-full p-3 md:mb-0 md:mr-3 md:w-[400px]"
        >
          <Button onClick={fetchData} disabled={loading} className="px-5 py-2 md:w-auto">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Input>
      </div>
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
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPhoto.title}>
          <PhotoModal
            imageSrc={selectedPhoto.fullImageLink || selectedPhoto.imageLink}
            description={selectedPhoto.description}
            date_created={selectedPhoto.date_created}
            center={selectedPhoto.center}
          />
        </Modal>
      )}
    </>
  );
}
