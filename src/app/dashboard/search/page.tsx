'use client';

import { Item, Link, Photo } from '@/app/types/nasa';
import { ChangeEvent, useReducer } from 'react';
import styles from './search.module.scss';
import Modal from '@/app/ui/modal/modal';
import { initialState, reducer } from './searchReducer';
import Image from 'next/image';

export default function Search() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { photos, searchValue, loading, error, isSearched, selectedPhoto, isModalOpen } = state;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value });
  };

  const fetchData = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`,
      );
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
          };
        }) || [];
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
      <div className={styles.searchfield}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search for photos..."
          onKeyUp={searchKey}
          className={styles.input}
        />
        <button onClick={fetchData} disabled={loading} className={styles.button}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {loading && <p className={styles.status}>Loading...</p>}
      {error && <p className={styles.status}>Unable to complete the request</p>}
      {!loading && !error && isSearched && photos.length === 0 && (
        <p className={styles.status}>No photos were found for this request</p>
      )}
      <div className={styles.photoscontainer}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.photocard} onClick={() => openModal(photo)}>
            <h3>{photo.title}</h3>
            {photo.imageLink && (
              <Image
                src={photo.imageLink}
                alt={photo.title}
                width={600}
                height={300}
                style={{ borderRadius: '5px' }}
                layout="responsive"
              />
            )}
          </div>
        ))}
      </div>
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
