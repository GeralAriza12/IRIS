import { useState } from "react";
import PropTypes from "prop-types";

const Formulario = ({ agregarPropietario }) => {
  const [propietario, setPropietario] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    edad: "",
    correoElectronico: "",
    celular: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropietario({
      ...propietario,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateRequired = (value) => value.trim() !== "";
    const validateEmail = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    // Realiza la validación para cada campo
    const newErrors = {};
    if (!validateRequired(propietario.nombres))
      errors.nombres = "El nombre es requerido";
    if (!validateRequired(propietario.apellidos))
      errors.apellidos = "El apellido es requerido";
    if (!validateRequired(propietario.tipoDocumento))
      errors.apellidos = "Debe seleccionar un tipo de documento";
    if (!validateRequired(propietario.numeroDocumento))
      errors.apellidos = "El número de documento es requerido";
    if (!validateRequired(propietario.fechaNacimiento))
      errors.apellidos = "La fecha de nacimiento es requerido";
    if (!validateRequired(propietario.edad))
      errors.apellidos = "La edad es requerido";
    if (!validateEmail(propietario.correoElectronico))
      errors.correoElectronico = "El correo electrónico no es válido";
    if (!validateRequired(propietario.celular))
      errors.apellidos = "El celular es requerido";

    setErrors(newErrors);

    // Si hay errores, actualiza el estado con ellos
    if (Object.keys(newErrors).length === 0) {
      agregarPropietario(propietario);
      setPropietario({
        tipoDocumento: "",
        numeroDocumento: "",
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        edad: "",
        correoElectronico: "",
        celular: "",
      });
    } else {
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombres:
        <input
          type="text"
          name="nombres"
          value={propietario.nombres}
          onChange={handleChange}
        />
        {errors.nombres && <span>{errors.nombres}</span>}
      </label>
      <label>
        Apellidos:
        <input
          type="text"
          name="apellidos"
          value={propietario.apellidos}
          onChange={handleChange}
        />
        {errors.apellidos && <span>{errors.apellidos}</span>}
      </label>
      <label>
        Tipo de documento:
        <select
          name="tipoDocumento"
          value={propietario.tipoDocumento}
          onChange={handleChange}
        >
          <option value="">Seleccione</option>
          <option value="CC">Cédula de Ciudadanía (CC)</option>
          <option value="CE">Cédula de Extranjería (CE)</option>
          <option value="DNI">Documento Nacional de Identidad (DNI)</option>
          <option value="Pasaporte">Pasaporte</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </label>
      <label>
        Número de documento:
        <input
          type="number"
          name="numeroDocumento"
          value={propietario.numeroDocumento}
          onChange={handleChange}
        />
      </label>
      <label>
        Fecha de nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={propietario.fechaNacimiento}
          onChange={handleChange}
        />
      </label>
      <label>
        Edad:
        <input
          type="number"
          name="edad"
          value={propietario.edad}
          onChange={handleChange}
        />
      </label>
      <label>
        Correo electrónico:
        <input
          type="email"
          name="correoElectronico"
          value={propietario.correoElectronico}
          onChange={handleChange}
        />
        {errors.correoElectronico && <span>{errors.correoElectronico}</span>}
      </label>
      <label>
        Celular:
        <input
          type="tel"
          name="celular"
          value={propietario.celular}
          onChange={handleChange}
        />
      </label>

      <button type="submit"> Agregar Propietario</button>
    </form>
  );
};

Formulario.propTypes = {
  agregarPropietario: PropTypes.func.isRequired,
};

export default Formulario;
