export interface NASAData {
  date: string;
  title: string;
  url: string;
  explanation: string;
  media_type: 'image' | 'video';
}

export interface Photo {
  title: string;
  description: string;
  imageLink?: string;
  fullImageLink?: string;
}

export interface Link {
  href: string;
  rel: string;
  render?: string;
}

export interface DataItem {
  title: string;
  description: string;
}

export interface Item {
  data: DataItem[];
  links: Link[];
}
