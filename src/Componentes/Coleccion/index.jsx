import { Link } from "react-router-dom";
import "./style.css";

function Coleccion({ personajes = [] }) {
  return (
    <section className="lista-guardada">
      <h1>Mi colección Disney</h1>
      <p>Personajes que has descubierto.</p>

      {personajes.length === 0 ? (
        <p>Aún no tienes personajes en tu colección. ¡Explora Inicio!</p>
      ) : (
        <div className="rejilla-guardada">
          {personajes.map((personaje) => (
            <Link
              className="tarjeta-guardada"
              to={`/personaje/${personaje._id}`}
              key={personaje._id}
            >
              {personaje.imageUrl && (
                <img src={personaje.imageUrl} alt={personaje.name} />
              )}
              <h3>{personaje.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Coleccion;
