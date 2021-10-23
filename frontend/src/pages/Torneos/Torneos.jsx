import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';

export default function Torneos() {
    const [torneosDelUser, getTorneos] = useState(0);
    const [participantes, getParticipantes] = useState(0);
    useEffect(() => {
        getData();
    },[]);
    function getData(){
        axios.get(`http://127.0.0.1:3001/api/torneos`)
        .then((response) => {
            const data = response.data.filter((item => item.UsuarioCreador === Number(localStorage.userID)));
            getTorneos(data)
        })
        .catch(() => console.log("error"));
    }
    if (torneosDelUser.length === 1){
        axios.get(`http://127.0.0.1:3001/api/participantesxtorneo/${torneosDelUser[0].TorneoID}`)
        .then((response) => {
            const data = response.data.length;
            getParticipantes(data)
        })
        .catch(() => console.log("error"));
        return(
            <div className="w-100 d-flex flex-column align-items-center">
            <span className="h2">Mis torneos creados</span>
            <div className="card d-flex flex-column align-items-center">
                <div className="card-body w-100 d-flex flex-column align-items-center">
                <h5 className="card-title">Nombre del torneo:</h5>
                <h6 className="card-subtitle mb-2 text-muted">{torneosDelUser[0].Nombre}</h6>
                <p className="card-text">Participantes: {participantes}</p>
                <a href="/ranking" className="card-link">Ver Ranking</a>
            </div>
            </div>
            <span className="h5">Hacete premium para poder crear mas torneos!</span>
            </div>
          );
    } else {
        return (
            <div className="">
              <h1>no tiene torneos creados, tengo que crear el torneo y crear el ranking con 0 puntos</h1>
              <h2>{localStorage.nombre}</h2>
            </div>
          );
    }
  };
  

  