import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBloggieStore } from '../store/store';

function useDetail() {
  const { slug } = useParams<{ slug: string }>(); 
  const [currentPost, setCurrentPost] = useState([]);
  const store = useBloggieStore()

  useEffect(() => {
    const fetchDetail = async (apiurl: string) => {
      await store.setLoading(true)
      setTimeout(async () => {
        try {
          const response = await fetch(apiurl) 
          const data = await response.json() 
          setCurrentPost(data)
        } catch (err) {
          console.error('Error fetching data:', err)
        } finally {
          await store.setLoading(false)
        }
      }, 600)
    };

    const apiurl = `http://localhost:8000/api/post/detail/${slug}`
    fetchDetail(apiurl)
    
  }, [slug])

 useEffect(() => {
  if (currentPost.length > 0) {
    console.log('Datos del post:', currentPost)
  }
}, [currentPost])
}

export default useDetail