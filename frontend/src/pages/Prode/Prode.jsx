/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Prode() {
  const [pre, setPre] = useState({
    PartidoID: 0,
    Resultado: "",
    UsuarioID: Number(localStorage.getItem("userID")),
  });
  const [loading, setLoading] = useState(false);
  const [matchs, setMatchs] = useState([]);
  useEffect(async () => {
    setLoading(true);
    await axios
      .get(`http://127.0.0.1:3001/api/predicciones`)
      .then((response) => {
        axios.get(`http://127.0.0.1:3001/api/partidos`).then((response1) => {
          const dataMatchday = response1.data
            .filter((item) => item.Score === null)
            localStorage.Matchday = dataMatchday[0].Matchday
            console.log(dataMatchday)
            //Guarda cual es la próxima fecha para limitar los resultados para predecir.
          const data = response1.data
            .filter((item) => item.Score === null)
            .filter((item) => item.Matchday === parseInt(localStorage.getItem("Matchday")))
            .filter(
              (obj) =>
                !response.data
                  .filter((as) => as.Nombre === localStorage.getItem("nombre"))
                  .map((a) => a.PartidoID)
                  .includes(obj.PartidoID)
            );
            console.log(data)
          setMatchs(data);
        });
      });
    setLoading(false);
  }, []);
  const sendResult = (pre) => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:3001/api/predicciones", {
        UsuarioID: pre.UsuarioID,
        Resultado: pre.Resultado,
        PartidoID: pre.PartidoID,
      })
      .then(() => {
        console.log(matchs.filter((item) => item.Score === null));
        console.log(pre.PartidoID);
        console.log(
          matchs.filter((match) => match.PartidoID !== pre.PartidoID)
        );
        setMatchs(matchs.filter((match) => match.PartidoID !== pre.PartidoID));
        setLoading(false);
      });
  };

  if (matchs.length > 0) {
    return (
      <div className="w-100 d-flex flex-column align-items-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <h1 className="mt-3">Predicciones para la Fecha {localStorage.Matchday}</h1>

            {matchs?.map((match, index) => (
              <div
                key={index}
                className="d-flex flex-row w-100 my-3 w-100 justify-content-around"
                style={{ padding: "2rem 28rem", backgroundColor: "#f2f2f2" }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={match.LocalPath}
                    width="60px"
                    height="60px"
                    alt="psg-logo"
                  />
                  <span>{match.Local}</span>
                </div>
                <div
                  className="w-100 d-flex flex-column align-items-center"
                  style={{ margin: "0 10rem" }}
                >
                  <span>{match.UTCDATE}</span>
                  <div className="d-flex flex-row justify-content-center mt-3">
                    <button
                      onClick={() =>
                        setPre({
                          ...pre,
                          PartidoID: match.PartidoID,
                          Resultado: "HOME_TEAM",
                        })
                      }
                      className={`border-0 p-3 mx-2 px-4 ${
                        pre?.PartidoID === match?.PartidoID &&
                        pre?.Resultado === "HOME_TEAM"
                          ? "bg-success"
                          : null
                      }`}
                      style={{ background: "#ccc" }}
                    >
                      L
                    </button>
                    <button
                      className={`border-0 p-3 px-4 mx-2 ${
                        pre?.PartidoID === match?.PartidoID &&
                        pre?.Resultado === "DRAW"
                          ? "bg-success"
                          : null
                      }`}
                      onClick={() =>
                        setPre({
                          ...pre,
                          PartidoID: match.PartidoID,
                          Resultado: "DRAW",
                        })
                      }
                      style={{ background: "#ccc" }}
                    >
                      E
                    </button>
                    <button
                      className={`border-0 p-3 px-4 mx-2 ${
                        pre?.PartidoID === match?.PartidoID &&
                        pre?.Resultado === "AWAY_TEAM"
                          ? "bg-success"
                          : null
                      }`}
                      onClick={() =>
                        setPre({
                          ...pre,
                          PartidoID: match.PartidoID,
                          Resultado: "AWAY_TEAM",
                        })
                      }
                      style={{ background: "#ccc" }}
                    >
                      V
                    </button>
                  </div>
                  {pre?.PartidoID === match?.PartidoID && (
                    <button
                      onClick={() => sendResult(pre)}
                      className="border-0 p-3 px-4 mt-3"
                      style={{ background: "#ccc" }}
                    >
                      Enviar
                    </button>
                  )}
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img
                    src={match.VisitantePath}
                    width="60px"
                    height="60px"
                    alt="psg-logo"
                  />
                  <span>{match.Visitante}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }else{ 
      return(
        <div className="w-100 d-flex flex-column align-items-center">
          <h1 className='mt-5' >Ya completaste tus predicciones para esta fecha</h1>
          <h1 className='mt-1' >Esperamos tus proximas predicciones la fecha que viene!</h1>
        </div>
        )
      
    }
}
