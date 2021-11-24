import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Torneos() {
  const [torneosUnidos, getTorneosUnidos] = useState(0);
  const [user, getUsuarios] = useState(0);
  const [solicitudesUser, getSolicitudesUser] = useState(0);
  const [torneos, getTorneos] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  var [array, setArrayBusqueda] = useState([]);
  const [union, setUnion] = useState();
  const arrayBusqueda = [];
  const arrayTorneosDelUser = [];

  useEffect(() => {
    getUsers();
    getTorneo();
    getTorneosUnidosA();
    getSolicitudesDelUser();
  }, []);

  function getTorneosUnidosA() {
    axios
      .get(`http://127.0.0.1:3001/api/allTorneos/${localStorage.userID}`)
      .then((response) => {
        const data = response.data;
        getTorneosUnidos(data);
      })
      .catch(() => console.log("error"));
  }
  function getSolicitudesDelUser() {
    axios
      .get(`http://127.0.0.1:3001/api/solicitudesxuser/${localStorage.userID}`)
      .then((response) => {
        const data = response.data;
        getSolicitudesUser(data);
      })
      .catch(() => console.log("error"));
  }
  function getUsers() {
    axios
      .get(`http://127.0.0.1:3001/api/usuarios`)
      .then((response) => {
        const data = response.data;
        getUsuarios(data);
      })
      .catch(() => console.log("error"));
  }
  function getTorneo() {
    axios
      .get(`http://127.0.0.1:3001/api/torneos`)
      .then((response) => {
        const data = response.data;
        getTorneos(data);
      })
      .catch(() => console.log("error"));
  }

  for (let i = 0; i < torneos.length; i++) {
    for (let j = 0; j < user.length; j++) {
      if (torneos[i].UsuarioCreador == user[j].UsuarioID) {
        const userTorneo = {
          Usuario: user[j].Nombre,
          Torneo: torneos[i].Nombre,
          TorneoID: torneos[i].TorneoID,
        };
        arrayBusqueda.push(userTorneo);
      }
    }
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = arrayBusqueda.filter((elemento) => {
      if (
        elemento.Usuario.toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.Torneo.toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setArrayBusqueda(resultadosBusqueda);
  };

  const buscador = (e) => {
    e.preventDefault();
    if (!busqueda.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Ingrese una busqueda valida",
        icon: "error",
        timer: 2000,
      });
      return;
    }
    filtrar(busqueda);
  };

  const unirmeTorneo = (e) => {
    setUnion(e.target.value);
    console.log(e.target.value);
    axios
      .post(`http://127.0.0.1:3001/api/solicitudes/`, {
        TorneoID: Number(e.target.value),
        UsuarioID: localStorage.userID,
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Solicitud creada correctamente!",
          text: "Estarás en el torneo en cuanto el creador te acepte!",
          icon: "success",
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      });
  };
  for (let i = 0; i < torneosUnidos.length; i++) {
    arrayTorneosDelUser.push(torneosUnidos[i].TorneoID);
  }
  for (let i = 0; i < solicitudesUser.length; i++) {
    arrayTorneosDelUser.push(solicitudesUser[i].TorneoID);
  }

  return (
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <form
          class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
          onSubmit={buscador}
        >
          <input
            className="form-control inputBuscar"
            name="buscador"
            value={busqueda}
            placeholder="Búsqueda por Usuario o Torneo"
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-2">
            Buscar
          </button>
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
                    <button
                      className={`btn ${
                        arrayTorneosDelUser.includes(item.TorneoID)
                          ? "disabled"
                          : "bg-success"
                      } mt-2`}
                      value={item.TorneoID}
                      name="TorneoID"
                      onClick={unirmeTorneo}
                    >
                      Unirme
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
