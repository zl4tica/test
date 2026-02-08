export interface Advertisement {
  id: number;
  title: string;
  image: string; // URL
  link?: string;
  created_at: string;
  updated_at: string;
}

export interface WaterBrand {
  id: number;
  brand_name: string;
  image: string; // URL
  sparkling?: boolean;
  chemistry?: {
    ph?: number;
    calcium?: number;
    magnesium?: number;
    potassium?: number;
    sodium?: number;
    bicarbonate?: number;
    sulphate?: number;
    chlorure?: number;
    nitrates?: number;
    nitrites?: number;
    residues?: number;
  };
  type?: {
    name: string;
  };
  source?: {
    name: string;
    place: string;
  };
  sizes?: {
    id: number;
    size: string;
  }[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export interface Review {
  id: number;
  client: string;
  water: {
    water_id: number;
    image: string;
  };
  content: string;
  rating: number;
  date: {
    long: string;
    short: string;
  };
}
