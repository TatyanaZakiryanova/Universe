export interface NASAData {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}

interface Photo {
  title: string;
  description: string;
  imageLink?: string;
}

interface Link {
  href: string;
  rel: string;
  render?: string;
}

interface DataItem {
  title: string;
  description: string;
}

interface Item {
  data: DataItem[];
  links: Link[];
}
