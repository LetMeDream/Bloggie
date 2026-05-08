
export interface CategoryType {
  id: number;
  image: string;
  title: string;
  post_count: number;
}

/* Utilizado, por ejemplo, en el componente Details al momento de tipar lo Post recibidos. */
export interface Post {
  id: number;
  title: string;
  link: string;
  image: string;
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  date?: string;
  view?: number;
  slug?: string;
  description?: string;
}

/* Utilizado en el componente de creación de post. AddPost. */
export type AddPostForm = {
  title: string
  description: string
  status: 'Active' | 'Draft' | 'Disabled'
  tags: string[]
  category: string | number
  user: {
    id: number;
    full_name: string;
    email: string;
  };
  image: string
}
