'use client';

import { InitialPhoto, Item, Link, Photo } from '@/app/types/nasa';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import Modal from '@/app/ui/modal/modal';
import { initialState, reducer } from './search-reducer';
import Image from 'next/image';
import SearchInput from './search-input';
import styles from '../styles/search.module.scss';
import Pagination from './search-pagination';

export default function Search({ initialPhotos }: { initialPhotos: InitialPhoto[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  const {
    initialPhotos: initialStatePhotos,
    photos,
    searchValue,
    loading,
    error,
    isSearched,
    selectedPhoto,
    isModalOpen,
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
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(url);
      const data = await response.json();
      const photosData =
        data.collection.items.map((item: Item) => {
          const imageLinkPreview = item.links?.find((link: Link) => link.rel === 'preview')?.href;
          const imageLinkFull =
            item.links?.find((link: Link) => link.rel === 'captions')?.href || imageLinkPreview;
          return {
            title: item.data[0]?.title || 'No title',
            description: item.data[0]?.description || 'No description',
            imageLink: imageLinkPreview,
            fullImageLink: imageLinkFull,
            date_created: item.data[0]?.date_created,
          };
        }) || [];

      const nextPageUrl = data.collection.links?.find((link: Link) => link.rel === 'next')?.href;
      const prevPageUrl = data.collection.links?.find((link: Link) => link.rel === 'prev')?.href;

      setCurrentPageUrl(nextPageUrl);
      setPrevPageUrl(prevPageUrl);
      dispatch({ type: 'FETCH_SUCCESS', payload: photosData });
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
        <p className={styles.title}>Search for amazing space photos provided by NASA:</p>
      )}
      {loading && <p className={styles.status}>Loading...</p>}
      {error && <p className={styles.status}>Unable to complete the request</p>}
      {!loading && !error && isSearched && photos.length === 0 && (
        <p className={styles.status}>No photos were found for this request</p>
      )}
      <div className={styles.photoscontainer}>
        {photos.length > 0
          ? photos.map((photo, index) => (
              <div
                key={index}
                className={styles.photocard}
                onClick={() => openModal(photo)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{photo.title}</h3>
                {photo.imageLink && (
                  <div className={styles.imagecontainer}>
                    <Image
                      src={photo.imageLink}
                      alt={photo.title}
                      fill
                      style={{ borderRadius: '5px', objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <span>{photo.date_created}</span>
              </div>
            ))
          : !loading &&
            initialStatePhotos.map((initialPhoto, index) => (
              <div key={index} className={styles.photocard}>
                <h3>{initialPhoto.title}</h3>
                <div className={styles.imagecontainer}>
                  <Image
                    src={initialPhoto.url}
                    alt={initialPhoto.title}
                    fill
                    style={{ borderRadius: '5px', objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={true}
                  />
                </div>
                <span>{initialPhoto.date}</span>
              </div>
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
        />
      )}
    </>
  );
}
