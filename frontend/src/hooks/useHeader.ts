import { useState } from 'react'

const useHeader = () => {
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
    'outer-container': 'bg-[#fcfcfc] text-secondarys z-50 relative flex items-center',
    'inner-container':'!py-[8.5px] lg:py-0 container flex flex-nowrap justify-between items-center w-[100vw]',
    'mobile-menu-button': 'lg:hidden flex items-center justify-center',
    'left-side': 'flex items-center',
    'left-side-logo': 'mr-5 w-48',
    'left-side-search-container': 'hidden lg:block search-input w-full md:w-auto  flex-grow md:flex-grow-0 md:mx-4',
    'left-side-search': 'w-full border md:w-60 px-4 rounded-md pt-2 pb-2 bg-white text-black focus:outline-none',
    'navigation-container': 'hidden lg:flex items-center justify-center libertinus-sans-regular',
    'navigation': 'flex items-center justify-center space-x-3 nowrap h-full',
    'responsive-menu-container': 'lg:hidden menu-open absolute top-full left-0 w-full bg-gray-800 shadow-md transition-all duration-300',
    'responsive-input': 'w-full pt-2 px-4 flex justify-center',
    'responsive-navigation': 'flex flex-col items-center justify-center',
    'responsive-search-container': 'w-full flex justify-center',
    'responsive-search': 'w-[80%] max-w-[500px] px-4 py-2 rounded-md bg-white text-black focus:outline-none',
    'link-btn': 'p-2 flex items-center gap-2 !text-secondarys rounded focus:outline-none',
    'li': 'py-2 m-0 w-full flex flex-col justify-center items-center hover:text-gray-300 no-underline text-white',
    'link': 'mr-2 !text-secondarys hover:!text-gray-300',
    'dropdown-btn': ' hover:text-gray-300 flex items-center',
    'social-media': 'hidden lg:flex items-center gap-2 ',
    'social-media-link': 'text-2xl text-secondarys hover'
  }


  return {
    headerStyles,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
    openDropdown,
    menuOpen
  }
}

export default useHeader