import { useState, useEffect } from "react";
import ListaPropietarios from "../components/ListaPropietarios/ListaPropietarios";
import { getPropietarios } from "../services/propietarios";

export default function SearchPropietario() {
  const [propietarios, setPropietarios] = useState([]);
  const [filterPropietario, setFilterPropietario] = useState('');

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const data = await getPropietarios();
        setPropietarios(data);
      } catch (error) {
        console.error("Error al obtener los propietarios:", error);
      }
    };
    fetchPropietarios();
  }, []);

  const propietariosFiltrados = propietarios.filter(propietario => 
    propietario.nombres.toLowerCase().includes(filterPropietario.toLowerCase()) ||
    propietario.apellidos.toLowerCase().includes(filterPropietario.toLowerCase()) ||
    propietario.numeroDocumento.includes(filterPropietario)
  );

  const isPropietariosEmpty = propietarios.length === 0;

  return (
    <div>
      <input 
        type="text" 
        placeholder="¿A quién buscas?"
        value={filterPropietario}
        onChange={(e) => setFilterPropietario(e.target.value)}
      />
      {isPropietariosEmpty ? (
        <p>Aún no se ha registrado propietarios. Click en ingresar propietario para registrarlo.</p>
      ) : propietariosFiltrados.length > 0 ? (
        <ListaPropietarios propietarios={propietariosFiltrados} setPropietarios={setPropietarios} />
      ) : (
        <p>A quien buscas no se encuentra en la base de datos. Click en ingresar propietario para registrarlo.</p>
      )}
    </div>
  );
}
