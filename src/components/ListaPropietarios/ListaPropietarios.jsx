import PropTypes from "prop-types";

const ListaPropietarios = ({ propietarios }) => {
  return (
    <div>
      {propietarios.map((propietario, index) => (
        <div key={index}>
          <h2>{propietario.nombres} {propietario.apellidos}</h2>
          <h3>Tipo de documento: {propietario.tipoDocumento}</h3>
          <h3>Número de documento: {propietario.numeroDocumento}</h3>
          <h3>Fecha de nacimiento: {propietario.fechaNacimiento}</h3>
          <h3>Edad: {propietario.edad}</h3>
          <h3>Correo electrónico: {propietario.correo}</h3>
          <h3>Celular: {propietario.celular}</h3>
        </div>
      ))}
    </div>
  );
};

ListaPropietarios.propTypes = {
  propietarios: PropTypes.array.isRequired,
};

export default ListaPropietarios;
