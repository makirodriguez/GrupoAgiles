import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Predicciones() {
  const [prediccion, getPrediccion] = useState(0);
  const [partidos, getPartidos] = useState(0);
  const prediccionPorUsuario = [];
  const matchs = [];

  useEffect(() => {
    getAllPredicts();
    getAllPartidos();
  }, []);

  function getAllPredicts() {
    axios
      .get(`http://127.0.0.1:3001/api/prediccionesPorPartido`)
      .then((response) => {
        const data = response.data;
        getPrediccion(data);
        console.log(data);
      })
      .catch(() => console.log("error"));
  }

  function getAllPartidos(){
    axios.get(`http://127.0.0.1:3001/api/partidos`).then((response1) => {
          const dataMatchday = response1.data
            .filter((item) => item.Matchday)
            localStorage.Matchday = dataMatchday[0].Matchday
            getPartidos(dataMatchday);
            console.log(dataMatchday)
  })
    .catch(() => console.log("error"));
  }
  //Guardo en un nuevo array las predicciones que son de un mismo usuario
  for (let i = 0; i < prediccion.length; i++) {
    if (prediccion[i].Nombre === localStorage.nombre) {
      prediccionPorUsuario.push(prediccion[i]);
    }
  }

  for (let i = 0; i < partidos.length; i++) {
    const elemento = partidos[i].Matchday;
 
    if (!matchs.includes(partidos[i].Matchday)) {
      matchs.push(elemento);
    }
  } 
  console.log(matchs)

  function opcionesMatch(){
    for (var i = 0; i < matchs.length; ++i) {
      matchs[matchs.length] = new Option(matchs[i], matchs[i]);
  }
  }
  console.log(opcionesMatch());

  const text = {
    HOME_TEAM: "Equipo local",
    AWAY_TEAM: "Equipo visitante",
    DRAW: "Empate",
  };

  if (prediccionPorUsuario.length > 0) {
    return (
      <div className="w-100 d-flex flex-column align-items-center">
        <span className="h1">Partidos predichos</span>
        <select><option>Seleccione una fecha</option></select>
        {prediccion && (
          <div>
            {prediccionPorUsuario.map((prediccion, index) => {
              return (
                <div className="w-100 d-flex flex-column align-items-center">
                  <span className="h1"></span>
                  <div
                    className="d-flex flex-row w-100"
                    style={{
                      padding: "2rem 20rem",
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={prediccion.LocalPath}
                        width="60px"
                        height="60px"
                        alt="logo-local"
                      />
                      <span>{prediccion.Local}</span>
                    </div>
                    <div
                      className="w-100 d-flex flex-column align-items-center"
                      style={{ margin: "0 10rem" }}
                    >
                      <span>
                        {prediccion.Score == null ? "Por jugar" : "Finalizado"}
                      </span>
                      <div className="d-flex flex-row justify-content-center mt-3">
                        <button
                          className="border-0 p-3 px-4"
                          style={{ background: "#ccc" }}
                        >
                          {prediccion.GolesLocal}
                        </button>
                        <button
                          className="border-0 p-3 px-4 mx-2"
                          style={{ background: "#ccc" }}
                        >
                          -
                        </button>
                        <button
                          className="border-0 p-3 px-4"
                          style={{ background: "#ccc" }}
                        >
                          {prediccion.GolesVisit}
                        </button>
                      </div>
                      <span className="text-center">Tu prediccion:</span>
                      <span style={{ fontWeight: "bold" }}>
                        {text[prediccion.Resultado]}
                      </span>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={prediccion.VisitantePath}
                        width="60px"
                        height="60px"
                        alt="logo-visitante"
                      />
                      <span>{prediccion.Visitante}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <p>no matches yet!</p>;
  }
}
