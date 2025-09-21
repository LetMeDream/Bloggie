import Header from '../../../partials/Header'
import Footer from '../../../partials/Footer'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import MDXEditory from './MDXEditor/MDXEditor'
import CreatableSelect from 'react-select/creatable';
import { AddPostForm } from '../../../../types/posts'

function AddPost () {
  const methods = useForm<AddPostForm>({
    defaultValues: {
      title: '',
      description: '',
      status: 'draft',
      tags: [],
      category: '',
      user: '',
      image: ''
    }
  })

  const { handleSubmit, register, setValue } = methods

  const onSubmit = (data: any) => {
    console.log(data)
    // Here you would typically send the data to your backend
  } 

  const selectableOptions = [
    { value: 'health', label: 'Health' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'fitness', label: 'Fitness' }
  ]

  return (
    <>
      <Header />
      <section className='pt-5 pb-5 parallax-bg'>
        <div className='container'>
          <div className='row mt-0 mt-md-4'>
            <div className='col-lg-12 col-md-8 col-12'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Header/Hero */}
                <section className='py-4 py-lg-6 bg-primarys/80 rounded-3 mt-10'>
                  <div className='container'>
                    <div className='row'>
                      <div className='offset-lg-1 col-lg-10 col-md-12 col-12'>
                        <div className='d-lg-flex align-items-center justify-content-between'>
                          <div className='mb-4 mb-lg-0'>
                            <h1 className='text-white mb-1'>
                              Create Blog Post
                            </h1>
                            <p className='mb-0 text-white lead'>
                              Use the article builder below to write your
                              article.
                            </p>
                          </div>
                          <div>
                            <Link
                              to='/instructor/posts/'
                              className='btn'
                              style={{
                                backgroundColor: 'white'
                              }}
                            >
                              {' '}
                              <i className='fas fa-arrow-left' /> Back to
                              Posts
                            </Link>
                            <a
                              href='instructor-posts.html'
                              className='btn btn-dark ms-2'
                            >
                              Save Changes{' '}
                              <i className='fas fa-check-circle' />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Fields down here */}
                <section className='pb-8 mt-5'>
                  <div className='card mb-3'>
                    {/* Basic Info Section */}
                    <div className='card-header px-4 py-3'>
                      <h4 className='mb-0'>Basic Information</h4>
                    </div>
                    <div className='card-body'>
                      {/* Description start */}
                      <div className='mb-3'>
                          <label className='form-label'>Post:</label>
                          <MDXEditory 
                            setValue={setValue}
                          />
                      </div>
                      {/* Description end */}
                      
                      {/* Title start */}
                      <div className='mb-3'>
                        <label className='form-label'>Title</label>
                        <input
                          className='form-control'
                          type='text'
                          placeholder=''
                          {...register('title')}
                        />
                        <small>Write a 60 character post title.</small>
                      </div>
                      {/* Title end */}
                      {/* Category start */}
                      <div className='mb-3'>
                        <label className='form-label'>Posts category</label>
                        <select className='form-select' {...register('category')}>
                          <option value=''>-------------</option>
                          <option value='React'>Lifestyle</option>
                          <option value='Javascript'>Fashion</option>
                          <option value='HTML'>Tech</option>
                          <option value='Vue'>Health</option>
                          <option value='Gulp'>Entertainment</option>
                        </select>
                        <small>
                          Help people find your posts by choosing categories
                          that represent your post.
                        </small>
                      </div>
                      {/* Category end */}
                      {/* Tag start */}
                      <div className='mb-3'>
                        <label className='form-label'>Tag</label>
                        <CreatableSelect 
                          isClearable
                          isMulti
                          options={selectableOptions}
                          onChange={(selected) => {
                            let values: string[] = []
                            selected.forEach((item) => {
                              values.push(item.value)
                            })
                            setValue('tags', values);
                            console.log('Selected tags:', selected);
                          }}
                        />
                      </div>
                      {/* Tag end */}

                      {/* Thumbnail Preview */}
                      <label htmlFor='postTHumbnail' className='form-label'>
                        Preview
                      </label>
                      <img
                        style={{
                          maxWidth: '100%',
                          height: '330px',
                          objectFit: 'fill',
                          borderRadius: '10px',
                          margin: '0 auto'
                        }}
                        className='mb-4'
                        src='https://www.eclosio.ong/wp-content/uploads/2018/08/default.png'
                        alt=''
                      />
                      {/* Thumbnail Preview End */}
                      {/* Input Image */}
                      <div className='mb-3'>
                        <label htmlFor='postTHumbnail' className='form-label'>
                          Thumbnail
                        </label>
                        <input
                          id='postTHumbnail'
                          className='form-control'
                          type='file'
                          accept='image/*'
                          {...register('image')}
                        />
                      </div>
                      {/* Input Image End */}
                    </div>
                  </div>
                  <button
                    className='btn btn-lg !bg-primarys hover:!bg-primarys-hover w-100 mt-2'
                    type='submit'
                  >
                    Create Post <i className='fas fa-check-circle' />
                  </button>
                </section>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AddPost
