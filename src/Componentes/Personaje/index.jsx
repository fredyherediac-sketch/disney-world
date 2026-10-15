
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";

function Personaje({ agregarColeccion, favoritos, cambiarFavorito }) {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarPersonaje() {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(
          `https://api.disneyapi.dev/character/${id}`
        );

        if (!respuesta.ok) {
          throw new Error("Personaje no encontrado");
        }

        const resultado = await respuesta.json();
        const datos = Array.isArray(resultado.data)
          ? resultado.data[0]
          : resultado.data;

        setPersonaje(datos);

        if (datos) {
          agregarColeccion(datos);
        }
      } catch {
        setError("No fue posible cargar este personaje.");
      } finally {
        setCargando(false);
      }
    }

    cargarPersonaje();
  }, [id]);

  if (cargando) return <p>Cargando información...</p>;
  if (error || !personaje) return <p>{error || "No se encontró el personaje."}</p>;

  const esFavorito = favoritos.some(
    (p) => p._id === personaje._id
  );

  function mostrarLista(titulo, lista) {
    if (!lista || lista.length === 0) return null;

    return (
      <div className="dato-personaje">
        <h3>{titulo}</h3>
        <ul>
          {lista.map((dato, indice) => (
            <li key={`${titulo}-${indice}`}>{dato}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="detalle-personaje">
      <h1>{personaje.name}</h1>

      {personaje.imageUrl && (
        <img
          className="imagen-personaje"
          src={personaje.imageUrl}
          alt={personaje.name}
        />
      )}

      <button
        className="boton-detalle"
        onClick={() => cambiarFavorito(personaje)}
      >
        {esFavorito ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
      </button>

      {mostrarLista("Películas", personaje.films)}
      {mostrarLista("Cortometrajes", personaje.shortFilms)}
      {mostrarLista("Series", personaje.tvShows)}
      {mostrarLista("Videojuegos", personaje.videoGames)}
      {mostrarLista("Atracciones", personaje.parkAttractions)}
      {mostrarLista("Aliados", personaje.allies)}
      {mostrarLista("Enemigos", personaje.enemies)}

      {personaje.sourceUrl && (
        <p>
          <a href={personaje.sourceUrl} target="_blank" rel="noreferrer">
            Ver fuente del personaje
          </a>
        </p>
      )}
    </section>
  );
}

export default Personaje;
