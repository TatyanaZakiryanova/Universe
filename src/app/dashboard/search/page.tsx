import { InitialPhoto } from './types';
import Search from './photo-search';

export default async function SearchPage() {
  const API_KEY = process.env.NASA_API_KEY;
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    return <p>Failed to fetch images.</p>;
  }
  const initialPhotos: InitialPhoto[] = await res.json();

  const filteredPhotos = initialPhotos.filter((photo) => photo.media_type === 'image');
  if (filteredPhotos.length === 0) return <p>No images found.</p>;

  return (
    <div>
      <Search initialPhotos={filteredPhotos} />
    </div>
  );
}
