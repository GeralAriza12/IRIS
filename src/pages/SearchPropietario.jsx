import { useState } from "react";
import ListaPropietarios from "../components/ListaPropietarios/ListaPropietarios";
import useLocalStorage from "../hooks/useLocalStorage";

export default function SearchPropietario() {
  const [propietarios] = useLocalStorage("propietarios", []);
  const [filterPropietario, setFilterPropietario] = useState('');

  const propietariosFiltrados = propietarios.filter(propietario => 
    propietario.nombres.toLowerCase().includes(filterPropietario.toLowerCase()) ||
    propietario.apellidos.toLowerCase().includes(filterPropietario.toLowerCase()) ||
    propietario.numeroDocumento.includes(filterPropietario)
  );

  const isPropietariosEmpty = propietarios.length === 0;

  return (
    <div>
      <input type="text" 
      placeholder="¿A quién buscas?"
      value={filterPropietario}
      onChange={(e) => setFilterPropietario(e.target.value)}/>
      {isPropietariosEmpty ? (
        <p>Aún no se ha registrado propietarios. Click en ingresar propietario para registrarlo.</p>
      ) : propietariosFiltrados.length > 0 ? (
        <ListaPropietarios propietarios={propietariosFiltrados} />
      ) : (
        <p>A quien buscas no se encuentra en la base de datos. Click en ingresar propietario para registrarlo.</p>
      )}
    </div>
  );
}
