import { useState, useEffect } from "react"
import { usePagination } from "./usePagination"
import { c } from "vite/dist/node/types.d-aGj9QkWt"

const useHomePage = () => {
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState([])
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
 
  const fetchCategories = async () => {
    const baseUrl = 'http://127.0.0.1:8000/api'
    try {
      const categoryRes = await fetch(`${baseUrl}/post/category/list`)
      const categoryData = await categoryRes.json()
      // Asegúrate de que postsData sea siempre un array
      setCategory(categoryData)
      console.log(categoryData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setPosts([]) // Establece un array vacío en caso de error
    }
  }

  useEffect(() => {
    fetchPosts(), fetchCategories()
  }, [])


  return {
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage,
    category,
  }
// --- Fin Lógica de Paginación ---
}

export default useHomePage