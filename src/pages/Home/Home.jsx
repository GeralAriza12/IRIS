import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div id="home-page">
      <div id="home-content">
        <div className="fondo">
          <img
            src="https://frontendchallenges.netlify.app/faq-accordion-card/images/bg-pattern-desktop.svg"
            className="fondoImg"
          />
          <img
            src="https://frontendchallenges.netlify.app/faq-accordion-card/images/illustration-woman-online-desktop.svg"
            className="fondoImgPerson"
          />
        </div>
        <div className="fondHome">
          <Box className="conten">
            <div className="home">
              <h1>¡Bienvenidos a IRIS!</h1>
              <p>
                Somos una aplicación web diseñada para gestionar la información
                básica y detallada de los propietarios de un edificio. Nuestro
                objetivo es facilitar el acceso y la gestión de datos personales
                y financieros de manera eficiente y segura.
              </p>
              <div className="buttons">
                <Link to="/enter-owner">
                  <button className="btn1">Ingresar Propietario</button>
                </Link>
                <Link to="/search-for-owner">
                  <button className="btn1">Buscar Propietario</button>
                </Link>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
