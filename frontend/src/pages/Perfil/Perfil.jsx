import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(idLogro, user, name, img, frase) {
        return {idLogro, user, name, img, frase };
};

export default function Perfil() {
  const [logros, getLogros] = useState(0);


  useEffect(() => {
    getAllLogros();
  },[]);

function getAllLogros(){
    axios.get(`http://127.0.0.1:3001/api/logros/${localStorage.userID}`)
    .then((response) => {
        const data = response.data;
        getLogros(data);
    })
    .catch(() => console.log("error"));
  }

const rows = [];
for (let i = 0; i < logros.length ; i++) {
  rows.push(createData(logros[i].LogroID, logros[i].Nombre, logros[i].NombreLogro, logros[i].ImgPath, logros[i].Frase));
}

return (

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
      </div>
    );
}