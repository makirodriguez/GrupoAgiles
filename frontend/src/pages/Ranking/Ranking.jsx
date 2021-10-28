import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

//Funcion para la creacion de las rows
function createData(poss, user, perfects, wins, losses, points) {
        return {poss, user, perfects, wins, losses, points };
};

//Funcion para la creacion de las rows del torneo
function createDataTorneo(id, name) {
        return {id, name };
};

//Si no tiene un torneo asignado, asigna el global por defecto


//Funcion general del ranking
export default function Ranking() {
  const [rankings, getRankings] = useState(0);
  const [torneosDelUser, getTorneos] = useState(0);
  const [RowsDeRanking, getRowsDeRanking] = useState([]);


  useEffect(() => {
    getAllRankings();
    getData()
  },[]);


if (localStorage.TorneoActual === undefined){
  localStorage.setItem("TorneoActual", 1);
  console.log(localStorage.TorneoActual);
}


//Crecion funcion que devuelve los usuarios y sus puntos del torneo de la champions
function getAllRankings(){
    axios.get(`http://127.0.0.1:3001/api/rankings/${localStorage.TorneoActual}`)
    .then((response) => {
        const data = response.data;
        getRankings(data);
    })
    .catch(() => console.log("error"));
  }

//Obtengo nombres e ids de los torneos del usuario
function getData(){
    axios.get(`http://127.0.0.1:3001/api/allTorneos/${localStorage.userID}`)
    .then((response) => {
        const data = response.data;
        getTorneos(data)
    })
    .catch(() => console.log("error"));
}

//Creacion de los array de torneos del usuario, y de los datos de los mismos
const rows = [];
for (let i = 0; i < rankings.length ; i++) {
  rows.push(createData(i+1,rankings[i].Usuario, rankings[i].Perfect, rankings[i].Aciertos, rankings[i].Fallos, rankings[i].Puntos));
}

for (let i = 0; i < torneosDelUser.length ; i++) {
  RowsDeRanking.push(createDataTorneo(torneosDelUser[i].TorneoID, torneosDelUser[i].Nombre));
}

const setObj = new Set(); 

const unicos = RowsDeRanking.reduce((acc, e) => {
  if (!setObj.has(e.id)){
    setObj.add(e.id, e)
    acc.push(e)
  }
  return acc;
},[]);


const cambioId = (e) =>{
    localStorage.setItem("TorneoActual", e.target.value)
    console.log(localStorage.TorneoActual);
}


//Creacion completa de la tabla
  return (
    <TableContainer component={Paper} id="tablita">
    <div class="d-flex px-2 w-75 align-items-center align-self-center mt-2">
    <span className="h4 pr-10 mt-1">Selecciona el torneo:</span>
                <form className="px-2 w-75 d-flex" >
                <select className="custom-select mt-2 pr-5 " id="torneoSelect" onChange={cambioId}>
                <option selected value="1">Selecciona un torneo</option>
                {unicos.map(i =>(
                  <option value={i.id}>{i.name}</option>
                ))}
                </select>

                <button type="submit" className="btn btn-primary mt-2 mx-2 h-25 d-inline-block" onSubmit="console.log(ok)">Buscar</button>
                </form>
      </div>
      <br></br>          
      <div id="tablaConDatos">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Posicion</TableCell>
            <TableCell align="left">Usuario</TableCell>
            <TableCell align="right">Perfects</TableCell>
            <TableCell align="right">Aciertos</TableCell>
            <TableCell align="right">Fallos</TableCell>
            <TableCell align="right">Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.poss}
              </TableCell>
              <TableCell align="left">{row.user}</TableCell>
              <TableCell align="right">{row.perfects}</TableCell>
              <TableCell align="right">{row.wins}</TableCell>
              <TableCell align="right">{row.losses}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </TableContainer>

  );
}
