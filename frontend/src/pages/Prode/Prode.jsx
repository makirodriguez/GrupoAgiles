import axios from "axios";
import { useEffect } from "react";

export default function Prode() {
  useEffect(() => {
    axios
      .get("https://api.football-data.org/v2/matches", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 4ac84deb5017487bb0c57a298189ee60",
          "Access-Control-Allow-Origin": "*"
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch(() => console.log("error"));
  }, []);
  return (
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
          <span>PSG</span>
        </div>
        <div style={{ margin: "0 10rem" }}>
          <span>Martes 28 de septiembre 15:45 UTC</span>
          <div className="d-flex flex-row justify-content-center mt-3">
            <button
              className="border-0 p-3 px-4"
              style={{ background: "#ccc" }}
            >
              L
            </button>
            <button
              className="border-0 p-3 px-4 mx-2"
              style={{ background: "#ccc" }}
            >
              E
            </button>
            <button
              className="border-0 p-3 px-4"
              style={{ background: "#ccc" }}
            >
              V
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
          <span>City</span>
        </div>
      </div>
    </div>
  );
}
