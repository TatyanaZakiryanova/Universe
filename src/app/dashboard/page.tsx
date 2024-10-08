import { unstable_cache } from 'next/cache';

interface NASAData {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}

const API_KEY = process.env.NASA_API_KEY;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const getDataOfTheDay = unstable_cache(
  async (): Promise<NASAData | { error: string }> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      return { error: 'Failed to fetch data from NASA API' };
    }

    const data: NASAData = await response.json();

    return data;
  },
  ['data-of-the-day'],
  { revalidate: 86400 },
);

export default async function DataOfTheDay() {
  const data = await getDataOfTheDay();

  if ('error' in data) {
    return <p className="pt-[200px] text-2xl">{data.error}</p>;
  }

  const isVideo = data.media_type === 'video';

  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <h2 className="text-xl">{data.date}</h2>
        {isVideo ? (
          <div>
            <iframe
              width="90%"
              height="400px"
              src={data.url}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={data.title}
            ></iframe>
          </div>
        ) : (
          <img src={data.url} alt={data.title} width="90%" />
        )}
        <p>{data.explanation}</p>
      </div>
    </div>
  );
}
