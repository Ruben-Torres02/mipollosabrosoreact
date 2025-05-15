import "./Formulario.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Formulario() {
  const [loginNombre, setLoginNombre] = useState("");
  const [loginContraseña, setLoginContraseña] = useState("");
  const [registroNombre, setRegistroNombre] = useState("");
  const [registroContraseña, setRegistroContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginNombre,
          password: loginContraseña,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje("Login exitoso: " + data.username);

        navigate('/formularioPlato')
      } else {
        setMensaje("El usuario o contraseña son incorrectos");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setMensaje("Error de red");
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registroNombre,
          password: registroContraseña,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje("Registro exitoso: " + data.username);
      } else {
        setMensaje("El usuario ya se encuentra registrado");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      setMensaje("Error de red");
    }
  };

  return (
    <div className="contenedor-principal">
      <section className="formulario-contenedor">
        <h1>Login</h1>
        <form className="formulario" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={loginNombre}
            onChange={(e) => setLoginNombre(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginContraseña}
            onChange={(e) => setLoginContraseña(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
        <div className="separador"></div>
      <section className="formulario-contenedor">
        <h1>Registro</h1>
        <form className="formulario" onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={registroNombre}
            onChange={(e) => setRegistroNombre(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={registroContraseña}
            onChange={(e) => setRegistroContraseña(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
      </section>

      <p className="mensaje">{mensaje}</p>
    </div>
  );
}
