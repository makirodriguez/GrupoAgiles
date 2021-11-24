import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Swal from "sweetalert2";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function Ver() {
  const [participantes, getParticipantes] = useState(0);
  const [solicitudes, getSolicitudes] = useState(0);

  const arraySolicitudes = [];

  useEffect(() => {
    getData();
  }, []);

  function aceptarSolicitud(id, torneo, user) {
    axios.post(`http://127.0.0.1:3001/api/rankings/`, {
      Puntos: 0,
      TorneoID: `${torneo}`, //el recien creado
      UsuarioID: `${user}`,
    });
    axios
      .delete(`http://127.0.0.1:3001/api/solicitudes/${id}`)
      .then((response) => {
        Swal.fire({
          title: "Excelente!",
          text: "Se ha aceptado la solicitud",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      })
      .catch(() => console.log("error"));
  }
  function rechazarSolicitud(id) {
    axios
      .delete(`http://127.0.0.1:3001/api/solicitudes/${id}`)
      .then((response) => {
        Swal.fire({
          title: "Excelente!",
          text: "Se ha rechazado la solicitud",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      })
      .catch(() => console.log("error"));
  }
  function confirmacion() {
    if (window.confirm("¿Realmente queres borrar el torneo?")) {
      //console.log(torneosDelUser[0].TorneoID);
      axios
        .delete(`http://127.0.0.1:3001/api/torneos/${localStorage.creado}`)
        .then((response) => {
          Swal.fire({
            title: "Excelente!",
            text: "Se ha borrado el torneo",
            icon: "success",
            timer: 2000,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
        })
        .catch(() => console.log("error"));
    }
  }

  function getData() {
    axios
      .get(
        `http://127.0.0.1:3001/api/participantesxtorneo/${localStorage.creado}`
      )
      .then((response) => {
        const data = response.data.length;
        getParticipantes(data);
      })
      .catch(() => console.log("error"));
    axios
      .get(
        `http://127.0.0.1:3001/api/solicitudesxtorneo/${localStorage.creado}`
      )
      .then((response) => {
        const data = response.data;
        getSolicitudes(data);
      })
      .catch(() => console.log("error"));
  }
  for (let i = 0; i < solicitudes.length; i++) {
    arraySolicitudes.push(solicitudes[i]);
  }
  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <span className="h4">Mis torneos creados</span>
      {/* <div className="card d-flex flex-column align-items-center">
        <div className="card-body w-100 d-flex flex-column align-items-center">
          <h5 className="card-title">Nombre del torneo:</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {localStorage.creadoNombre}
          </h6>
          <p className="card-text">Participantes: {participantes}</p>
          <div
            className={`px-2 w-75 d-flex flex-column align-items-center ${
              arraySolicitudes.length === 0 ? "hide" : null
            }`}
          >
            {arraySolicitudes.map(function (each) {
              return (
                <div className="align-items-center justify-content-center">
                  {each.Nombre}
                  <button
                    type="submit"
                    className="btn btn-secondary mx-2"
                    onClick={() =>
                      aceptarSolicitud(
                        each.SolicitudID,
                        each.TorneoID,
                        each.UsuarioID
                      )
                    }
                  >
                    Aceptar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary mx-2"
                    onClick={() => rechazarSolicitud(each.SolicitudID)}
                  >
                    Rechazar
                  </button>
                </div>
              );
            })}
          </div>
          <form className="px-2 w-75 d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-secondary mt-2"
              onClick={confirmacion}
            >
              Eliminar
            </button>
          </form>
          <a href="/ranking" className="card-link">
            Ver Ranking
          </a>
        </div>
      </div> */}
      <div className="card my-3 mb-5" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTVvj2Gu8U4VZsCkOg-16W43Uew1eW9JI-Aw&usqp=CAU"
          alt="Card cap"
        />
        <div className="card-body flex flex-column">
          <h5 className="card-title text-capitalize text-center">
            Torneo: {localStorage.creadoNombre}
          </h5>
          <p className="card-text text-center">
            Participantes: {participantes}
          </p>
          {arraySolicitudes.map(function (each) {
            return (
              <div className="d-flex flex-row justify-content-around mb-3 align-items-center">
                <span
                  className="text-capitalize"
                  style={{ fontWeight: "bold" }}
                >
                  {each.Nombre}
                </span>
                <div>
                  <IconButton
                    aria-label="check"
                    onClick={() => rechazarSolicitud(each.SolicitudID)}
                    color="error"
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    aria-label="check"
                    onClick={() =>
                      aceptarSolicitud(
                        each.SolicitudID,
                        each.TorneoID,
                        each.UsuarioID
                      )
                    }
                    color="success"
                  >
                    <CheckIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
          <div className="d-flex justify-content-center gap-3">
            <button
              type="submit"
              className="btn btn-danger mt-2"
              onClick={confirmacion}
            >
              Eliminar
            </button>
            <button className="btn btn-primary mt-2">
              <a
                href="/ranking"
                className="card-link text-white text-decoration-none"
              >
                Ver Ranking
              </a>
            </button>
          </div>
        </div>
      </div>
      <span className="h5">Hacete premium para poder crear mas torneos!</span>
    </div>
  );
}
