import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./Formulario.css";

const Formulario = ({
  agregarPropietario,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
 const propietarioSeleccionado = location.state?.propietarioSeleccionado || null;
 const [propietario, setPropietario] = useState({
  tipoDocumento: propietarioSeleccionado?.tipoDocumento || "",
  numeroDocumento: propietarioSeleccionado?.numeroDocumento || "",
  nombres: propietarioSeleccionado?.nombres || "",
  apellidos: propietarioSeleccionado?.apellidos || "",
  fechaNacimiento: propietarioSeleccionado?.fechaNacimiento || "",
  edad: propietarioSeleccionado?.edad || "",
  correoElectronico: propietarioSeleccionado?.correoElectronico || "",
  celular: propietarioSeleccionado?.celular || "",
 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropietario({
      ...propietario,
      [name]: value,
    });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateRequired = (value) => value.trim() !== "";
    const validateEmail = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    function calcularEdad(fecha_nacimiento) {
      let hoy = new Date();
      let cumpleanos = new Date(fecha_nacimiento);
      let edad = hoy.getFullYear() - cumpleanos.getFullYear();
      let m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    }
    const validarLongitud = (valor) => {
      return valor.length === 10;
    };

    // Realiza la validación para cada campo
    const newErrors = {};
    if (!validateRequired(propietario.nombres))
      newErrors.nombres = "El nombre es requerido";
    if (!validateRequired(propietario.apellidos))
      newErrors.apellidos = "El apellido es requerido";
    if (!validateRequired(propietario.tipoDocumento))
      newErrors.tipoDocumento = "Debe seleccionar un tipo de documento";
    if (!validateRequired(propietario.numeroDocumento))
      newErrors.numeroDocumento = "El número de documento es requerido";
    if (!validarLongitud(propietario.numeroDocumento))
      newErrors.numeroDocumento = "El número de Documento no es válido";
    if (!validateRequired(propietario.fechaNacimiento))
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerido";
    if (propietario.fechaNacimiento) {
      const edad = calcularEdad(propietario.fechaNacimiento);
      if (edad < 18) {
        newErrors.fechaNacimiento = "Debes ser mayor de 18 años";
      } else {
        // Asignar la edad calculada al campo de edad
        setPropietario({
          ...propietario,
          edad: edad,
        });
      }
    }
    if (propietario.edad < 18 || propietario.edad > 99) {
      newErrors.edad = "La edad debe estar entre 18 y 99 años";
    }
    if (!validateEmail(propietario.correoElectronico))
      newErrors.correoElectronico = "El correo electrónico no es válido";
    if (!validateRequired(propietario.celular))
      newErrors.celular = "El número de celular es requerido";
    if (!validarLongitud(propietario.celular))
      newErrors.celular = "El número de celular no es válido";

    setErrors(newErrors);

      const actualizarPropietario = async (propietario) => {
    const propietariosJSON = localStorage.getItem("propietarios");
    let propietarios = [];

    if (propietariosJSON) {
      propietarios = JSON.parse(propietariosJSON);
    }
    const index = propietarios.findIndex(
      (p) => p.numeroDocumento === propietario.numeroDocumento
    );

    if (index !== -1) {
      propietarios[index] = propietario;
    } else {
      console.log("Propietario no encontrado para actualizar");
      return;
    }
    localStorage.setItem("propietarios", JSON.stringify(propietarios));
  };

    // Si hay errores, actualiza el estado con ellos y no realiza el envío del formulario
    if (Object.keys(newErrors).length === 0) {
      try {
        if (propietarioSeleccionado) {
          await actualizarPropietario(propietario);
        } else {
          await agregarPropietario(propietario);
        }

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

        navigate("/search-for-owner");
      } catch (error) {
        console.log(error);
        setErrorMessage(
          "Ocurrió un error al agregar el propietario. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className="container">
      
      <h2>{propietarioSeleccionado ? "Actualizar Propietario" : "Agregar Nuevo Propietario"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="elements-container">
          <label className="style-two-elements">
            Nombres:
            <input
              type="text"
              name="nombres"
              value={propietario.nombres}
              onChange={handleChange}
              placeholder="Geraldine"
            />
            {errors.nombres && (
              <span className="error-message">{errors.nombres}</span>
            )}
          </label>
          <label className="style-two-elements">
            Apellidos:
            <input
              type="text"
              name="apellidos"
              value={propietario.apellidos}
              onChange={handleChange}
              placeholder="Ariza"
            />
            {errors.apellidos && (
              <span className="error-message">{errors.apellidos}</span>
            )}
          </label>
        </div>
        <div className="elements-container">
          <label className="style-type-doc">
            Tipo de documento:
            <select
              name="tipoDocumento"
              value={propietario.tipoDocumento}
              onChange={handleChange}
              placeholder="Seleccione"
            >
              <option value="">Seleccione</option>
              <option value="CC" className="option">
                Cédula de Ciudadanía (CC)
              </option>
              <option value="CE" className="option">
                Cédula de Extranjería (CE)
              </option>
              <option value="DNI" className="option">
                Documento Nacional de Identidad (DNI)
              </option>
              <option value="Pasaporte" className="option">
                Pasaporte
              </option>
              {/* Agrega más opciones según sea necesario */}
            </select>
            {errors.tipoDocumento && (
              <span className="error-message">{errors.tipoDocumento}</span>
            )}
          </label>
          <label className="style-two-elements">
            Número de documento:
            <input
              type="number"
              name="numeroDocumento"
              value={propietario.numeroDocumento}
              onChange={handleChange}
              placeholder="1234567890"
            />
            {errors.numeroDocumento && (
              <span className="error-message">{errors.numeroDocumento}</span>
            )}
          </label>
        </div>
        <div className="elements-container">
          <label>
            Fecha de nacimiento:
            <input
              className="date"
              type="date"
              name="fechaNacimiento"
              value={propietario.fechaNacimiento}
              onChange={handleChange}
              placeholder="mm/dd/yyyy"
            />
            {errors.fechaNacimiento && (
              <span className="error-message">{errors.fechaNacimiento}</span>
            )}
          </label>
          <label>
            Edad:
            <input
              type="number"
              name="edad"
              value={propietario.edad}
              onChange={handleChange}
              placeholder="+18"
            />
            {errors.edad && (
              <span className="error-message">{errors.edad}</span>
            )}
          </label>
        </div>
        <div className="elements-container">
          <label>
            Correo electrónico:
            <input
              type="email"
              name="correoElectronico"
              value={propietario.correoElectronico}
              onChange={handleChange}
              placeholder="ejemplocorreo@gmail.com"
            />
            {errors.correoElectronico && (
              <span className="error-message">{errors.correoElectronico}</span>
            )}
          </label>
          <label>
            Celular:
            <input
              type="tel"
              name="celular"
              value={propietario.celular}
              onChange={handleChange}
              placeholder="000-000-0000"
            />
            {errors.celular && (
              <span className="error-message">{errors.celular}</span>
            )}
          </label>
        </div>

        <button id="button-Add" type="submit">
          {propietarioSeleccionado ? "Actualizar Propietario" : "Agregar Propietario"}
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

Formulario.propTypes = {
  agregarPropietario: PropTypes.func.isRequired,
  propietarioExistente: PropTypes.object,
};

export default Formulario;
