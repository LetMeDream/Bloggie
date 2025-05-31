import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleDropdown = (menu: string | null) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };
  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const headerStyles = {
    'outer-container': 'bg-neutral-800 text-white z-50 relative flex items-center',
    'inner-container':'py-2 lg:py-0 container flex flex-nowrap justify-between items-center w-full',
    'left-side': 'flex items-center',
    'left-side-logo': 'mr-5 w-48',
    'left-side-search-container': 'hidden lg:block search-input w-full md:w-auto  flex-grow md:flex-grow-0 md:mx-4',
    'left-side-search': 'w-full md:w-60 px-4 rounded-md pt-2 pb-2 bg-white text-black focus:outline-none',
    'navigation-container': 'hidden lg:flex items-center justify-center',
    'navigation': 'flex items-center justify-center space-x-3 nowrap h-full',
    'mobile-menu-button': 'lg:hidden flex items-center justify-center',
    'responsive-menu-container': 'lg:hidden menu-open absolute top-full left-0 w-full bg-gray-800 shadow-md transition-all duration-300',
    'responsive-input': 'w-full pt-2 px-4 flex justify-center',
    'responsive-navigation': 'flex flex-col items-center justify-center',
    'responsive-search-container': 'w-full flex justify-center',
    'responsive-search': 'w-[80%] max-w-[500px] px-4 py-2 rounded-md bg-white text-black focus:outline-none',
    'link-btn': 'p-2 flex items-center gap-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none',
    'li': 'py-2 m-0 w-full flex flex-col justify-center items-center hover:text-gray-300 no-underline text-white font-semibold',
    'link': 'mr-2 text-white hover:!text-gray-300',
    'dropdown-btn': 'font-semibold hover:text-gray-300 flex items-center'
}

  return (
    <header className={headerStyles['outer-container']}>
      <div className={headerStyles['inner-container']}>    
        {/* Logo and Search Bar */}  
        <div className={headerStyles['left-side']}>
          {/* Logo */}
          <div className={headerStyles['left-side-logo']}>
            <Link to='/'>
              <img
                src="https://i.postimg.cc/ZRNC1mhM/my-main-logo.png"
                alt="logo"
              />
            </Link>
          </div>
          {/* Search Bar */}
          <div className={headerStyles['left-side-search-container']}>
            <form>
              <input
              className={headerStyles['left-side-search']}
              placeholder="Search Articles"
              aria-label="Search"
              />
                <Link
                to='/search/'
                className=''
                type="submit"
                >
                </Link>
            </form>
          </div>
        </div>
       
        {/* Navigation Links */}
        <nav className={headerStyles['navigation-container']}>
          <ul className={headerStyles['navigation']}>
            <li className={headerStyles[ 'li']}>
              <Link 
                to='/'
                className={headerStyles['link']}
              >
                Home
              </Link>
            </li>
            <li className={headerStyles[ 'li']}> 
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
                    </Link></li>
                </ul>
              )}
            </li>
            <li>
              <Link to='/register/'
                className={headerStyles['link-btn']}
              >
                Register
                <IoPersonAddSharp />
              </Link>
            </li>
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
          </ul>
        </nav>
        {/* Mobile menu button */}
        <div className={headerStyles['mobile-menu-button']}>
          <button onClick={toggleMenu} className='w-full px-2 py-1 focus:outline-none border rounded'>
          <IoMenu  size={30}/>
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
            <li className={headerStyles[ 'li']}>
              <Link to='/'
               className='text-white focus:outline-none'>
              Home
              </Link>
            </li>
            <li className={headerStyles[ 'li']}> 
              <Link 
                to='/category/'
                className=' text-white '
              >
                  Category
              </Link>
            </li>
            <li className={headerStyles[ 'li']}>
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
            <li className={headerStyles[ 'li']}>
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
            <li className='py-2 m-0'>
              <Link to='/register/'
                className={headerStyles['link-btn']}
              >
                Register
                <IoPersonAddSharp />
              </Link>
            </li>
            <li className='py-2 m-0'>
              <Link to='/login/' 
                className={headerStyles['link-btn']}
              >
              Login 
              <LuLogIn 
                className="font-bold"
              />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
