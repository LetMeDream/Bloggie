export interface Post {
  id: number;
  title: string;
  link: string;
  image: string;
  user?: object;
  date?: string;
  view?: number;
  slug?: string;
  tags?: string;
  description?: string;
  likes?: Array;
}

export interface CategoryType {
  id: number;
  image: string;
  title: string;
  post_count: number;
}