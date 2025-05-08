import { useState, useEffect } from "react"
import { usePagination } from "./usePagination"

const useHomePage = () => {
  const [posts, setPosts] = useState([])
  const [, setCategory] = useState([])
  const { 
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage 
  } = usePagination({ elements: posts })


  const fetchPosts = async () => {
    const baseUrl = 'http://127.0.0.1:8000/api'
    try {
      const postsRes = await fetch(`${baseUrl}/post`)
      const postsData = await postsRes.json()
      // Asegúrate de que postsData sea siempre un array
      setPosts(postsData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setPosts([]) // Establece un array vacío en caso de error
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])


  return {
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage
  }
// --- Fin Lógica de Paginación ---
}

export default useHomePage