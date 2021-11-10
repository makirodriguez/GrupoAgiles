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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export default function Torneos() {
    const [torneosDelUser, getTorneosUser] = useState(0);
    const [torneosUnidos, getTorneosUnidos] = useState(0);
    const [user, getUsuarios] = useState (0);
    const [participantes, getParticipantes] = useState(0);
    const [solicitudes, getSolicitudes] = useState(0);
    const [solicitudesUser, getSolicitudesUser] = useState(0);
    const [datos, setDatos] = useState({
        nombre: ''
    })
    const [torneos, getTorneos] = useState(0);
    const [busqueda, setBusqueda]= useState('');
    var [array, setArrayBusqueda] = useState([]);
    const [union, setUnion]= useState();
    const arrayBusqueda=[];
    const arrayTorneosDelUser=[];
    const arraySolicitudes=[];
   
    
    useEffect(() => {
        getData();
        getUsers();
        getTorneo();
        getTorneosUnidosA();
        getSolicitudesDelUser();
    },[]);
    
    function getData(){
        axios.get(`http://127.0.0.1:3001/api/torneos`)
        .then((response) => {
            const data = response.data.filter((item => item.UsuarioCreador === Number(localStorage.userID)));
            getTorneosUser(data)
        })
        .catch(() => console.log("error"));
    }
    function getTorneosUnidosA(){
        axios.get(`http://127.0.0.1:3001/api/allTorneos/${localStorage.userID}`)
        .then((response) => {
            const data = response.data;
            getTorneosUnidos(data)
        })
        .catch(() => console.log("error"));
    }
    function getSolicitudesDelUser(){
        axios.get(`http://127.0.0.1:3001/api/solicitudesxuser/${localStorage.userID}`)
        .then((response) => {
            const data = response.data;
            getSolicitudesUser(data)
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
    function aceptarSolicitud(id){
        console.log("acepta" + id);
    }
    function rechazarSolicitud(id){
        console.log("rechaza" + id);
    }
        for(let i = 0; i<torneos.length; i++){
            for(let j = 0; j<user.length; j++){
                if(torneos[i].UsuarioCreador == user[j].UsuarioID){
                    const userTorneo = {
                        Usuario: user[j].Nombre,
                        Torneo: torneos[i].Nombre,
                        TorneoID: torneos[i].TorneoID,
                    }
                    arrayBusqueda.push(userTorneo);
                }
            }
        }
        

        
    const filtrar=(terminoBusqueda)=>{
         var resultadosBusqueda=arrayBusqueda.filter((elemento)=>{
                if(((elemento.Usuario.toString().toLowerCase()).includes(terminoBusqueda.toLowerCase())) || 
                (((elemento.Torneo).toString().toLowerCase()).includes(terminoBusqueda.toLowerCase())))
                {
                    return elemento;
                }                      
          }); 
          setArrayBusqueda(resultadosBusqueda)
        } 
     

    const buscador = (e) =>{
        e.preventDefault()
        if(!busqueda.trim()){
            window.alert("Ingrese su busqueda")
            return
        }
        filtrar(busqueda);
      
    }


/*    const unirmeTorneo = (e) => {
        setUnion(e.target.value)
        console.log(e.target.value)
        axios
        .post(`http://127.0.0.1:3001/api/rankings/`, {
            Puntos: 0,
            TorneoID: Number(e.target.value), //el recien creado
            UsuarioID: localStorage.userID
        })
        .then((response)=>{
            console.log(response)
            window.location.reload(true);
            window.alert('Te uniste exitosamente') 
        })
   
    }
*/
    const unirmeTorneo = (e) => {
        setUnion(e.target.value)
        console.log(e.target.value)
        axios
        .post(`http://127.0.0.1:3001/api/solicitudes/`, {
            TorneoID: Number(e.target.value),
            UsuarioID: localStorage.userID
        })
        .then((response)=>{
            console.log(response)
            window.location.reload(true);
            window.alert('Estarás en el torneo en cuanto el creador te acepte!') 
        })
   
    }
    for(let i = 0; i<torneosUnidos.length; i++){
        arrayTorneosDelUser.push(torneosUnidos[i].TorneoID);
    }
    for(let i = 0; i<solicitudesUser.length; i++){
        arrayTorneosDelUser.push(solicitudesUser[i].TorneoID);
    }

    if (torneosDelUser.length > 0){
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
                            <button type="submit" className="btn btn-secondary mx-2" onClick={()=>aceptarSolicitud(each.SolicitudID)}>Aceptar</button>
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
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" onSubmit={buscador}>
                        <input
                            className="form-control inputBuscar"
                            name="buscador"
                            value={busqueda}
                            placeholder="Búsqueda por Usuario o Torneo"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary mt-2">Buscar</button>
                    </form>
                   
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 5 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Usuario</StyledTableCell>
                                <StyledTableCell>Torneo</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {array.map((item) => (
                                <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {item.Usuario}
                                </StyledTableCell>
                                <StyledTableCell>{item.Torneo}</StyledTableCell>
                                <StyledTableCell>
                                <button className={`btn ${
                                    arrayTorneosDelUser.includes(item.TorneoID) ? "disabled" : "bg-success"
                                } mt-2`} value={item.TorneoID} name="TorneoID" onClick={unirmeTorneo}>Unirme</button>
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

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
             <div className="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" onSubmit={buscador}>
                        <input
                            className="form-control inputBuscar"
                            name="buscador"
                            value={busqueda}
                            placeholder="Búsqueda por Usuario o Torneo"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary mt-2">Buscar</button>
                    </form>
                   
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 5 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Usuario</StyledTableCell>
                                <StyledTableCell>Torneo</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {array.map((item) => (
                                <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {item.Usuario}
                                </StyledTableCell>
                                <StyledTableCell>{item.Torneo}</StyledTableCell>
                                <StyledTableCell>
                                <button value={item.TorneoID} className={`btn ${
                                    arrayTorneosDelUser.includes(item.TorneoID) ? "disabled" : "bg-success"
                                } mt-2`} name="TorneoID" onClick={unirmeTorneo} >Unirme</button>
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
             
            </div>
          );
    }
  };
  

  