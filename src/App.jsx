import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MenuPublico } from './components/MenuPublico';
import { Formulario } from './components/Formulario';
import { FormularioPlato } from './components/FormularioPlato';
import './App.css';
import { LayoutPublico } from './components/LayoutPublico';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LayoutPublico />}>
            <Route index element={<MenuPublico />} />
            <Route path="formulario" element={<Formulario />} />
            <Route path="formularioPlato" element={<FormularioPlato />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
