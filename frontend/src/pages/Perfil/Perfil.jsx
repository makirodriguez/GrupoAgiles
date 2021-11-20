
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
import { useAuth0 } from '@auth0/auth0-react';

function createData(idLogro, user, name, img, frase) {
        return {idLogro, user, name, img, frase };
};

export default function Perfil() {
  const [logros, getLogros] = useState(0);
    const { user } = useAuth0();
  const { name, picture, email } = user;


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
      </div>
    );
}

//export default Perfil;

