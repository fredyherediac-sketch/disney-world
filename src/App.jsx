
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Inicio from "./Componentes/Inicio";
import Coleccion from "./Componentes/Coleccion";
import Favoritos from "./Componentes/Favoritos";
import Info from "./Componentes/Info";
import Usuario from "./Componentes/Usuario";
import Personaje from "./Componentes/Personaje";

import "./App.css";

function App() {
  const [mostrarApp, setMostrarApp] = useState(
    localStorage.getItem("disneyInicio") === "true"
  );

  const [coleccion, setColeccion] = useState(
    JSON.parse(localStorage.getItem("disneyColeccion") || "[]")
  );

  const [favoritos, setFavoritos] = useState(
    JSON.parse(localStorage.getItem("disneyFavoritos") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("disneyColeccion", JSON.stringify(coleccion));
  }, [coleccion]);

  useEffect(() => {
    localStorage.setItem("disneyFavoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function agregarColeccion(personaje) {
    setColeccion((actual) =>
      actual.some((p) => p._id === personaje._id)
        ? actual
        : [...actual, personaje]
    );
  }

  function cambiarFavorito(personaje) {
    setFavoritos((actual) =>
      actual.some((p) => p._id === personaje._id)
        ? actual.filter((p) => p._id !== personaje._id)
        : [...actual, personaje]
    );
  }

  if (!mostrarApp) {
    return (
      <Info
        bienvenida={true}
        onEntrar={() => {
          localStorage.setItem("disneyInicio", "true");
          setMostrarApp(true);
        }}
      />
    );
  }

  return (
    <Router>
      <header className="encabezado">
        <Link to="/" className="logo">DISNEY WORLD</Link>

        <nav className="c-menu">
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Colección</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/info">Info</Link>
          <Link to="/usuario">Usuario</Link>
        </nav>
      </header>

      <main className="contenido">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                agregarColeccion={agregarColeccion}
                favoritos={favoritos}
                cambiarFavorito={cambiarFavorito}
              />
            }
          />

          <Route
            path="/coleccion"
            element={<Coleccion personajes={coleccion} />}
          />

          <Route
            path="/favoritos"
            element={
              <Favoritos
                personajes={favoritos}
                cambiarFavorito={cambiarFavorito}
              />
            }
          />

          <Route path="/info" element={<Info />} />

          <Route
            path="/usuario"
            element={
              <Usuario
                totalColeccion={coleccion.length}
                totalFavoritos={favoritos.length}
              />
            }
          />

          <Route
            path="/personaje/:id"
            element={
              <Personaje
                agregarColeccion={agregarColeccion}
                favoritos={favoritos}
                cambiarFavorito={cambiarFavorito}
              />
            }
          />
        </Routes>
      </main>

      <footer className="pie">
        Disney World · Proyecto académico
      </footer>
    </Router>
  );
}

export default App;
