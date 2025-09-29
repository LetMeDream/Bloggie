import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPersonAddSharp, IoLogOut } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { GiAtomicSlashes } from "react-icons/gi";
import { useBloggieStore } from "../../store/store";
import useHeader from "../../hooks/useHeader";
import { logout } from "../../utils/auth";
/* Route for default user image */
const defaultImage = "https://raw.githubusercontent.com/LetMeDream/Bloggie/master/frontend/public/user.png"


const Header = () => {

  const location = useLocation();
  const path = location.pathname
  const { isLoggedIn, user, allUserData } = useBloggieStore();
  const [isLogged, setIsLogged] = useState(isLoggedIn());


  const { headerStyles, toggleMenu, toggleDropdown, closeDropdown, openDropdown, menuOpen } = useHeader();

  useEffect(() => {
    setIsLogged(isLoggedIn());
  }, [isLoggedIn, allUserData])

  return (
    /* Header */
    <header className='bg-[#fcfcfc] fixed top-0 left-0 w-full z-50 text-secondarys caret-transparent' id='header'>
      <div className={headerStyles['outer-container']}>
        <div className={headerStyles['inner-container']}>
          {/* Logo and Search Bar */}
          <div className={headerStyles['left-side']}>
            {/* Logo */}
            <div className={headerStyles['left-side-logo']}>
              <Link to='/' className="flex items-center gap-2">
                <GiAtomicSlashes className='text-7xl text-secondarys ' />
                <div className="text-2xl font-bold text-secondarys libertinus-sans-bold">
                  Bloggie
                </div>
              </Link>
            </div>

          </div>

          {/* Navigation Links */}
          <nav className={headerStyles['navigation-container']}>
            <ul className={headerStyles['navigation']}>
              <li className={headerStyles['li']}>
                <Link
                  to='/'
                  className={headerStyles['link']}
                >
                  Home
                </Link>
              </li>
              <li className={headerStyles['li']}>
                <Link
                  to='/category/'
                  className={headerStyles['link']}
                >
                  Category
                </Link>
              </li>
              {/* Pages Dropdown */}
              <li className='relative'>
                <button
                  onClick={() => toggleDropdown('pages')}
                  className={headerStyles['dropdown-btn']}
                >
                  Pages <IoMdArrowDropdown />
                </button>
                {openDropdown === 'pages' && (
                  <ul onMouseLeave={closeDropdown} className='absolute text-left py-2 !pl-2 bg-white rounded shadow-md mt-2 w-30'>
                    <li className='pb-2'>
                      <Link className='text-black' to='/about/'>
                        About
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/contact/'>
                        Contact
                      </Link>
                    </li>
                    <li><a href='#'>FAQ</a></li>
                  </ul>
                )}
              </li>
              {/* Dashboard Dropdown */}
              {/* Only show if user is logged in */}
              {isLogged && (
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('dashboard')}
                  className={headerStyles['dropdown-btn']}
                >
                  Dashboard <IoMdArrowDropdown />
                </button>
                {openDropdown === 'dashboard' && (
                  <ul onMouseLeave={closeDropdown} className='!pl-2 py-2 absolute text-left bg-white text-black rounded shadow-md mt-2 w-40'>
                    <li className='pb-2'>
                      <Link className='text-black' to='/dashboard/'>
                        Dashboard
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/posts/'>
                        Posts
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/add-post/'>
                        Add Post
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/comments/'>
                        Comments
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/notifications/'>
                        Notifications
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/profile/'>
                        Profile
                      </Link>
                    </li>
                    <li className="pb-2">
                      <button onClick={logout} className="text-black w-full text-left">
                        Logout
                        <IoLogOut className="inline ml-1" />
                      </button>
                    </li>
                  </ul>
                )}
              </li>)
              }
              {/* Register y Login condicionales */}
              {path !== '/register/' && !isLogged && (
                <li>
                  <Link to='/register/'
                    className={headerStyles['link-btn']}
                  >
                    Register
                    <IoPersonAddSharp />
                  </Link>
                </li>
              )}
              {path !== '/login/' && !isLogged && (
                <li>
                  <Link to='/login/'
                    className={headerStyles['link-btn']}
                  >
                    Login
                    <LuLogIn
                      className="font-bold"
                    />
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* WRITE */}
          <div className={headerStyles['social-media']}>
            {/* Beutifully styled input */}
            <div className="flex items-center gap-2">
              {/* User */}
              {  isLogged && (
                <>
                  <div className='flex gap-2 items-center text-sm'>
                    <span>
                      { user()?.username }
                    </span>

                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src={defaultImage} />
                      </div>  
                    </div>

                  </div>
                </>
              )}
              <CreateBtn />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className={headerStyles['mobile-menu-button']}>
            <button onClick={toggleMenu} className='w-full px-2 py-1 focus:outline-none border rounded'>
              <IoMenu size={30} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={headerStyles['responsive-menu-container']}>
            {/* Search Input */}
            <div className={headerStyles['responsive-input']}>
              <form className={headerStyles['responsive-search-container']}>
                <input
                  className={headerStyles['responsive-search']}
                  type="search"
                  placeholder="Search Articles"
                  aria-label="Search"
                />
              </form>
            </div>
            {/* Navigation Links */}
            <ul className={headerStyles['responsive-navigation']}>
              <li className={headerStyles['li']}>
                <Link to='/'
                  className='text-white focus:outline-none'>
                  Home
                </Link>
              </li>
              <li className={headerStyles['li']}>
                <Link
                  to='/category/'
                  className=' text-white '
                >
                  Category
                </Link>
              </li>
              <li className={headerStyles['li']}>
                <button
                  onClick={() => toggleDropdown('pages')}
                  className='font-semibold hover:text-gray-300 w-full'
                >
                  Pages ▾
                </button>
                {openDropdown === 'pages' && (
                  <ul className='!pl-3 py-2 flex flex-col w-[85%] max-w-[550px] rounded text-gray-300 bg-white items-start mt-2'>
                    <li className='pb-2'>
                      <Link className='text-black' to='/about/'>
                        About
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/contact/'>
                        Contact
                      </Link>
                    </li>
                    <li><a href='#'>FAQ</a></li>
                  </ul>
                )}
              </li>
              <li className={headerStyles['li']}>
                <button
                  onClick={() => toggleDropdown('dashboard')}
                  className='font-semibold flex justify-center hover:text-gray-300 w-full text-left'
                >
                  Dashboard ▾
                </button>
                {openDropdown === 'dashboard' && (
                  <ul className='!pl-3 flex flex-col w-[85%] max-w-[550px] rounded text-gray-300 bg-white items-start mt-2 py-2'>
                    <li className='pb-2 hover:text-gray-300'>
                      <Link className='text-black' to='/dashboard/'>
                        Dashboard
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/posts/'>
                        Posts
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/add-post/'>
                        Add Post
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/comments/'>
                        Comments
                      </Link>
                    </li>
                    <li className='pb-2'>
                      <Link className='text-black' to='/notifications/'>
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link className='text-black' to='/profile/'>
                        Profile
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Register y Login condicionales en menú móvil */}
              {path !== '/register/' && !isLogged && (
                <li className='py-2 m-0'>
                  <Link to='/register/'
                    className={headerStyles['link-btn']}
                  >
                    Register
                    <IoPersonAddSharp />
                  </Link>
                </li>
              )}
              {path !== '/login/' && !isLogged && (
                <li className='py-2 m-0'>
                  <Link 
                    to='/login/'
                    className={headerStyles['link-btn']}
                  >
                    Login
                    <LuLogIn
                      className="font-bold"
                    />
                  </Link>
                </li>
              )}
              {/* Create, if logged in */}
              {isLogged && (
                  <CreateBtn 
                    className={"mb-3 "} 
                  />
              )}
            </ul>
          </div>
        )}
      </div>
      <hr className="my-0 border-4  mx-auto dark:bg-gray-700" />
    </header>
  );
};

/* Btn for creating posts; Takes to /add-post/ */
const CreateBtn: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <div className={className}>
        {/* Beutifully styled input */}
        <Link
          className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in focus:shadow-none text-sm py-2 px-4 shadow-sm bg-gray-100 relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-gray-50 duration-150 hover:border-stone-600 !rounded-full hover:shadow-none"
          to='/add-post/'
        >
          <div
            className="!text-secondarys flex items-center gap-2"
          >
          Write...
          </div>
        </Link>
      </div>
    </>
  )
}


export default Header;
