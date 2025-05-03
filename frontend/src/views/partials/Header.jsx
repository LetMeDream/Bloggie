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
    <header className="bg-neutral-800 text-white z-50 relative flex items-center ">
    <div className="container py-3 flex flex-nowrap justify-between items-center w-full">
      {/* Logo */}
      <div className="flex items-center">
        <div className="mr-5 w-48">
          <Link className='' to='/'>
            <img
              className=''
              src='https://i.postimg.cc/ZRNC1mhM/my-main-logo.png'
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
              className="p-2 inline-flex items-center bg-green-600 text-white rounded hover:bg-green-600 focus:outline-none"
              >
              Register
              </Link>
            </li>
            <li>
              <Link to='/login/' 
              className='p-2 inline-flex items-center bg-green-600 text-white rounded hover:bg-green-600 focus:outline-none' href='dashboard.html'>
              Login 
              </Link>
            </li>
          </ul>
        </nav>
        {/* Mobile menu button */}
        <div className=" lg:hidden flex justify-end w-full  ">
          <button onClick={toggleMenu} className="flex focus:outline-none font-semibold text-2xl border rounded">
          Menu <IoMenu  size={30}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden menu-open bg-neutral-800 absolute top-full left-0 w-full bg-gray-800 shadow-md transition-all duration-300">
           {/* Search Input */}
    <div className="w-full px-4  flex justify-center">
      <form className="w-full flex justify-center">
        <input
          className="md:w-[70%] w-[70%] min-w-[400px] min-w pl-3 py-2 rounded-md tex bg-white text-black focus:outline-none"
          type="search"
          placeholder="Search Articles"
          aria-label="Search"
        />
      </form>
    </div>
          <ul className="font-semibold flex flex-col items-center justify-center p-2 space-y-4">
            <li className="py-2 m-0">
              <Link to="/"
              className=" no-underline text-white hover:text-black focus:outline-none">
              Home
              </Link>
            </li>
            <li className="py-2 m-0"> 
              <Link to='/category/'
              className='no-underline text-white hover:text-black focus:outline-none'>
              Category
              </Link>
            </li>
            <li className="py-2 m-0">
              <button 
                onClick={() => toggleDropdown('pages')}
                className="hover:text-gray-300 w-full"
              >
                Pages ▾
              </button>
              {openDropdown === 'pages' && (
                <ul className="flex flex-col min-w-[420px] md:min-w-[700px] rounded  rounded text-gray-300 bg-white items-start mt-2 space-y-2 text-sm ">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
              )}
            </li>
            <li className="py-2 m-0">
              <button 
                onClick={() => toggleDropdown('dashboard')}
                className="flex justify-center hover:text-gray-300 w-full text-left"
              >
                Dashboard ▾
              </button>
              {openDropdown === 'dashboard' && (
                <ul className="flex flex-col min-w-[420px] md:min-w-[700px] rounded text-gray-300 bg-white items-start mt-2 space-y-2 text-sm">
                  <li>
                    <Link to='/dashboard/'>
                    Dashboard
                    </Link>
                  </li>
                  <li >
                    <Link to='/posts/'>
                    Posts
                    </Link>
                  </li>
                  <li >
                  <Link to='/add-post/'>
                    Add Post
                  </Link>
                  </li>
                  <li>
                    <Link to='/comments/'>
                      Comments
                    </Link>
                  </li>
                  <li>
                    <Link to='/notifications/'>
                      Notifications
                    </Link>
                  </li>
                  <li>
                    <Link to='/profile/'>
                      Profile
                    </Link></li>
                </ul>
              )}
            </li>
            <li className="py-2 m-0">
              <Link to="/register/"
              className="p-2 mb-0 inline-flex items-center bg-green-600 text-white rounded hover:bg-green-600 focus:outline-none"
              >
              Register
              </Link>
            </li>
            <li className="py-2 m-0">
              <Link to='/login/' 
              className='p-2 inline-flex items-center bg-green-600 text-white rounded hover:bg-green-600 focus:outline-none' href='dashboard.html'>
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
