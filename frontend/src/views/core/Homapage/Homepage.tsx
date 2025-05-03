import Header from '../../partials/Header'
import Footer from '../../partials/Footer'
import PostCard from '../../partials/PostCard'
import useHomePage from '../../../hooks/useHomePage'
// import apiInstance from '../../utils/axios'
// import Toast from '../../plugin/Toast'
import './Homepage.css'

function Index () {
const {
    currentPosts,
    totalPages,
    currentPage,
    handlePrevPage,
    pageNumbers,
    paginate,
    handleNextPage
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
                  currentPosts.map((post) => (
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
      <section className='bg-light pt-5 pb-5 mb-3 mt-3'>
        <div className='container'>
          <div className='row g-0'>
            <div className='col-12 '>
              <div className='mb-4'>
                <h2>Categories</h2>
              </div>
              <div className='d-flex flex-wrap justify-content-between'>
                {/* Aquí podrías mapear sobre el estado 'category' si quisieras hacerlo dinámico */}
                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    <img className='card-img' src='https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/father-son-1.jpg' style={{ width: '150px', height: '80px', objectFit: 'cover' }} alt='card image' />
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Life Style</h5>
                      <small>3 Articles</small>
                    </div>
                  </div>
                </div>
                {/* ... otros divs de categoría estáticos ... */}
                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    <img className='card-img' src='https://assets.entrepreneur.com/content/3x2/2000/1599591949-GettyImages-1174414266.jpg' style={{ width: '150px', height: '80px', objectFit: 'cover' }} alt='card image' />
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Entertainment</h5>
                      <small>1 Articles</small>
                    </div>
                  </div>
                </div>
                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    <img
                      className='card-img'
                      src='https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960'
                      style={{ width: '150px', height: '80px', objectFit: 'cover' }}
                      alt='card image'
                    />
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Cars</h5>
                      <small>2 Articles</small>
                    </div>
                  </div>
                </div>

                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    <img className='card-img' src='' style={{ width: '150px', height: '80px', objectFit: 'cover' }} alt='card image' />
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Sports</h5>
                      <small>8 Articles</small>
                    </div>
                  </div>
                </div>

                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    <img className='card-img' src='https://aliviohealth.com/wp-content/uploads/2022/07/Managing-Mental-Health-During-COVID-19.jpg' style={{ width: '150px', height: '80px', objectFit: 'cover' }} alt='card image' />
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Health</h5>
                      <small>7 Articles</small>
                    </div>
                  </div>
                </div>

                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    {/* Imagen comentada original */}
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Fashion</h5>
                      <small>4 Articles</small>
                    </div>
                  </div>
                </div>

                <div className='mt-2'>
                  <div className='card bg-transparent'>
                    <img className='card-img' src='' style={{ width: '150px', height: '80px', objectFit: 'cover' }} alt='card image' />
                    <div className='d-flex flex-column align-items-center mt-3 pb-2'>
                      <h5 className='mb-0'>Tech</h5>
                      <small>13 Articles</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Sección Latest Articles (Removida ya que ahora se pagina la sección anterior) --- */}
      {/* Si quisieras mantener esta sección separada, necesitarías otra llamada a la API
             o filtrar/ordenar los 'posts' de manera diferente aquí. Por simplicidad,
             asumimos que la paginación aplica a la lista principal de posts. */}

      <Footer />
    </div>
  )
}

export default Index
