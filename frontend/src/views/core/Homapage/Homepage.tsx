import Header from '../../partials/Header'
import Cn from 'classnames'
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
import Loader from '../../core/Loader/Loader' 

function Index () {
  const {
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
    }:{
        currentPosts: Post[]
        category: CategoryType[];
        totalPages: number
        currentPage: number
        handlePrevPage: () => void
        pageNumbers: number[]
        paginate: (pageNumber: number) => void
        handleNextPage: () => void,
        isFirstPage: boolean,
        isLastPage: boolean
  } = useHomePage()

  const isLoading = useBloggieStore(state => state.loading)

  return isLoading ? <Loader/> : (
    <div>
      <Header/>

      <section className='posts-section min-vh-100 border parallax-bg'>
        <div 
          className='container relative md:mt-28'
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
          {totalPages > 1 && (
            <nav className='d-flex mt-4 justify-content-center'>
              <ul className='pagination mb-0'>
                <li className={Cn('page-item', { disabled: isFirstPage })}>
                  <button
                    onClick={handlePrevPage}
                    className={Cn('page-link text-dark fw-bold me-1 rounded caret-transparent ', { '!text-gray-300': isFirstPage })}
                    disabled={isFirstPage}
                    aria-label='Previous'
                  >
                    <i className='fas fa-arrow-left me-2' />
                    Previous
                  </button>
                </li>
              </ul>
              <ul className='pagination mb-0 mx-1'>
                {pageNumbers.map(number => (
                  <li key={number} className={Cn('page-item ms-1', { active: currentPage === number })}>
                    <button
                      onClick={() => paginate(number)}
                      className={Cn('page-link text-dark fw-bold rounded')}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className='pagination mb-0'>
                <li className={Cn('page-item', { 'disabled': isLastPage })}>
                  <button
                    onClick={handleNextPage}
                    className={Cn('page-link text-dark fw-bold ms-1 rounded caret-transparent ', { '!text-gray-300': isLastPage })}
                    disabled={isLastPage}
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

      <section className='bg-gray-50'>
        <Categories category={category} />
      </section>

      <Footer />
    </div>
  )
}

export default Index
