import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';


export default function Torneos() {
    const [torneosDelUser, getTorneosUser] = useState(0);
    const [user, getUsuarios] = useState (0);
    const [participantes, getParticipantes] = useState(0);
    const [datos, setDatos] = useState({
        nombre: ''
    })
    const [torneos, getTorneos] = useState(0);
    const [busqueda, setBusqueda]= useState(null);
    var [array, setArrayBusqueda] = useState([]);
    var [array2, setArrayBusqueda2] = useState([]);

    const arrayBusqueda = [];
   
    
    useEffect(() => {
        getData();
        getUsers();
        getTorneo();
       
    },[]);
    
    function getData(){
        axios.get(`http://127.0.0.1:3001/api/torneos`)
        .then((response) => {
            const data = response.data.filter((item => item.UsuarioCreador === Number(localStorage.userID)));
            getTorneosUser(data)
        })
        .catch(() => console.log("error"));
    }
    function getUsers(){
        axios.get(`http://127.0.0.1:3001/api/usuarios`)
        .then((response) => {
            const data = response.data
            getUsuarios(data)
        })
        .catch(() => console.log("error"));
    }
    function getTorneo(){
        axios.get(`http://127.0.0.1:3001/api/torneos`)
        .then((response) => {
            const data = response.data;
            getTorneos(data)
        })
        .catch(() => console.log("error"));
    }
    
        for(let i = 0; i<torneos.length; i++){
            arrayBusqueda.push(torneos[i].Nombre);
        }
        for(let i = 0; i<user.length; i++){
            arrayBusqueda.push(user[i].Nombre);
        }

        
    const filtrar=(terminoBusqueda)=>{
         var resultadosBusqueda=user.filter((elemento)=>{
          if((elemento.Nombre.toString().toLowerCase()).includes(terminoBusqueda.toLowerCase())){
            return elemento.Nombre;
          }
        });

        var resultadosBusqueda2=torneos.filter((elemento)=>{
            if((elemento.Nombre.toString().toLowerCase()).includes(terminoBusqueda.toLowerCase())){
              return elemento.Nombre;
            }
        });
        //getUsuarios(resultadosBusqueda);
        //return (<p>{resultadosBusqueda}</p>);
        var array=resultadosBusqueda.find(e => {
            if(e.Nombre.toLowerCase() === terminoBusqueda.toLowerCase()){
                return e.Nombre;
            }
        });
        var array2=resultadosBusqueda2.find(e => {
            if(e.Nombre.toLowerCase() === terminoBusqueda.toLowerCase()){
                return e.Nombre;
            }
        }); 

        setArrayBusqueda(array);
        setArrayBusqueda2(array2);
      }

      console.log('Usuarios:', array)
      console.log('Torneos:', array2)



     

      const handleChange= (e) =>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
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
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input
                            className="form-control inputBuscar"
                            value={busqueda}
                            placeholder="Búsqueda por Usurio o Torneo"
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
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
             <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <input
                    className="form-control inputBuscar"
                    value={busqueda}
                    placeholder="Búsqueda por Usuario o Torneo"
                    onChange={handleChange}    
                />
            </form>
            <p>Resultados de la busqueda: </p>
        
            </div>
            </div>
          );
    }
  };
  

  