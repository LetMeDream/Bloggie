import { useState, useEffect } from "react"
    
    const useHomePage = () => {
    const [posts, setPosts] = useState([])
    const [, setCategory] = useState([]) // Mantenido, aunque no se usa dinámicamente en el ejemplo
    const [currentPage, setCurrentPage] = useState(1) // Estado para la página actual
    const [postsPerPage] = useState(4) // Posts por página
  
    const fetchPosts = async () => {
      const baseUrl = 'http://127.0.0.1:8000/api'
      try {
        const postsRes = await fetch(`${baseUrl}/post`)
        const postsData = await postsRes.json()
        // Asegúrate de que postsData sea siempre un array
        setPosts(Array.isArray(postsData) ? postsData : [])
  
        const categoriesRes = await fetch(`${baseUrl}/post/category/list`)
        const categoriesData = await categoriesRes.json()
        setCategory(categoriesData) // Guardar los datos en el estado de categories
      } catch (err) {
        console.error('Error fetching data:', err)
        setPosts([]) // Establece un array vacío en caso de error
      }
    }
  
    useEffect(() => {
      fetchPosts()
    }, [])
  
    // --- Lógica de Paginación ---
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    // Asegúrate de que 'posts' es un array antes de intentar usar 'slice'
    const currentPosts = Array.isArray(posts) ? posts.slice(indexOfFirstPost, indexOfLastPost) : []
    const totalPages = Array.isArray(posts) ? Math.ceil(posts.length / postsPerPage) : 0
  
    // Función para cambiar de página
    const paginate = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
      }
    }
  
    // Función para ir a la página anterior
    const handlePrevPage = () => {
      paginate(currentPage - 1)
    }
  
    // Función para ir a la página siguiente
    const handleNextPage = () => {
      paginate(currentPage + 1)
    }
  
    // Generar números de página para los botones
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
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