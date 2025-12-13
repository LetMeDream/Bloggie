import Header from '../../../partials/Header'
import Footer from '../../../partials/Footer'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import MDXEditory from './MDXEditor/MDXEditor'
import Creatable from '../../Inputs/CreatableSelect'
import { AddPostForm } from '../../../../types/posts'
import Select from '../../Inputs/Select'
import SelectableImage from '../../Inputs/SelectableImage'
import useAddPost from '../../../../hooks/useAddPost'
// @ts-ignore
import wood from '../../../../assets/wood.jpg';

function AddPost () {
  const methods = useForm<AddPostForm>({
    defaultValues: {
      title: 'Test Post',
      description: '',
      status: 'Active',
      tags: ['health', 'fitness'],
      category: 5,
      user: '67',
      image: ''
    }
  })

  const { handleSubmit, register, setValue, getValues, reset } = methods
  const { addPost } = useAddPost({ reset })

  /* Default value for the MDX editor, here we are able to use all of the special Markdown syntaxes */
  const defaultValue = `
    # Titleless?
    ---
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    #### Listing:
    - One
    - Two
    - Three
    
    ---
    ### Code Example
    \`\`\`js
      let x = 5;
      let y = 6;
      let z = x + y;
      console.log('Hello world from a markdown')
    \`\`\`

    ---
    ### Live Code (React) Examples

    \`\`\`tsx live react
    import React, { useState } from 'react';

    export default function App() {
      const [count, setCount] = useState(0);

      return (
        <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
          <h1>Contador clásico</h1>
          <p>Valor: {count}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
      );
    }
    \`\`\`
  `

  return (
    <>
      <Header />
      <section className='pt-5 pb-5 parallax-bg'
        style={{
          backgroundImage: `url(${wood})`,
        }}
      >
        <div className='container'>
          <div className='row mt-0 mt-md-4'>
            <div className='col-12'>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(addPost)}>
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
                        <h4 className='mb-0'>Post Information</h4>
                      </div>
                      <div className='card-body'>
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

                        {/* Description start */}
                        <div className='mb-3'>
                            <label className='form-label'>Post:</label>
                            <MDXEditory 
                              defaultValue={defaultValue}
                              setValue={setValue}
                              name={'description'}
                            />
                        </div>
                        {/* Description end */}
                        
                        {/* Category start */}
                        <div className='mb-3'>
                          <label className='form-label'>Posts category</label>
                          <Select
                            register={register}
                            name={'category'}
                            setValue={setValue}
                            getValues={getValues}
                            fetchable={true}
                            url={'/post/category/list'}
                            // options={[{ title: <string>, id: <number> }]}
                          />
                          <small>
                            Help people find your posts by choosing categories
                            that represent your post.
                          </small>
                        </div>
                        {/* Category end */}
                        {/* Tag start */}
                        <div className='mb-3'>
                          <Creatable 
                            setValue={setValue} 
                            label='Tags'
                            getValues={getValues}
                          />
                        </div>
                        {/* Tag end */}

                        <div className=' mb-3 flex gap-4 items-center'>
                          <SelectableImage 
                            register={register} 
                            name='image'
                          />
                        </div>
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
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AddPost
