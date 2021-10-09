import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Prode() {
  const [partidos, getPartidos] = useState(0);

  useEffect(() => {
    getAllMatches();
  },[]);

  function getAllMatches(){
    axios.get(`http://127.0.0.1:3001/api/partidosterminados`)
    .then((response) => {
        const data = response.data;
        getPartidos(data);
        console.log(partidos)
    })
    .catch(() => console.log("error"));
  }

    if (partidos.length > 0){
      return(
        <div className="w-100 d-flex flex-column align-items-center">
        <span className="h1">Partidos</span>
        {partidos && (
          <div>

      {partidos.map((partido, index) => {  
        return(
      <div className="w-100 d-flex flex-column align-items-center">
      <span className="h1"></span>
      <div
        className="d-flex flex-row w-100"
        style={{ padding: "2rem 28rem", backgroundColor: "#f2f2f2" }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={partido.LocalPath}
            width="60px"
            height="60px"
            alt="logo-local"
          />
          <span>{partido.Local}</span>
        </div>
        <div className="w-100 d-flex flex-column align-items-center" style={{ margin: "0 10rem" }}>
          <span>Finalizado</span>
          <div className="d-flex flex-row justify-content-center mt-3">
            <button
              className="border-0 p-3 px-4"
              style={{ background: "#ccc" }}
            >
              {partido.GolesLocal}
            </button>
            <button
              className="border-0 p-3 px-4 mx-2"
              style={{ background: "#ccc" }}
            >
              -
            </button>
            <button
              className="border-0 p-3 px-4"
              style={{ background: "#ccc" }}
            >
              {partido.GolesVisit}
            </button>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={partido.VisitantePath}
            width="60px"
            height="60px"
            alt="logo-visitante"
          />
          <span>{partido.Visitante}</span>
        </div>
      </div>
    </div>
        )})}

      </div>)}
        </div>)
    }else{
      return(<p>no matches yet!</p>)
    }

}