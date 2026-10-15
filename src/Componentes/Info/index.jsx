
import "./style.css";

function Info({ bienvenida = false, onEntrar }) {
  if (bienvenida) {
    return (
      <div className="bienvenida-disney">
        <div className="contenido-bienvenida">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/64/Disney_Logo_2014.svg"
            alt="Disney"
            className="logo-disney"
          />

          <h1>DISNEY WORLD</h1>

          <p>
            Descubre personajes, películas y series
            del maravilloso mundo Disney.
          </p>

          <button onClick={onEntrar}>
            Explorar personajes
          </button>

          <small>Aplicación académica · Versión 1.0</small>
        </div>
      </div>
    );
  }

  return (
    <section className="informacion-disney">
      <h1>Acerca de Disney World</h1>

      <p>
        Disney World es una aplicación que permite explorar
        personajes de Disney, consultar sus películas y series,
        crear una colección personal y guardar favoritos.
      </p>

      <h2>¿De dónde vienen los datos?</h2>

      <p>
        La información se consulta desde la API pública
        de personajes Disney.
      </p>

      <p>
        API: <a href="https://api.disneyapi.dev/character"
          target="_blank" rel="noreferrer">
          api.disneyapi.dev
        </a>
      </p>

      <p>Desarrollada con React, JavaScript y CSS.</p>
    </section>
  );
}

export default Info;
