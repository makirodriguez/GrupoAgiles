import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function createData(idLogro, user, name, img, frase) {
  return { idLogro, user, name, img, frase };
}

function createData2(nombre, aciertos, fallos, perfect, total) {
  return { nombre, aciertos, fallos, perfect, total };
}

function createData3(idTorneo, nombre) {
  return { idTorneo, nombre };
}

export default function Perfil() {
  const [logros, getLogros] = useState(0);
  const { user } = useAuth0();
  // const { name, picture, email } = user;
  const [historial, getHistorial] = useState(0);
  const [torneos, getTorneos] = useState(0);

  useEffect(() => {
    getAllLogros();
    getHistorialAciertos();
    getAllTorneos();
  }, []);

  function getAllLogros() {
    axios
      .get(`http://127.0.0.1:3001/api/logros/${localStorage.userID}`)
      .then((response) => {
        const data = response.data;
        getLogros(data);
      })
      .catch(() => console.log("error"));
  }

  const rows = [];
  for (let i = 0; i < logros.length; i++) {
    rows.push(
      createData(
        logros[i].LogroID,
        logros[i].Nombre,
        logros[i].NombreLogro,
        logros[i].ImgPath,
        logros[i].Frase
      )
    );
  }

  function getHistorialAciertos() {
    axios
      .get(`http://127.0.0.1:3001/api/historialAciertos/${localStorage.userID}`)
      .then((response) => {
        const dataH = response.data;
        getHistorial(dataH);
        console.log("HistorialAciertos", dataH);
      })
      .catch(() => console.log("error"));
  }

  const rowsH = [];
  for (let i = 0; i < historial.length; i++) {
    rowsH.push(
      createData2(
        historial[i].Nombre,
        historial[i].Aciertos,
        historial[i].Fallos,
        historial[i].Perfect,
        historial[i].Total
      )
    );
  }

  function getAllTorneos() {
    axios
      .get(`http://127.0.0.1:3001/api/allTorneos/${localStorage.userID}`)
      .then((response) => {
        const dataTorneos = response.data;
        getTorneos(dataTorneos);
        console.log("TORNEOS", dataTorneos);
      })
      .catch(() => console.log("error"));
  }

  const rowsTorneo = [];
  for (let i = 0; i < torneos.length; i++) {
    rowsTorneo.push(createData3(torneos[i].TorneoID, torneos[i].Nombre));
  }

  return (
    /*<div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
      </div>
    </div>*/
    <div className=" d-flex flex-column align-items-center">
      <h3>Logros obtenidos</h3>
      {rows.map((i) => {
        return (
          <div className="w-25 p-3 mb-2 d-flex align-items-center border border-dark rounded bg-success text-white">
            <img
              src={i.img}
              class="rounded-circle img-thumbnail"
              alt="profile-image"
            />
            <div className="w-100 d-flex flex-column align-items-center">
              <h4>{i.name}</h4>
              <p>{i.frase}</p>
            </div>
          </div>
        );
      })}
      <br />
      <h3>Historial Aciertos</h3>
      {rowsH.map((i) => {
        if (i.total == 0) {
          return (
            <div className="align-items-center">
              <br />
              NO TIENES PARTIDOS JUGADOS
            </div>
          );
        } else {
          return (
            <div className="w-5 align-items-center">
              <h6 style={{ textAlign: "center" }}>
                Total Partidos Predichos: {i.total}
              </h6>
              <div className="w-5 p-4 mb-2 d-flex align-items-center border border-dark rounded bg-success text-white">
                <h4>
                  Porcentaje de Aciertos: {(i.aciertos / i.total) * 100} %
                </h4>
              </div>
              <br />
              <div className="w-5 p-4 mb-2 d-flex align-items-center border border-dark rounded bg-warning text-white">
                <h4>Porcentaje de Perfects: {(i.perfect / i.total) * 100} %</h4>
              </div>
              <br />
              <div className="w-5 p-4 mb-2 d-flex align-items-center border border-dark rounded bg-danger text-white">
                <h4>Porcentaje de Fallos: {(i.fallos / i.total) * 100} %</h4>
              </div>
              <br />
            </div>
          );
        }
      })}
      <br />
      <h3>Mis Torneos</h3>
      <div id="tablaConDatos">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre Torneo</TableCell>
              <TableCell align="right">
                <Link to="/Ranking">Ir a Ranking</Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsTorneo.map((row) => (
              <TableRow>
                <TableCell align="left">{row.nombre}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

//export default Perfil;
