import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MiniCart from "./MiniCart";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-2xl font-extrabold text-blue-500 hover:text-blue-400 transition-colors"
        >
          <ShoppingBag className="w-6 h-6" />
          ShopEase
        </Link>

        
        <button
          onClick={toggleMenu}
          className="text-blue-400 sm:hidden focus:outline-none transition-transform"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      
        <ul
          className={`absolute sm:static left-0 top-16 sm:top-auto w-full sm:w-auto bg-black/95 sm:bg-transparent flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0 text-blue-400 font-medium transition-all duration-300 ease-in-out ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto pointer-events-none"
          }`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-white relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="hover:text-white relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              onClick={closeMenu}
            >
              Products
            </Link>
          </li>

    
          <li onClick={closeMenu}>
            <MiniCart />
          </li>

  
          {user ? (
            <>
              <li className="text-white">Hi, {user.name}</li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition-all"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
