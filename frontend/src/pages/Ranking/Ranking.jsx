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
function createData(poss, user, points) {
        return {poss, user, points };
};

//Usariamos esta para en la iteracion 2 ampliar con wins y losses
/*function createData(poss, user, wins, losses, points) {
        return {poss, user, wins, losses, points };
};*/


//Funcion general del ranking
export default function Ranking() {
  const [rankings, getRankings] = useState(0);

  useEffect(() => {
    getAllRankings();
  },[]);

//Crecion funcion que devuelve los usuarios y sus puntos del torneo de la champions
function getAllRankings(){
    axios.get(`http://127.0.0.1:3001/api/rankings`)
    .then((response) => {
        const data = response.data;
        getRankings(data);
    })
    .catch(() => console.log("error"));
  }

//Creacion del array de usuarios ordenados por puntos
const rows = [];
for (let i = 0; i < rankings.length ; i++) {
        rows.push(createData(i+1,rankings[i].Usuario, rankings[i].Puntos));
        console.log(rows);
        }

//Usariamos esta para en la iteracion 2 ampliar con wins y losses
/*for (let i = 0; i < rankings.length ; i++) {
        rows.push(createData(i+1,rankings[i].Usuario, 9, 3, rankings[i].Puntos));
        console.log(rows);
        }*/

//Creacion completa de la tabla
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Posicion</TableCell>
            <TableCell align="left">Usuario</TableCell>
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
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//para la iteracion 2
/*  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Posicion</TableCell>
            <TableCell align="left">Usuario</TableCell>
            <TableCell align="right">Ganados</TableCell>
            <TableCell align="right">Perdidos</TableCell>
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
              <TableCell align="right">{row.wins}</TableCell>
              <TableCell align="right">{row.losses}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}*/
