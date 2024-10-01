import { unstable_cache } from 'next/cache';
import { NASAData } from '../types/nasa';

const API_KEY = process.env.NASA_API_KEY;

const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const getDataOfTheDay = unstable_cache(
  async (): Promise<NASAData> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch data from NASA API');
    }

    const data: NASAData = await response.json();

    return data;
  },
  ['data-of-the-day'],
  { revalidate: 86400 },
);

export default async function DataOfTheDay() {
  try {
    const data = await getDataOfTheDay();

    const isVideo = data.media_type === 'video';

    return (
      <div>
        <h1>{data.title}</h1>
        <h2>{data.date}</h2>
        {isVideo ? (
          <div>
            <iframe
              width="80%"
              height="400px"
              src={data.url}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={data.title}
            ></iframe>
          </div>
        ) : (
          <img src={data.url} alt={data.title} width="80%" />
        )}
        <p>{data.explanation}</p>
      </div>
    );
  } catch (error) {
    return <p>Failed to load the data of the day</p>;
  }
}
