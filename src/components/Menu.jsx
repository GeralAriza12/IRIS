import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
 };

  return (
    <div>
      <div className="toMenu">
        <div className="hamburger">
          <button onClick={toggleMenu}>
            <Bars3Icon width={20} height={20} />
          </button>
        </div> 

        {isMenuOpen && (
          <div className="fixed top-0 right-0 w-1/2 h-screen bg-gray-900 text-white z-10 transform transition-transform duration-300 ease-in-out">
            <ul className="flex flex-col items-start p-10">
              <li>
                <Link to="/" className="link-style" onClick={toggleMenu}>
                 Home
                </Link>
              </li>
              <li>
                <Link to="/enter-owner" className="link-style" onClick={toggleMenu}>
                 Formulario
                </Link>
              </li>
              <li>
                <Link to="/search-for-owner" className="link-style" onClick={toggleMenu}>
                 Lista de propietarios
                </Link>
              </li>
            </ul>
          </div>
        )}

        <ul className="menu" data-animation="center">
          <li>
            <Link to="/" className="link-style">
              Home
            </Link>
          </li>
          <li>
            <Link to="/enter-owner" className="link-style">
              Formulario
            </Link>
          </li>
          <li>
            <Link to="/search-for-owner" className="link-style">
              Lista de propietarios
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
