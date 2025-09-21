import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { Link } from 'react-router-dom'

function Login () {
  return (
    <>
      <Header />
      <section className='min-h-[100dvh] flex-grow-1 mt-[40px] parallax-bg'>
        <div className='row align-items-center justify-content-center g-0 h-lg-100 py-8'>
          <div className='col-lg-5 col-md-8 py-8 py-xl-8'>
            <div className='card shadow'>
              <div className='card-body p-6'>
                <div className='mb-4'>
                  <h1 className='mb-1 fw-bold'>Sign in</h1>
                  <span>
                    Don’t have an account?
                    <Link to='/register/' className='ms-1 link-secondarys !underline'>
                      Sign up
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form className='needs-validation'>
                  {/* Username */}
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='form-control'
                      name='email'
                      placeholder='johndoe@gmail.com'
                      required
                    />
                    <div className='invalid-feedback'>
                      Please enter valid username.
                    </div>
                  </div>
                  {/* Password */}
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='form-control'
                      name='password'
                      placeholder='**************'
                      required
                    />
                    <div className='invalid-feedback'>
                      Please enter valid password.
                    </div>
                  </div>
                  {/* Checkbox */}
                  <div className='d-lg-flex justify-content-between align-items-center mb-4'>
                    <div className='form-check'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id='rememberme'
                        required
                      />
                      <label className='form-check-label' htmlFor='rememberme'>
                        Remember me
                      </label>
                      <div className='invalid-feedback'>
                        You must agree before submitting.
                      </div>
                    </div>
                    <div>
                      <Link to='/forgot-password/' className='link-secondarys !underline'>Forgot your password?</Link>
                    </div>
                  </div>
                  <div>
                    <div className='d-grid'>
                      <button type='submit' className='btn btn-secondarys'>
                        Sign in <i className='fas fa-sign-in-alt' />
                      </button>
                    </div>
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

export default Login
