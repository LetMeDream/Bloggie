import Header from '../partials/Header'
import Footer from '../partials/Footer'

function ForgotPassword () {
  return (
    <>
      <Header />
      <section
        className='container d-flex flex-column vh-100'
        style={{ marginTop: '150px' }}
      >
        <div className='row align-items-center justify-content-center g-0 h-lg-100 py-8'>
          <div className='col-lg-5 col-md-8 py-8 py-xl-0'>
            <div className='card shadow'>
              <div className='card-body p-6'>
                <div className='mb-4'>
                  <h1 className='mb-1 fw-bold'>Forgot Password</h1>
                  <span>Let&apos;`s help you get back into your account</span>
                </div>
                <form className='needs-validation' noValidate={undefined}>
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
                      required={undefined}
                    />
                  </div>

                  <div>
                    <div className='d-grid'>
                      <button type='submit' className='btn btn-primary'>
                        Reset Password <i className='fas fa-arrow-right' />
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

export default ForgotPassword
