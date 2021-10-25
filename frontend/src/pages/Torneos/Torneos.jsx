import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';

export default function Torneos() {
    const [torneosDelUser, getTorneos] = useState(0);
    const [participantes, getParticipantes] = useState(0);
    const [datos, setDatos] = useState({
        nombre: ''
    })
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
            <span className="h4">Mis torneos creados</span>
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
                  FechaCreacion: 4, //matchday actual CAMBIARLO
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
                    window.alert(
                    `Creado con exito`
                  );
                })
                .catch(() => console.log("error"));
            }
        return (
            <div className="">
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
  

  