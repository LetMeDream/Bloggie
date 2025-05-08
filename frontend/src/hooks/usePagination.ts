import { useState } from "react"
import { Post } from "../types/posts"

export const usePagination = ({
    elements
  } : {
    elements: any[]
  }
) => {
  const [currentPage, setCurrentPage] = useState(1) // Estado para la página actual
  const [elementsPerPage] = useState(4) // Posts por página

  // --- Lógica de Paginación ---
  const indexOfLastPost = currentPage * elementsPerPage
  const indexOfFirstPost = indexOfLastPost - elementsPerPage
  // Asegúrate de que 'posts' es un array antes de intentar usar 'slice'
  const currentPosts = Array.isArray(elements) ? elements.slice(indexOfFirstPost, indexOfLastPost) : []
  const totalPages = Array.isArray(elements) ? Math.ceil(elements.length / elementsPerPage) : 0

  // Función para cambiar de página
  const paginate = (pageNumber: number) => {
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
}