import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useBloggieStore } from '../../store/store'
import { register } from '../../utils/auth'
import { useState } from 'react'
import Toast from '../../plugin/Toast'
import { handleAPIError } from '../../utils/shared'

function Register () {
  const [registerData, setRegisterData] = useState({ full_name: '', email: '', password: '', password2: '' })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegisterDataChanege = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await register(registerData.full_name, registerData.email, registerData.password, registerData.password2)
      if (response.status === 201) {
        setIsLoading(false)
        navigate('/login')
      } else {
  
        let err = handleAPIError(response?.error)
        
        //let err = response?.error?.length < 100 ? Object.values(response?.error)[0]?.toString() : 'Something went wrong'
        console.log(err)
        setIsLoading(false)
        Toast('error', 'Registration failed', err)
      }
    } catch (error) {
      setIsLoading(false)
      alert('An error occurred. Please try again.')
    }
  }


  return (
    <>
      <Header />
      <section
        className='container d-flex flex-column vh-100 mt-[40px]'
      >
        <div className='row align-items-center justify-content-center g-0 h-lg-100 py-8'>
          <div className='col-lg-5 col-md-8 py-8 py-xl-0'>
            <div className='card shadow'>
              <div className='card-body p-6'>
                <div className='mb-4'>
                  <h1 className='mb-1 fw-bold'>Sign up</h1>
                  <span>
                    Already have an account?
                    <Link to='/login/' className='ms-1'>
                      Sign In
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form 
                  className='needs-validation' 
                  noValidate={undefined} 
                  autoComplete="off"
                  onSubmit={handleRegister}
                >
                  {/* Username */}
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      id='full_name'
                      className='form-control'
                      name='full_name'
                      placeholder='John Doe'
                      required={undefined}
                      onChange={handleRegisterDataChanege}
                      autoComplete='off'
                    />
                  </div>
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
                      onChange={handleRegisterDataChanege}
                      autoComplete='off'
                    />
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
                      required={undefined}
                      onChange={handleRegisterDataChanege}
                      autoComplete='off'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      id='password2'
                      className='form-control'
                      name='password2'
                      placeholder='**************'
                      required={undefined}
                      onChange={handleRegisterDataChanege}
                      autoComplete='off'
                    />
                  </div>
                  <div>
                    <div className='d-grid'>
                      <button type='submit' className='btn btn-primary'>
                        Sign Up <i className='fas fa-user-plus' />
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

export default Register
