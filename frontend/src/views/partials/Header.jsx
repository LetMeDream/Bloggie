import React, { useState } from 'react';
import { FaCode, FaChevronDown } from 'react-icons/fa'; // Iconos de ejemplo

const Navbar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  // Puedes añadir estados similares para otros dropdowns si es necesario
  // const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16"> {/* Ajusta h-16 (altura) si es necesario */}

        {/* Logo y Nombre */}
        <div className="flex items-center space-x-2">
          {/* Reemplaza FaCode con tu logo SVG o componente de imagen */}
          <FaCode className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold">Desphixs</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-w-xs"> {/* Limita el ancho máximo */}
           <input
            type="text"
            placeholder="Search Articles"
            className="w-full px-4 py-2 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Navigation Links & Dropdowns */}
        <div className="hidden md:flex items-center space-x-4"> {/* Oculta en pantallas pequeñas, ajusta 'md' según necesites */}
          <a href="#" className="hover:text-gray-300 px-3 py-2">Home</a>
          <a href="#" className="hover:text-gray-300 px-3 py-2">Category</a>

          {/* Pages Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsPagesOpen(true)}
            onMouseLeave={() => setIsPagesOpen(false)}
          >
            <button className="flex items-center hover:text-gray-300 px-3 py-2 focus:outline-none">
              Pages <FaChevronDown className="ml-1 h-3 w-3" />
            </button>
            {isPagesOpen && (
              <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-20">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">About</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact</a>
              </div>
            )}
          </div>

          {/* Dashboard Link (potencialmente otro dropdown) */}
           <div className="relative"> {/* Añade lógica de dropdown similar si es necesario */}
             <a href="#" className="flex items-center hover:text-gray-300 px-3 py-2">
                Dashboard
                {/* <FaChevronDown className="ml-1 h-3 w-3" />  Añade si es dropdown */}
             </a>
             {/* Aquí iría el menú dropdown del Dashboard si existe */}
           </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-2"> {/* Oculta en pantallas pequeñas */}
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out">
            Register
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out">
            Login
          </button>
        </div>

        {/* Botón para Menú Móvil (Opcional, necesitaría lógica adicional) */}
        <div className="md:hidden">
           {/* Aquí podrías añadir un botón tipo 'hamburguesa' para mostrar/ocultar el menú en móviles */}
           <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
           </button>
        </div>

      </div>
      {/* Aquí iría el contenedor del menú desplegable para móviles si implementas esa lógica */}
    </nav>
  );
};

export default Navbar;