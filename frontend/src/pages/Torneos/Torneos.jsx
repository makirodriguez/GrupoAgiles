import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react';
import Ver from "./Ver";
import Crear from "./Crear";

export default function Torneos() {

const [torneosDelUser, getTorneosUser] = useState(0);

useEffect(() => {
  getData();
}, []);

function getData(){
  axios.get(`http://127.0.0.1:3001/api/torneos`)
  .then((response) => {
      const data = response.data.filter((item => item.UsuarioCreador === Number(localStorage.userID)));
      getTorneosUser(data)
  })
  .catch(() => console.log("error"));
}

if(torneosDelUser==0){
  return <Crear />
}else{
  return <Ver 
  TorneoID={torneosDelUser[0].TorneoID} 
  />
}

}