'use client';

import { Item, Link, Photo } from '@/app/types/nasa';
import { ChangeEvent, useState } from 'react';
import styles from './search.module.scss';

export default function Search() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    setPhotos([]);
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${searchValue}`);
      const data = await response.json();
      const photosData =
        data.collection.items.map((item: Item) => {
          const imageLink = item.links?.find((link: Link) => link.rel === 'preview')?.href;
          return {
            title: item.data[0]?.title || 'No title',
            imageLink,
          };
        }) || [];
      setPhotos(photosData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.searchfield}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search for photos..."
          className={styles.input}
        />
        <button onClick={fetchData} disabled={loading} className={styles.button}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.loading}>Something went wrong</p>}
      <div className={styles.photoscontainer}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.photocard}>
            <h3>{photo.title}</h3>
            {photo.imageLink && (
              <img src={photo.imageLink} alt={photo.title} className={styles.photo} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
