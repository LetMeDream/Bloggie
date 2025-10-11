import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setLoading, setError, newStore } from '../store/newStore';

function useDetail() {
  const { slug } = useParams<{ slug: string }>(); 
  const [currentPost, setCurrentPost] = useState([]);
  const navigate = useNavigate()
  const dispatch = newStore.dispatch

  useEffect(() => {
    const fetchDetail = async (apiurl: string) => {
      dispatch(setLoading(true))
      setTimeout(async () => {
        try {
          const response = await fetch(apiurl) 
          const data = await response.json() 
          setCurrentPost(data)
          if (data) {
            dispatch(setLoading(false))
          }
        } catch (err) {
          console.error('Error fetching data:', err)       
          dispatch(setError('Failed to fetch data for Post Detail'))   
          dispatch(setLoading(false))
          navigate('/')
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

  return { 
    currentPost
  }

}


export default useDetail