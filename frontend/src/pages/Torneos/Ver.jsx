import axios from "axios";
import { useState } from "react";
import * as React from 'react';

export default function Ver(props) {
    const [participantes, getParticipantes] = useState(0);
    const [solicitudes, getSolicitudes] = useState(0);

    const arraySolicitudes=[];

    const torneoCreado = {props}

    function aceptarSolicitud(id, torneo, user){
        axios
        .post(`http://127.0.0.1:3001/api/rankings/`, {
            Puntos: 0,
            TorneoID: `${torneo}`, //el recien creado
            UsuarioID: `${user}`
        })
        axios.delete(`http://127.0.0.1:3001/api/solicitudes/${id}`)
        .then((response) => {
            window.alert('Se ha aceptado la solicitud') 
        })
        .catch(() => console.log("error"));
    }
    function rechazarSolicitud(id){
        axios.delete(`http://127.0.0.1:3001/api/solicitudes/${id}`)
        .then((response) => {
            window.alert('Se ha rechazado la solicitud') 
        })
        .catch(() => console.log("error"));
    }

        axios.get(`http://127.0.0.1:3001/api/participantesxtorneo/${torneoCreado}`)
        .then((response) => {
            const data = response.data.length;
            getParticipantes(data)
        })
        .catch(() => console.log("error"));
        axios.get(`http://127.0.0.1:3001/api/solicitudesxtorneo/${torneoCreado}`)
        .then((response) => {
            const data = response.data;
            getSolicitudes(data)
        })
        .catch(() => console.log("error"));
        for(let i = 0; i<solicitudes.length; i++){
            arraySolicitudes.push(solicitudes[i]);      
        }
        return(
            <div className="w-100 d-flex flex-column align-items-center">
            <span className="h4">Mis torneos creados</span>
            <div className="card d-flex flex-column align-items-center">
                <div className="card-body w-100 d-flex flex-column align-items-center">
                <h5 className="card-title">Nombre del torneo:</h5>
                <h6 className="card-subtitle mb-2 text-muted">{torneoCreado}</h6>
                <p className="card-text">Participantes: {participantes}</p>
                <div className={`px-2 w-75 d-flex flex-column align-items-center ${
                    arraySolicitudes.length===0 ? "hide" : null
                }`}>
                {arraySolicitudes.map(function(each){
                    return(
                        <div className="align-items-center justify-content-center">
                            {each.Nombre}
                            <button type="submit" className="btn btn-secondary mx-2" onClick={()=>aceptarSolicitud(each.SolicitudID, each.TorneoID, each.UsuarioID)}>Aceptar</button>
                            <button type="submit" className="btn btn-secondary mx-2" onClick={()=>rechazarSolicitud(each.SolicitudID)}>Rechazar</button>
                        </div>
                    )
                })
                }
                </div>
                <a href="/ranking" className="card-link">Ver Ranking</a>
            </div>
            </div>
            <span className="h5">Hacete premium para poder crear mas torneos!</span>
            </div>
          );
        
  };
  

  