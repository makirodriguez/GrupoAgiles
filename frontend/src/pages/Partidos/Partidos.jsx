import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Prode() {
  const [partidos, getPartidos] = useState(0);

  useEffect(() => {
    getAllMatches();
  },[]);

  function getAllMatches(){
    axios.get(`http://127.0.0.1:3001/api/partidos`)
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
      <span className="h1">Predicciones</span>
      <div
        className="d-flex flex-row w-100"
        style={{ padding: "2rem 28rem", backgroundColor: "#f2f2f2" }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c4d8.png"
            width="60px"
            height="60px"
            alt="psg-logo"
          />
          <span>{partidos[0].Local}</span>
        </div>
        <div style={{ margin: "0 10rem" }}>
          <span>{partidos[0].UTCDATE}</span>
          <div className="d-flex flex-row justify-content-center mt-3">
            <button
              className="border-0 p-3 px-4"
              style={{ background: "#ccc" }}
            >
              {partidos[0].GolesLocal}
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
              {partidos[0].GolesVisit}
            </button>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png"
            width="60px"
            height="60px"
            alt="psg-logo"
          />
          <span>{partidos[0].Visitante}</span>
        </div>
      </div>
    </div>
        )
    }else{
      return(<p>no matches yet!</p>)
    }

}