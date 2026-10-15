import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Inicio({ agregarColeccion, favoritos, cambiarFavorito }) {
  const [personajes, setPersonajes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("nombre");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarPersonajes() {
      setCargando(true);
      setError("");

      try {
        let url = `https://api.disneyapi.dev/character?page=${pagina}&pageSize=50`;

        if (filtro === "nombre" && busqueda.trim()) {
          url = `https://api.disneyapi.dev/character?name=${encodeURIComponent(
            busqueda.trim()
          )}&page=${pagina}&pageSize=50`;
        }

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error("Error al consultar la API");
        }

        const resultado = await respuesta.json();

        let lista = resultado.data || [];

        if (!Array.isArray(lista)) {
          lista = [lista];
        }

        if (filtro !== "nombre" && busqueda.trim()) {
          lista = lista.filter((personaje) => {
            let datos = [];

            if (filtro === "pelicula") {
              datos = personaje.films || [];
              datos = [...datos, ...(personaje.shortFilms || [])];
            }

            if (filtro === "serie") {
              datos = personaje.tvShows || [];
            }

            if (filtro === "videojuego") {
              datos = personaje.videoGames || [];
            }

            return datos.some((dato) =>
              dato.toLowerCase().includes(busqueda.trim().toLowerCase())
            );
          });
        }

        setPersonajes(lista);
        setTotalPaginas(resultado.info?.totalPages || 1);
      } catch (error) {
        setError("No pudimos cargar los personajes. Intenta nuevamente.");
        setPersonajes([]);
      } finally {
        setCargando(false);
      }
    }

    cargarPersonajes();
  }, [pagina, busqueda, filtro]);

  function buscar(evento) {
    evento.preventDefault();
    setPagina(1);
  }

  return (
    <section className="inicio-disney">
      <h1>Personajes Disney</h1>
      <p>Descubre tus personajes favoritos de Disney.</p>

      <form className="buscador-disney" onSubmit={buscar}>
        <select
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPagina(1);
          }}
        >
          <option value="nombre">Buscar por nombre</option>
          <option value="pelicula">Buscar por película</option>
          <option value="serie">Buscar por serie</option>
          <option value="videojuego">Buscar por videojuego</option>
        </select>

        <input
          type="text"
          placeholder={
            filtro === "nombre"
              ? "Ej. Mickey Mouse"
              : filtro === "pelicula"
              ? "Ej. Frozen"
              : filtro === "serie"
              ? "Ej. DuckTales"
              : "Ej. Kingdom Hearts"
          }
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPagina(1);
          }}
        />

        <button type="submit">Buscar</button>
      </form>

      {cargando && <p>Cargando personajes...</p>}
      {error && <p className="mensaje-error">{error}</p>}

      {!cargando && !error && personajes.length === 0 && (
        <p>No se encontraron personajes. Prueba con otro término.</p>
      )}

      <div className="rejilla-disney">
        {personajes.map((personaje) => {
          const esFavorito = favoritos.some(
            (p) => p._id === personaje._id
          );

          return (
            <article className="tarjeta-disney" key={personaje._id}>
              <Link
                to={`/personaje/${personaje._id}`}
                onClick={() => agregarColeccion(personaje)}
                className="enlace-personaje"
              >
                {personaje.imageUrl ? (
                  <img
                    src={personaje.imageUrl}
                    alt={personaje.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="sin-imagen">Sin imagen</div>
                )}

                <h3>{personaje.name}</h3>
              </Link>

              <button
                className="boton-favorito"
                onClick={() => cambiarFavorito(personaje)}
              >
                {esFavorito ? "★ En favoritos" : "☆ Agregar a favoritos"}
              </button>
            </article>
          );
        })}
      </div>

      {!cargando && !error && personajes.length > 0 && (
        <div className="paginacion">
          <button
            disabled={pagina <= 1}
            onClick={() => setPagina(pagina - 1)}
          >
            Anterior
          </button>

          <span>
            Página {pagina} de {totalPaginas}
          </span>

          <button
            disabled={pagina >= totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

export default Inicio;

