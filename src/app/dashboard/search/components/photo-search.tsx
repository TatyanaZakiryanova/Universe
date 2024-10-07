'use client';

import { ApiResponse, CollectionLink, InitialPhoto, Item, Link, Photo } from '@/app/types/nasa';
import { ChangeEvent, useEffect, useReducer } from 'react';
import Modal from '@/app/ui/modal/modal';
import { initialState, reducer } from './search-reducer';
import SearchInput from '../../../ui/search-input';
import styles from '../styles/search.module.scss';
import Pagination from '../../../ui/search-pagination';
import PhotoCard from '../../../ui/photo-card';
import InitialPhotoCard from '../../../ui/initial-photo-card';

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

  const extractPhotosData = (items: Item[]): Photo[] => {
    return (
      items.map((item: Item) => {
        const imageLinkPreview = item.links?.find((link: Link) => link.rel === 'preview')?.href;
        const imageLinkFull =
          item.links?.find((link: Link) => link.rel === 'captions')?.href || imageLinkPreview;

        return {
          title: item.data[0]?.title || 'No title',
          description: item.data[0]?.description || 'No description',
          imageLink: imageLinkPreview,
          fullImageLink: imageLinkFull,
          date_created: item.data[0]?.date_created || 'Unknown date',
          center: item.data[0]?.center || 'Unknown center',
        };
      }) || []
    );
  };

  const extractPaginationLinks = (
    links: CollectionLink[],
  ): { nextPageUrl: string; prevPageUrl: string } => {
    const nextPageUrl = links?.find((link: CollectionLink) => link.rel === 'next')?.href || '';
    const prevPageUrl = links?.find((link: CollectionLink) => link.rel === 'prev')?.href || '';
    return { nextPageUrl, prevPageUrl };
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
      {error && <p className={styles.status}>Unable to complete the request</p>}
      {!loading && !error && isSearched && photos.length === 0 && (
        <p className={styles.status}>No photos were found for this request</p>
      )}
      {photos.length > 0 && <p className={styles.number}>Results found: {totalItems}</p>}
      <div className={styles.photosContainer}>
        {photos.length > 0
          ? photos.map((photo, index) => (
              <PhotoCard
                key={index}
                title={photo.title}
                imageLink={photo.imageLink}
                dateCreated={photo.date_created}
                onClick={() => openModal(photo)}
              />
            ))
          : !loading &&
            initialStatePhotos.map((initialPhoto, index) => (
              <InitialPhotoCard
                key={index}
                title={initialPhoto.title}
                url={initialPhoto.url}
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
