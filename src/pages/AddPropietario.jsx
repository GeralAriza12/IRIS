import Formulario from "../components/Formulario/Formulario";
import axios from "axios";

const AddPropietario = () => {
  const agregarPropietario = async (nuevoPropietario) => {
    try {
      console.log("Enviando propietario:", nuevoPropietario); 
      const response = await axios.post("http://localhost:5000/api/propietarios", nuevoPropietario);
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error al agregar propietario:", error.response.data); 
      } else {
        console.error("Error al agregar propietario:", error.message); 
      }
    }
  };

  return (
    <div>
      <Formulario agregarPropietario={agregarPropietario} />
    </div>
  );
};

export default AddPropietario;
