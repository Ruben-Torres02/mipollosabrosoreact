import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MenuPublico } from './components/MenuPublico';
import { Formulario } from './components/Formulario';
import { FormularioPlato } from './components/FormularioPlato';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MenuPublico />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/formularioPlato" element={<FormularioPlato />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
