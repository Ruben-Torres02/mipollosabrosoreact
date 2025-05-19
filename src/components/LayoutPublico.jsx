import { Link, Outlet, useNavigate } from 'react-router-dom';
import './MenuPublico.css';

export function LayoutPublico() {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="barras">
          <h2>Mi Pollo Sabroso</h2>
          <nav className="nav-links">
            <Link to ="/">Inicio</Link>
            <a href="#ubicacion">Ubicación</a>
            <a href="#idpromo">Promociones</a>
          </nav>
        </div>
        <button onClick={() => navigate("/formulario")} className="login-button">
          Login
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}