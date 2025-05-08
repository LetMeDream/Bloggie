export interface Post {
  id: number;
  title: string;
  link: string;
  image: string;
  user?: string;
  date?: string;
  view?: number;
}