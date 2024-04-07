import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import AddPropietario from './pages/AddPropietario';
import SearchPropietario from './pages/SearchPropietario';
import Menu from './components/Menu';
import './App.css'

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Suspense fallback={<h2>Estamos procesando tu solucitud ...</h2>}>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/enter-owner' element={<AddPropietario/>}/>
          <Route path='/search-for-owner' element={<SearchPropietario />}/>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
