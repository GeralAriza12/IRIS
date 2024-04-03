import './App.css'
import Formulario from './components/Formulario/Formulario';
import ListaPropietarios from './components/ListaPropietarios/ListaPropietarios';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [propietarios, setPropietarios] = useLocalStorage('propietarios', []);

  const agregarPropietario = (propietario) => {
    setPropietarios([...propietarios, propietario])
  }

  return (
    <div>
      <h1>IRIS PROPIETARIOS</h1>
      <Formulario agregarPropietario={agregarPropietario} />
      <ListaPropietarios propietarios={propietarios} />
    </div>
  )
}

export default App
