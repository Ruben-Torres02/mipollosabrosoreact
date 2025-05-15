import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './MenuPublico.css';

export function MenuPublico() {
    const [platos, setPlatos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/platos")
            .then(res => res.json())
            .then(data => setPlatos(data));
    }, []);

    const handleLoginClick = () => {
        navigate("/formulario");
    };

    const platosPromocion = platos.filter(plato => plato.promociones);
    const platosNormales = platos.filter(plato => !plato.promociones);

    return (
        <div className="menu-publico-container">
            {/* Header debe ir fuera del main */}
            <header className="header">
                <div className="barras">
                    <h2>Mi Pollo Sabroso</h2>
                    <nav className="nav-links">
                        <a href="#ubicacion">Ubicación</a>
                        <a href="#idpromo">Promociones</a>
                    </nav>
                </div>
                <button onClick={handleLoginClick} className="login-button">
                    Login
                </button>
            </header>

            <main>
                <div className="hero-image">
                    <img src="images/brasas.jpeg" alt="pollo" className="responsive-image" />
                </div>

                <h1 id="menuid">Menú</h1>
                <div className="menu">
                    {platosNormales.map(plato => (
                        <div key={plato.id} className="menu-card">
                            <img src={`http://localhost:8080/api/platos/${plato.id}/imagen`} alt={plato.name} />
                            <h3>{plato.name}</h3>
                            <p>{plato.description}</p>
                            <strong>${plato.price}</strong>
                        </div>
                    ))}
                </div>

                <h2 id="idpromo">Promociones</h2>
                <div className="promociones">
                    {platosPromocion.map(plato => (
                       <div key={plato.id} className="menu-card promo-card">
                            <img src={`http://localhost:8080/api/platos/${plato.id}/imagen`} alt={plato.name} className="menu-card-image" />
                            <h3>{plato.name}</h3>
                            <p>{plato.description}</p>
                            <strong>${plato.price}</strong>
                        </div>
                    ))}
                </div>

                <footer className="social-footer">
                    <a
                        href="https://www.facebook.com/groups/183551466942403/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="facebook-link"
                    >
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a
                        href="https://wa.me/573137655369"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-link"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                    </a>
                </footer>

                <div id="ubicacion" className="map-container">
                    <h2>¿Dónde estamos?</h2>
                    <iframe
                        title="Ubicación del Asadero"
                        src="https://www.google.com/maps?q=Cra.+19+%2310A-25,+Yumbo,+Valle+del+Cauca&output=embed"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div className="horario-container">
                    <h2>Horario de Atención</h2>
                    <ul className="horario-lista">
                        <li><strong>Lunes:</strong> 10:00 AM - 21:30 PM</li>
                        <li><strong>Martes:</strong> 10:00 AM - 21:30 PM</li>
                        <li><strong>Miércoles:</strong> 10:00 AM - 21:30 PM</li>
                        <li><strong>Jueves:</strong> 10:00 AM - 21:30 PM</li>
                        <li><strong>Viernes:</strong> 10:00 AM - 21:30 PM</li>
                        <li><strong>Sábado:</strong> 10:00 AM - 21:30 PM</li>
                        <li><strong>Domingo:</strong> 10:00 AM - 21:30 PM</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
