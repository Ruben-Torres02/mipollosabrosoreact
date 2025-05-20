import { useState, useEffect } from "react";
import "./FormularioPlato.css";

export function FormularioPlato() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [promociones, setPromociones] = useState(false);
  const [platos, setPlatos] = useState([]);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [platoEditandoId, setPlatoEditandoId] = useState(null);

  useEffect(() => {
    cargarPlatos();
  }, []);

  const cargarPlatos = async () => {
    try {
      const res = await fetch("ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos");
      if (!res.ok) throw new Error("Error al obtener los platos");
      const data = await res.json();
      setPlatos(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar los platos");
    }
  };

  const manejarEditar = (plato) => {
    setNombre(plato.name);
    setDescripcion(plato.description);
    setPrecio(plato.price.toString());
    setPromociones(plato.promociones);
    setImagen(null); // Seguridad del navegador
    setModoEdicion(true);
    setPlatoEditandoId(plato.id);
  };

  const manejarEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este plato?");
    if (!confirmar) return;

    try {
      const res = await fetch(`ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el plato");
      }

      alert("Plato eliminado correctamente");
      cargarPlatos();
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al eliminar el plato");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plato = {
      name: nombre,
      description: descripcion,
      price: parseInt(precio, 10),
      promociones: promociones,
    };

    try {
      let res;
      let platoId;

      if (modoEdicion) {
        // Actualizar
        res = await fetch(`http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos/${platoEditandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plato),
        });

        if (!res.ok) throw new Error("Error al actualizar el plato");

        platoId = platoEditandoId;
        alert("Plato actualizado correctamente");
      } else {
        // Crear
        res = await fetch("http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(plato),
        });

        if (!res.ok) throw new Error("Error al crear el plato");

        const data = await res.json();
        platoId = data.id;
        alert("Plato guardado correctamente");
      }

      // Subir imagen si existe
      if (imagen) {
        const formData = new FormData();
        formData.append("archivo", imagen);

        const resImg = await fetch(`http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos/${platoId}/imagen`, {
          method: "POST",
          body: formData,
        });

        if (!resImg.ok) {
          alert("Plato guardado, pero error al subir la imagen");
        }
      }

      // Reset
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen(null);
      setPromociones(false);
      setModoEdicion(false);
      setPlatoEditandoId(null);

      cargarPlatos();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="formulario-plato-contenedor">
      <div className="formulario-plato-centro">
      <h2 className="formulario-plato-titulo">
        {modoEdicion ? "Editar plato" : "Agregar nuevo plato"}
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="formulario-plato-form">
        <input
          className="formulario-plato-input"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          className="formulario-plato-input"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          className="formulario-plato-input"
          placeholder="Precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <input
          className="formulario-plato-file"
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          required={!modoEdicion}
        />
        <label className="formulario-plato-checkbox">
          <input
            type="checkbox"
            checked={promociones}
            onChange={(e) => setPromociones(e.target.checked)}
          />
          Es una promoción
        </label>

        <button className="formulario-plato-boton" type="submit">
          {modoEdicion ? "Actualizar plato" : "Guardar plato"}
        </button>

        {modoEdicion && (
          <button
            type="button"
            className="formulario-plato-boton cancelar"
            onClick={() => {
              setNombre("");
              setDescripcion("");
              setPrecio("");
              setImagen(null);
              setPromociones(false);
              setModoEdicion(false);
              setPlatoEditandoId(null);
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      <h2 className="formulario-plato-titulo">Lista de platos guardados</h2>

      <table className="formulario-plato-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Promoción</th>
            <th>Actualizar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => (
            <tr key={plato.id}>
              <td>{plato.id}</td>
              <td>{plato.name}</td>
              <td>{plato.description}</td>
              <td>${plato.price}</td>
              <td>
                <img
                  src={`http://ec2-3-145-48-161.us-east-2.compute.amazonaws.com:8080/api/platos/${plato.id}/imagen`}
                  alt={plato.name}
                  style={{
                    width: "60px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>{plato.promociones ? "Sí" : "No"}</td>
              <td>
                <button className="idEditar" onClick={() => manejarEditar(plato)}>
                  Editar
                </button>
              </td>
              <td>
                <button className="idEliminar" onClick={() => manejarEliminar(plato.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
