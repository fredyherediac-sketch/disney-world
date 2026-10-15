
import "./style.css";

function Usuario({ totalColeccion = 0, totalFavoritos = 0 }) {
  return (
    <section className="perfil-disney">
      <div className="avatar-disney">🏰</div>

      <h1>Mi perfil</h1>
      <p>Entrenador del mundo Disney</p>

      <div className="estadisticas-disney">
        <div>
          <h2>{totalColeccion}</h2>
          <p>Personajes descubiertos</p>
        </div>

        <div>
          <h2>{totalFavoritos}</h2>
          <p>Personajes favoritos</p>
        </div>
      </div>

      <p className="mensaje-perfil">
        ¡Continúa explorando para completar tu colección!
      </p>
    </section>
  );
}

export default Usuario;
