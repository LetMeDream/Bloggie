import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { Link } from 'react-router-dom'
import useDetail from '../../hooks/useDetail';
import { useBloggieStore } from '../../store/store';
import Loader from '../pages/Loader/Loader';
import { Post } from '../../types/posts'

function Detail () {
  const {currentPost}:{currentPost:Post[]} = useDetail()
  const isLoading = useBloggieStore(state => state.loading)

  return (isLoading) ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className='mt-4'>
        <div className='container mx-auto'>
          <div className='flex flex-row'>
            <div className='w-full'>
              <a href="#" className="inline-block text-sm font-semibold px-2 py-1 rounded text-white mb-2 no-underline bg-red-600">
                <i className='small font-bold' />
                Lifestyle
              </a>
              <h1 className='text-center'>
                {currentPost.length > 0 ? currentPost[0].title : ''}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className='pt-0'>
        <div className='container mx-auto relative'>
          <div className='flex flex-row'>
            <div className='lg:w-1/6'>
              <div
                className='text-start lg:text-center mb-5'
                data-sticky=''
                data-margin-top={80}
                data-sticky-for={991}
              >
                <div className='relative'>
                  <div className=''>
                  </div>
                  <a
                    href='#'
                    className='h5 font-bold text-dark no-underline mt-2 block'
                  >
                    {currentPost.length > 0 ? currentPost[0].user.full_name : ''}
                  </a>
                  <p className='mb-0'>Writer at Desphixs</p>
                </div>

                <hr className='hidden lg:block border-t my-2' />

                <ul className='list-none p-0'>
                  <li className='block my-2 text-start'>
                    <i className='fas fa-calendar' />
                    {currentPost.length > 0 ? currentPost[0].date : ''}
                  </li>
                  <li className='block my-2 text-start'>
                    <i className='fas fa-clock' /> 5 min read
                  </li>
                  <li className='block my-2 text-start'>
                    {currentPost.length > 0 && currentPost[0].likes > 0 ? currentPost[0].likes + ' likes' : '0 likes'}
                  </li>
                  <li className='block my-2 text-start'>
                    <i className='fas fa-eye' />
                    {currentPost.length > 0 ? currentPost[0].view + ' views': ''}
                  </li>
                </ul>
                {/* Tags */}
                <ul className='flex flex-wrap gap-2 mt-0 lg:mt-3 text-start'>
                </ul>
              </div>
            </div>
            {/* Left sidebar END */}
            {/* Main Content START */}
            <div className='lg:w-5/6 mb-5'>
              <div className=' ml-4 '>
                <p className="min-h-[50vh] mt-1 pb-2">
                  {currentPost.length > 0 ? currentPost[0].description : ''}
                </p>
              </div>
              <div className='mt-5'>
                <h2 className='my-3 flex items-center'>
                  <i className='bi bi-symmetry-vertical mr-2' />
                  Related post
                </h2>
                <section className='pt-4 pb-0'>
                  <div className='container mx-auto'>
                    <div className='flex flex-wrap -mx-2'>
                      {[1,2,3,4].map((_, i) => (
                        <div className='w-full sm:w-1/2 lg:w-1/4 px-2 mb-4' key={i}>
                          <div className='card mb-4'>
                            <div className='relative'>
                              <img
                                className='w-full h-40 object-cover'
                                src='https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/kitchen-and-dining-room-P5JHHM6.jpg'
                                alt='Card image'
                              />
                            </div>
                            <div className='px-3 pt-3'>
                              <h4 className="text-lg font-semibold mb-2">
                                <Link
                                  to='/7-common-mistakes-everyone-makes-while-travelling/'
                                  className=' text-black font-bold no-underline'
                                >
                                  7 common mistakes everyone makes while traveling
                                </Link>
                              </h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <hr className='my-8' />
              <div className='flex py-4'>
                <a href='#'>
                  <div className=' mr-4'>
                  </div>
                </a>
                <div>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                      <h4 className='m-0'>
                        <a href='#' className='text-black no-underline'>
                      Louis Farguson
                        </a>
                      </h4>
                      <small>Writer at Desphixs</small>
                    </div>
                  </div>
                  <p className='my-2'>
                    Louis Ferguson is a senior editor for the blogzine and also
                    reports on breaking news based in London. He has written
                    about government, criminal justice, and the role of money in
                    politics since 2015.
                  </p>
                  {/* Social icons */}
                  <ul className='flex space-x-2'>
                    <li>
                      <a className='text-blue-600 text-xl' href='#'>
                        <i className='fab fa-facebook-square' />
                      </a>
                    </li>
                    <li>
                      <a className='text-blue-400 text-xl' href='#'>
                        <i className='fab fa-twitter-square' />
                      </a>
                    </li>
                    <li>
                      <a className='text-blue-700 text-xl' href='#'>
                        <i className='fab fa-linkedin' />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className='text-xl font-bold'>3 comments</h3>
                <div className='my-4 flex bg-gray-100 p-3 mb-3 rounded'>
                  <img
                    className='rounded-full mr-3'
                    src='https://img.freepik.com/free-photo/front-portrait-woman-with-beauty-face_186202-6146.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710979200&semt=ais'
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                    alt='avatar'
                  />
                  <div>
                    <div className='mb-2'>
                      <h5 className='m-0'>Benny William</h5>
                      <span className='mr-3 text-sm'>June 11, 2023.</span>
                    </div>
                    <p className='font-bold'>
                      Thanks you very much for the post, it really helped.{' '}
                    </p>
                  </div>
                </div>

                <div className='my-4 flex bg-gray-100 p-3 mb-3 rounded'>
                  <img
                    className='rounded-full mr-3'
                    src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                    alt='avatar'
                  />
                  <div>
                    <div className='mb-2'>
                      <h5 className='m-0'>Jerry Doe</h5>
                      <span className='mr-3 text-sm'>June 12, 2024.</span>
                    </div>
                    <p className='font-bold'>Post more of these, please. </p>
                  </div>
                </div>

                <div className='my-4 flex bg-gray-100 p-3 mb-3 rounded'>
                  <img
                    className='rounded-full mr-3'
                    src='https://www.faceapp.com/static/img/content/compare/impression-example-after@2x.jpg'
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                    alt='avatar'
                  />
                  <div>
                    <div className='mb-2'>
                      <h5 className='m-0'>Ken Altman</h5>
                      <span className='mr-3 text-sm'>June 14, 2024.</span>
                    </div>
                    <p className='font-bold'>Amazing blog post, keep it up. </p>
                  </div>
                </div>
              </div>
              {/* Comments END */}
              {/* Reply START */}
              <div className='bg-gray-100 p-3 rounded'>
                <h3 className='font-bold'>Leave a reply</h3>
                <small>
                  Your email address will not be published. Required fields are
                  marked *
                </small>
                <form className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-2'>
                  <div>
                    <label className='form-label'>Name *</label>
                    <input
                      type='text'
                      className='bg-white p-2 rounded  outline-none focus:outline-none form-input w-full'
                      aria-label='First name'
                    />
                  </div>
                  <div>
                    <label className='form-label'>Email *</label>
                    <input type='email' className='p-2 bg-white rounded form-input  outline-none focus:outline-none w-full' />
                  </div>
                  <div className='md:col-span-2'>
                    <label className='form-label'>Write Comment *</label>
                    <textarea className='bg-white min-h-[60px] rounded form-textarea w-full  outline-none focus:outline-none' rows={4} />
                  </div>
                  <div className='md:col-span-2'>
                    <button type='submit' className='bg-sky-900 text-white font-semibold px-4 py-2 rounded hover:bg-gray-700'>
                      Post comment <i className='fas fa-paper-plane' />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Detail