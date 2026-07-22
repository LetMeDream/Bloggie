import { useState, useEffect } from "react"
import { usePagination } from "./usePagination"
import { store, setLoading, setError } from "../store/store"
import { useGetPostsQuery, useGetCategoriesQuery } from "../services/api"
import type { Post, CategoryType } from "../types/posts"

const useHomePage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [category, setCategory] = useState<CategoryType[]>([])
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
  const { data: fetchedPosts, error: postsError, isLoading: postsLoading } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const { data: fetchedCategories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery()
  

  /* useEffect that sets the fetched data as state */
  useEffect(() => {
    /* Fetches */
    if (fetchedPosts) setPosts(fetchedPosts)
    if (fetchedCategories) setCategory(fetchedCategories)
    /* Dispatches errors */
    if (postsError) dispatch(setError('Error fetching posts'))
    if (categoriesError) dispatch(setError('Error fetching categories'))
  }, [fetchedPosts, fetchedCategories])

  /* Quitar loader sólo cuando ambos; Post y Categories, hayan sido cargados */
  useEffect(() => {
    if (!categoriesLoading && !postsLoading) {
      dispatch(setLoading(false))
    }
  }, [categoriesLoading, postsLoading])


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