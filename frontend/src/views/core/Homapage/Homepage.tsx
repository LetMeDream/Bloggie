import Header from '../../partials/Header'
import Footer from '../../partials/Footer'
import PostCard from '../../partials/PostCard'
import useHomePage from '../../../hooks/useHomePage'
// import apiInstance from '../../utils/axios'
// import Toast from '../../plugin/Toast'
import './Homepage.css'
import { Post } from '../../../types/posts'
import CategoryPreview from './CategoryPreview'

function Index () {
const {
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage,
    category
}:{
    currentPosts: Post[]
    category: { id: number; title: string; image: string;}[];
    totalPages: number
    currentPage: number
    handlePrevPage: () => void
    pageNumbers: number[]
    paginate: (pageNumber: number) => void
    handleNextPage: () => void
} = useHomePage()

  return (
    <div>
      <Header />

      <section className='posts-section min-vh-100'>
        <div className='container'>

          <div className='row pb-3'>
            <div className='col'>
              <a href='#' className='d-block card-img-flash'>
                <img src='assets/images/adv-3.png' alt='' />
              </a>
              <h2 className='text-start d-block mt-1'>Trending Articles 🔥</h2>
            </div>
          </div>

          <div className='row'>
            {/* Renderizar solo los posts de la página actual */}
            {currentPosts.length > 0
              ? (
                  currentPosts.map((post: Post) => (
                    <PostCard
                      key={post?.id} // Asegúrate que post.id sea único
                      post={post}
                    />
                  ))
                )
              : (
                // Opcional: Mostrar un mensaje si no hay posts o mientras carga
                <p>Loading posts or no posts found...</p>
                )}
          </div>

          {/* Controles de Paginación */}
          {totalPages > 1 && ( // Solo muestra la paginación si hay más de 1 página
            <nav className='d-flex mt-4 justify-content-center'> {/* Centrar paginación */}
              <ul className='pagination mb-0'> {/* Quitar margen inferior si no es necesario */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    onClick={handlePrevPage}
                    className='page-link text-dark fw-bold me-1 rounded'
                    disabled={currentPage === 1} // Desactivar botón
                    aria-label='Previous'
                  >
                    <i className='fas fa-arrow-left me-2' />
                    Previous
                  </button>
                </li>
              </ul>
              <ul className='pagination mb-0 mx-1'> {/* Añadir margen horizontal */}
                {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''} ms-1`}>
                    <button
                      onClick={() => paginate(number)}
                      className='page-link text-dark fw-bold rounded'
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className='pagination mb-0'>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    onClick={handleNextPage}
                    className='page-link text-dark fw-bold ms-1 rounded'
                    disabled={currentPage === totalPages} // Desactivar botón
                    aria-label='Next'
                  >
                    Next
                    <i className='fas fa-arrow-right ms-3 ' />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
      {/* --- Sección de Categorías (sin cambios en la lógica, solo mantenida) --- */}
        <div className='container'>
          <div className='row g-0'>
            <div className='col-12 '>
              <div className='mb-4'>
                <h2>Categories</h2>
              </div>
              <div className='flex flex-wrap mb-4'>
              {category?.length > 0 ? (
              <CategoryPreview category={category || []} />
               ) : (
              <p>No categories found...</p>
               )}          
                 </div>
            </div>
          </div>
        </div>
      {/* --- Sección Latest Articles (Removida ya que ahora se pagina la sección anterior) --- */}
      {/* Si quisieras mantener esta sección separada, necesitarías otra llamada a la API
             o filtrar/ordenar los 'posts' de manera diferente aquí. Por simplicidad,
             asumimos que la paginación aplica a la lista principal de posts. */}

      <Footer />
    </div>
  )
}

export default Index
