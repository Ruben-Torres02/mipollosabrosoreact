import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './MenuPublico.css';

export function MenuPublico() {
    const [platos, setPlatos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos")
            .then(res => res.json())
            .then(data => setPlatos(data));
    }, []);

    const handleLoginClick = () => {
        navigate("formulario");
    };

    const platosPromocion = platos.filter(plato => plato.promociones);
    const platosNormales = platos.filter(plato => !plato.promociones);

    return (
        <div className="menu-publico-container">
            <main className="limited-container">
                <div className="hero-image">
                    <img src="images/brasas.jpeg" alt="pollo" className="responsive-image" />
                </div>

                <div className="promo-banner">
                    <h1 className="menuid">Menú</h1>
                </div>                
                <div className="menu">
                    {platosNormales.map(plato => (
                        <div key={plato.id} className="menu-card">
                            <img src={`http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos/${plato.id}/imagen`} alt={plato.name} />
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
                            <img src={`http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos/${plato.id}/imagen`} alt={plato.name} />
                            <h3>{plato.name}</h3>
                            <p>{plato.description}</p>
                            <strong>${plato.price}</strong>
                        </div>
                    ))}
                </div>

                {/* Footer redes */}
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

                {/* Mapa */}
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

                {/* Horario */}
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
