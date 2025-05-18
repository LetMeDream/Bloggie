import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from '../types/posts'; // Asegúrate de que la ruta sea correcta
function useDetail() {
  const { slug } = useParams<{ slug: string }>(); 
  const [currentPost, setCurrentPost] = useState<Post[]>([]);
  useEffect(() => {
    const fetchDetail = async (apiurl: string) => {
      try {
        const response = await fetch(apiurl); 
        const data = await response.json(); 
        setCurrentPost(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } 
    };
      const apiurl = `http://localhost:8000/api/post/detail/${slug}`;
      fetchDetail(apiurl); 
    
  }, [slug]); 

  useEffect(() => {
    if (currentPost.length > 0) {
      console.log('Datos del post:', currentPost);
    }
  }, [currentPost]);
  return {currentPost}
  }


export default useDetail;