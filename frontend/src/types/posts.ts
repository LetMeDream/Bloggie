export interface Post {
  id: number;
  title: string;
  link: string;
  image: string;
  user?: string;
  date?: string;
  view?: number;
  slug?: string;
}

export interface CategoryType {
  id: number;
  image: string;
  title: string;
  post_count: number;
}