import Header from '../../partials/Header'
import Footer from '../../partials/Footer'
import PostCard from '../../partials/PostCard'
import useHomePage from '../../../hooks/useHomePage'
// import apiInstance from '../../utils/axios'
// import Toast from '../../plugin/Toast'
import './Homepage.css'
import { Post } from '../../../types/posts'
import { CategoryType } from '../../../types/posts'
import Categories from '../../partials/Categories'
import { useBloggieStore } from '../../../store/store'
import Loader from '../../pages/Loader/Loader' 
import { useEffect, useState } from 'react'

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
        category: CategoryType[];
        totalPages: number
        currentPage: number
        handlePrevPage: () => void
        pageNumbers: number[]
        paginate: (pageNumber: number) => void
        handleNextPage: () => void
  } = useHomePage()

   const isLoading = useBloggieStore(state => state.loading)

  const [extraDistance, setExtraDistance] = useState(0)
  useEffect(() => {
    const header = document.getElementById('header')
    if (header) {
      if (window.matchMedia('(max-width: 768px)').matches) { 
        setExtraDistance(header.offsetHeight)
      }
      if (window.matchMedia('(max-width: 1024px)').matches) { 
        setExtraDistance(header.offsetHeight/2)
      }
    }
  }, [])

  useEffect(() => console.log(extraDistance), [extraDistance])

  return isLoading ? <Loader/> : (
    <div>
      <Header/>

      <section className='posts-section min-vh-100 border'>
        <div 
          className='container relative md-top-extraDistance'
          style={{ '--extra-distance': `${extraDistance}px` } as React.CSSProperties}
        >

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

      <Categories category={category} />

      <Footer />
    </div>
  )
}

export default Index
