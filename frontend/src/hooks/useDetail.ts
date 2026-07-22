import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setLoading, setError, store } from '../store/store';
import { useGetSinglePostQuery } from '../services/api';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Post } from '../types/posts';

function useDetail() {
  const { slug } = useParams<{ slug: string }>(); 
  const [currentPost, setCurrentPost] = useState<Post[] | null>(null);
  const navigate = useNavigate()
  let { data, error, isLoading } = useGetSinglePostQuery(slug ?? skipToken)

  useEffect(() => {
    if (data) {
      setCurrentPost(Array.isArray(data) ? data : null)
    } 
    if (error || (!isLoading && !data)) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [data, error, isLoading])

  useEffect(() => {
    if (Array.isArray(currentPost) && currentPost.length > 0) {
      console.log('Datos del post:', currentPost)
    }
  }, [currentPost])

  return { 
    currentPost,
    isLoading, 
    error
  }

}


export default useDetail