import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  return (
    <header className="bg-gray-900 text-white z-50 relative">
    <div className="container mx-auto flex flex-wrap justify-between items-center p-4">
      {/* Logo */}
      <div className="text-2xl font-bold">
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
      <div className="w-full md:w-auto mt-2 md:mt-0 flex-grow md:flex-grow-0 md:mx-4">
        <form className=''>
          <input
          className='w-full md:w-72 px-4 py-2 rounded-md bg-white text-black focus:outline-none'
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
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6">
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
                className="hover:text-gray-300 focus:outline-none"
              >
                Pages ▾
              </button>
              {openDropdown === 'pages' && (
                <ul className="absolute bg-white rounded shadow-md mt-2 w-40">
                  <li className="">
                    <Link className='text-black' to='/about/'>
                      About
                    </Link>
                  </li>
                  <li className="">
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
                className="hover:text-gray-300 focus:outline-none"
              >
                Dashboard ▾
              </button>
              {openDropdown === 'dashboard' && (
                <ul className='absolute bg-white text-black rounded shadow-md mt-2 w-48'>
                  <li className=''> 
                  <Link className='text-black' to='/dashboard/'>
                   Dashboard
                  </Link>
                  </li>
                  <li className=''>
                    <Link className='text-black' to='/posts/'>
                    Posts
                    </Link>
                  </li>
                  <li className=''>
                  <Link className='text-black' to='/add-post/'>
                    Add Post
                  </Link>
                  </li>
                  <li className=''>
                    <Link className='text-black' to='/comments/'>
                      Comments
                    </Link>
                  </li>
                  <li className=''>
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
              className="inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              >
              Register
              </Link>
            </li>
            <li>
              <Link to='/login/' 
              className='inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none' href='dashboard.html'>
              Login 
              </Link>
            </li>
          </ul>
        </nav>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
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
              className="inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              >
              Register
              </Link>
            </li>
            <li>
              <Link to='/login/' 
              className='inline-flex items-center bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none' href='dashboard.html'>
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
