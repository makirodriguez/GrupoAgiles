import axios from "axios";
import { useState } from "react";
import * as React from 'react';

export default function Torneos() {
    const [torneosDelUser, getTorneosUser] = useState(0);
    const [participantes, getParticipantes] = useState(0);
    const [solicitudes, getSolicitudes] = useState(0);
    const [datos, setDatos] = useState({
        nombre: ''
    })
 
    const arraySolicitudes=[];

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
    function getData(){
        axios.get(`http://127.0.0.1:3001/api/torneos`)
        .then((response) => {
            const data = response.data.filter((item => item.UsuarioCreador === Number(localStorage.userID)));
            getTorneosUser(data)
        })
        .catch(() => console.log("error"));
    }

    if (torneosDelUser==0){
        getData()

    }

    if (torneosDelUser.length === 1){
        axios.get(`http://127.0.0.1:3001/api/participantesxtorneo/${torneosDelUser[0].TorneoID}`)
        .then((response) => {
            const data = response.data.length;
            getParticipantes(data)
        })
        .catch(() => console.log("error"));
        axios.get(`http://127.0.0.1:3001/api/solicitudesxtorneo/${torneosDelUser[0].TorneoID}`)
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
                <h6 className="card-subtitle mb-2 text-muted">{torneosDelUser[0].Nombre}</h6>
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
        } else {
            const handleInputChange = (e) => {
                setDatos({
                    ...datos,
                    [e.target.name] : e.target.value
                })
            }
            const enviarDatos = (event) => {
                event.preventDefault()
                axios
                .post(`http://127.0.0.1:3001/api/torneos/`, {
                  Nombre: datos.nombre,
                  FechaCreacion: localStorage.Matchday,
                  UsuarioCreador: localStorage.userID
                })
                .then((res) => {
                  const torneoID = res.data.id
                  axios
                    .post(`http://127.0.0.1:3001/api/rankings/`, {
                        Puntos: 0,
                        TorneoID: torneoID, //el recien creado
                        UsuarioID: localStorage.userID
                    })
                    .then((res) => {

                    })
                    .catch(() => console.log("error")); 
                    window.location.reload(true);
                    window.alert(
                        `Creado con exito`
                        );
                })
                .catch(() => console.log("error"));
            }

        return (
            <div className="w-100 d-flex flex-column align-items-left">
              <div className="card d-flex flex-column">
                <form className="row" onSubmit={enviarDatos}>
                <div className="card-body">
                <h4 className="card-title">Crear un torneo privado</h4>
                <label for="nombre">Nombre del torneo:</label>
                <input className="form-control" type="text" placeholder="Nombre" onChange={handleInputChange} name="nombre"></input>
                <label for="liga">Liga:</label>
                <br></br>
                <select className="custom-select my-1 mr-2" id="inlineFormCustomSelect" disabled>
                <option selected>Champions League</option>
                </select>
                <div className="form-group row">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary mt-2" onSubmit="console.log(ok)">Aceptar</button>
                </div>
                </div>
             </div>
                </form>
             </div>
             
            </div>
          );
    }
  };
  

  