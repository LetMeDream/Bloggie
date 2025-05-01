import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="bg-gray-900 text-white z-50 relative flex items-center ">
    <div className="container flex flex-nowrap justify-between items-center pt-2 pb-2 w-full">
      {/* Logo */}
      <div className="flex items-center">
        <div className="mr-5">
          <Link className='' to='/'>
            <img
              className=''
              src='https://i.postimg.cc/ZRNC1mhM/my-main-logo.png'
              style={{ width: '200px' }}
              alt='logo'
            />
          </Link>
      </div>
      {/* Search Bar */}
      <div className="hidden lg:block search-input w-full md:w-auto  flex-grow md:flex-grow-0 md:mx-4">
      <form className=''>
          <input
          className='w-full md:w-60 px-4 rounded-md pt-2 pb-2 bg-white text-black focus:outline-none'
          type='search'
          placeholder='Search Articles'
          aria-label='Search'
          />
            <Link
            to='/search/'
            className=''
            type='submit'
            >
            </Link>
        </form>
      </div>
      </div>
       
        <nav className="hidden lg:flex items-center flex justify-center ">
          <ul className="flex p-0 items-center justify-center space-x-3 nowrap h-full ">
            <li>
              <Link to="/"
              className=" no-underline text-white hover:text-black focus:outline-none">
              Home
              </Link>
            </li>
            <li> 
              <Link className='no-underline text-white hover:text-black focus:outline-none' 
              to='/category/'>
                  Category
              </Link>
            </li>
            {/* Pages Dropdown */}
            <li className="relative">
              <button 
                onClick={() => toggleDropdown('pages')}
                className="flex items-center hover:text-gray-300 focus:outline-none"
              >
                Pages <IoMdArrowDropdown />

              </button>
              {openDropdown === 'pages' && (
                <ul onMouseLeave={closeDropdown} className="absolute text-left p-3 pt-2 bg-white rounded shadow-md mt-2 w-30">
                  <li className="pb-2">
                    <Link className='text-black' to='/about/'>
                      About
                    </Link>
                  </li>
                  <li className="pb-2">
                  <Link className='text-black' to='/contact/'>
                      Contact
                    </Link>
                  </li>
                  <li className=""><a href="#">FAQ</a></li>
                </ul>
              )}
            </li>
            {/* Dashboard Dropdown */}
            <li className="relative">
              <button 
                onClick={() => toggleDropdown('dashboard')}
                className="flex items-center hover:text-gray-300 focus:outline-none"
              >
                Dashboard <IoMdArrowDropdown />

              </button>
              {openDropdown === 'dashboard' && (
                <ul onMouseLeave={closeDropdown} className='absolute p-3 text-left bg-white text-black rounded shadow-md mt-2 w-40 '>
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
                  <li className=''>
                    <Link className='text-black' to='/profile/'>
                      Profile
                    </Link></li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/register/"
              className="p-2 inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              >
              Register
              </Link>
            </li>
            <li>
              <Link to='/login/' 
              className='p-2 inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none' href='dashboard.html'>
              Login 
              </Link>
            </li>
          </ul>
        </nav>
        {/* Mobile menu button */}
        <div className="block lg:hidden flex justify-center w-full pt-3 ">
          <button onClick={toggleMenu} className="focus:outline-none text-2xl">
          <IoMenu  size={30}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden menu-open bg-gray-800 absolute top-full left-0 w-full bg-gray-800 shadow-md transition-all duration-300">
          <ul className="flex flex-col items-start p-4 space-y-4">
            <li>
              <Link to="/"
              className=" no-underline text-white hover:text-black focus:outline-none">
              Home
              </Link>
            </li>
            <li> 
              <Link to='/category/'
              className='no-underline text-white hover:text-black focus:outline-none'>
              Category
              </Link>
            </li>
            <li>
              <button 
                onClick={() => toggleDropdown('pages')}
                className="hover:text-gray-300 w-full text-left"
              >
                Pages ▾
              </button>
              {openDropdown === 'pages' && (
                <ul className="ml-4 mt-2 space-y-2 text-sm">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              )}
            </li>
            <li>
              <button 
                onClick={() => toggleDropdown('dashboard')}
                className="hover:text-gray-300 w-full text-left"
              >
                Dashboard ▾
              </button>
              {openDropdown === 'dashboard' && (
                <ul className="ml-4 mt-2 space-y-2 text-sm">
                  <li>
                    <Link className='text-white' to='/dashboard/'>
                    Dashboard
                    </Link>
                  </li>
                  <li className=''>
                    <Link className='text-white' to='/posts/'>
                    Posts
                    </Link>
                  </li>
                  <li className=''>
                  <Link className='text-white' to='/add-post/'>
                    Add Post
                  </Link>
                  </li>
                  <li className=''>
                    <Link className='text-white' to='/comments/'>
                      Comments
                    </Link>
                  </li>
                  <li className=''>
                    <Link className='text-white' to='/notifications/'>
                      Notifications
                    </Link>
                  </li>
                  <li className=''>
                    <Link className='text-white' to='/profile/'>
                      Profile
                    </Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/register/"
              className="p-2 inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              >
              Register
              </Link>
            </li>
            <li>
              <Link to='/login/' 
              className='p-2 inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none' href='dashboard.html'>
              Login 
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
