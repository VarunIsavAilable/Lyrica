import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  const [section, setSection] = useState('home');

  return (
    <div className="h-screen w-full p-4 bg-black">
      <div className="flex h-full w-full space-x-0.5">
        {/* Sidebar */}
        <div className="flex flex-col justify-center space-y-3 items-center h-full w-1/16 bg-[#F0A04B] rounded-l-3xl ">
          {/* Home Link */}
          <NavLink
            to="/home"
            onClick={() => setSection('home')}
            className={({ isActive }) =>
              `flex justify-center items-center w-3/5 border-3 aspect-square rounded-tr-3xl rounded-bl-3xl transition-all duration-200 ${isActive ? 'bg-white text-black border-pink-300' : 'bg-black text-white'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              className="w-6 h-6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l9-9 9 9M4.5 10.5v9a1.5 1.5 0 001.5 1.5h3.75v-6.75h4.5v6.75H18a1.5 1.5 0 001.5-1.5v-9"
              />
            </svg>
          </NavLink>

          {/* Search Link */}
          <NavLink
            to="/search"
            onClick={() => setSection('search')}
            className={({ isActive }) =>
              `flex justify-center items-center w-3/5 border-3 aspect-square rounded-tl-3xl rounded-br-3xl transition-all duration-200 ${isActive ? 'bg-white text-black border-[#C68EFD]' : 'bg-black text-white'
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              className="w-6 h-6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </NavLink>

          {/* Developers Link */}
          <NavLink
            to="/developers"
            onClick={() => setSection('developers')}
            className={({ isActive }) =>
              `flex justify-center items-center w-3/5 border-3 aspect-square rounded-tr-3xl rounded-bl-3xl transition-all duration-200 ${isActive ? 'bg-white text-black border-[#8F87F1]' : 'bg-black text-white '
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              className="w-6 h-6"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 17l4-4-4-4m16 0l-4 4 4 4M12 3v18"
              />
            </svg>
          </NavLink>
        </div>

        {/* Main Content Area */}
        <div
          className={`h-full w-15/16 rounded-r-3xl p-4 text-white
          ${section === 'home' ? 'bg-[#FCE7C8]' : section === 'search' ? 'bg-[#B1C29E]' : 'bg-[#FADA7A]'}
          transition-all duration-200
          `}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
