import { useState, useEffect } from "react"
import { usePagination } from "./usePagination"
import { store, setLoading, setError } from "../store/store"

const useHomePage = () => {
  const [posts, setPosts] = useState([])
  const [arePostsLoading, setArePostsLoading] = useState(true)
  const [category, setCategory] = useState([])
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true)
  const { 
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage,
    isFirstPage,
    isLastPage
  } = usePagination({ elements: posts })
  const dispatch = store.dispatch

  const fetchPosts = async () => {
    const baseUrl = 'http://127.0.0.1:8000/api'
    try {
      dispatch(setLoading(true))
      const postsRes = await fetch(`${baseUrl}/post`)
      const postsData = await postsRes.json()
      // Asegúrate de que postsData sea siempre un array
      setPosts(postsData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setPosts([]) 
    } finally {
      setArePostsLoading(false) 
    }
  }
 
  const fetchCategories = async () => {
    try {
      const baseUrl = 'http://127.0.0.1:8000/api'
      dispatch(setLoading(true))
      const categoryRes = await fetch(`${baseUrl}/post/category/list`)
      const categoryData = await categoryRes.json()
      // Asegúrate de que postsData sea siempre un array
      setCategory(categoryData)
      // console.log(categoryData)
    } catch (err) {
      console.error('Error fetching data:', err)
      dispatch(setError('Failed to fetch categories'))
      setPosts([]) 
    } finally {
      setAreCategoriesLoading(false) 
    }
  }

  useEffect(() => {
    fetchPosts(), fetchCategories()
  }, [])

  /* Quitar loader sólo cuando ambos; Post y Categories, hayan sido cargados */
  useEffect(() => {
    if (!areCategoriesLoading && !arePostsLoading) {
      dispatch(setLoading(false))
    }
  }, [areCategoriesLoading, arePostsLoading])

  return {
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage,
    category,
    isFirstPage,
    isLastPage
  }
// --- Fin Lógica de Paginación ---
}

export default useHomePage