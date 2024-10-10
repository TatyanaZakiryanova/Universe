'use client';

import PhotoCard from '@/app/ui/photo-card';
import { InitialPhoto, Photo } from './types';

interface PhotoListProps {
  loading: boolean;
  isSearched: boolean;
  error: boolean;
  photos: Photo[];
  totalItems: number;
  initialStatePhotos: InitialPhoto[];
  openModal: (photo: Photo) => void;
}

const PhotoList: React.FC<PhotoListProps> = ({
  loading,
  isSearched,
  error,
  photos,
  totalItems,
  initialStatePhotos,
  openModal,
}) => {
  return (
    <>
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
      <div className="flex flex-wrap justify-center mt-5">
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
    </>
  );
};

export default PhotoList;
