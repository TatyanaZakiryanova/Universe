'use client';

import PhotoCard from '@/app/ui/photo-card';
import React from 'react';
import { InitialPhoto, Photo } from '../types';

interface PhotoListProps {
  loading: boolean;
  isSearched: boolean;
  error: boolean;
  photos: Photo[];
  totalItems: number;
  initialStatePhotos: InitialPhoto[];
  openModal: (photo: Photo) => void;
}

const PhotoList: React.FC<PhotoListProps> = React.memo(
  ({ loading, isSearched, error, photos, totalItems, initialStatePhotos, openModal }) => {
    return (
      <>
        {!loading && !isSearched && (
          <p className="flex justify-center">Search for amazing space photos provided by NASA:</p>
        )}
        {error && <p className="my-2.5 text-center text-xl">Unable to complete the request</p>}
        {!loading && !error && isSearched && photos.length === 0 && (
          <p className="my-2.5 text-center text-xl">No photos were found for this request</p>
        )}
        {photos.length > 0 && (
          <p className="my-2.5 text-center text-sm">Results found: {totalItems}</p>
        )}
        <div className="mt-5 flex flex-wrap justify-center">
          {photos.length > 0
            ? photos.map((photo) => (
                <PhotoCard
                  key={photo.nasa_id}
                  title={photo.title}
                  imageUrl={photo.imageLink}
                  date={photo.date_created}
                  onClick={() => openModal(photo)}
                />
              ))
            : !loading &&
              initialStatePhotos.map((initialPhoto) => (
                <PhotoCard
                  key={`${initialPhoto.date}-${initialPhoto.url.split('/').pop()}`}
                  title={initialPhoto.title}
                  imageUrl={initialPhoto.url}
                  copyright={initialPhoto.copyright}
                  date={initialPhoto.date}
                />
              ))}
        </div>
      </>
    );
  },
);

PhotoList.displayName = 'PhotoList';
export default PhotoList;
