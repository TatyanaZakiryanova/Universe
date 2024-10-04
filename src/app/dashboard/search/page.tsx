'use client';

import { Item, Link, Photo } from '@/app/types/nasa';
import { ChangeEvent, useState } from 'react';
import styles from './search.module.scss';
import Modal from '@/app/ui/modal/modal';

export default function Search() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    setPhotos([]);
    setIsSearched(true);

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
      setPhotos(photosData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const searchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
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
              <img src={photo.imageLink} alt={photo.title} className={styles.photo} />
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
