import useLocalStorage from '../hooks/useLocalStorage';
import Formulario from '../components/Formulario/Formulario';

export default function AddPropietario() {
  const [propietarios, setPropietarios] = useLocalStorage('propietarios', []);

  const agregarPropietario = (propietario) => {
    setPropietarios([...propietarios, propietario])
  }

  return (
    <div>
      <Formulario agregarPropietario={agregarPropietario} />
    </div>
  )
}
