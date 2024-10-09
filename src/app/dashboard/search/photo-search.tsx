'use client';

import { ApiResponse, InitialPhoto, Photo } from './types';
import { ChangeEvent, useEffect, useReducer } from 'react';
import { initialState, reducer } from './search-reducer';
import SearchInput from '../../ui/search-input';
import styles from './styles/search.module.scss';
import Pagination from '../../ui/pagination';
import PhotoCard from '../../ui/photo-card';
import { extractPaginationLinks, extractPhotosData } from './utils';
import Modal from '@/app/ui/modal';

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
      {!loading && !isSearched && (
        <p className="flex justify-center">Search for amazing space photos provided by NASA:</p>
      )}
      {error && <p className="text-center text-xl my-2.5">Unable to complete the request</p>}
      {!loading && !error && isSearched && photos.length === 0 && (
        <p className="text-center text-xl my-2.5">No photos were found for this request</p>
      )}
      {photos.length > 0 && (
        <p className="text-center text-sm my-2.5">Results found: {totalItems}</p>
      )}
      <div className={styles.photosContainer}>
        {photos.length > 0
          ? photos.map((photo, index) => (
              <PhotoCard
                key={index}
                title={photo.title}
                imageUrl={photo.imageLink}
                date={photo.date_created}
                onClick={() => openModal(photo)}
              />
            ))
          : !loading &&
            initialStatePhotos.map((initialPhoto, index) => (
              <PhotoCard
                key={index}
                title={initialPhoto.title}
                imageUrl={initialPhoto.url}
                copyright={initialPhoto.copyright}
                date={initialPhoto.date}
              />
            ))}
      </div>
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
