
import { Link } from "react-router-dom";
import "./style.css";

function Favoritos({ personajes = [], cambiarFavorito }) {
  return (
    <section className="lista-favoritos">
      <h1>Mis favoritos</h1>
      <p>Tus personajes Disney preferidos.</p>

      {personajes.length === 0 ? (
        <p>Aún no tienes favoritos. Agrégalos desde Inicio.</p>
      ) : (
        <div className="rejilla-favoritos">
          {personajes.map((personaje) => (
            <article className="tarjeta-favorito" key={personaje._id}>
              <Link to={`/personaje/${personaje._id}`}>
                {personaje.imageUrl && (
                  <img src={personaje.imageUrl} alt={personaje.name} />
                )}
                <h3>{personaje.name}</h3>
              </Link>

              <button onClick={() => cambiarFavorito(personaje)}>
                Quitar de favoritos
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;
