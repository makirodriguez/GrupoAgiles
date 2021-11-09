import {Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import history from "./helpers/history";
import Home from "./pages/Home/Home";
import Ranking from "./pages/Ranking/Ranking";
import Prode from "./pages/Prode/Prode";
import Predicciones from "./pages/Predicciones/Predicciones";
import {Perfil} from "./pages/Perfil/Perfil";
import Torneos from "./pages/Torneos/Torneos";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";




function App() {

  const {isAuthenticated, user} = useAuth0();
 
  useEffect(() => {
    localStorage.clear();
  }, []);
  if (isAuthenticated == true){
    
    console.log(user)
    function setMatchday() {
      axios
        .get(`http://127.0.0.1:3001/api/partidos`)
        .then((response1) => {
          const dataMatchday = response1.data.filter(
            (item) => item.Score == null
          );
          localStorage.Matchday = dataMatchday[0].Matchday;
          console.log(dataMatchday)
        })
        .catch(() => console.log("error"));
    }
    setMatchday();
    localStorage.nombre = user.nickname;
        axios
          .get(
            `http://127.0.0.1:3001/api/usuarioxnombre/${localStorage.nombre}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((res) => {
            
            // si length = 0 no existe el usuario, lo creo:
            if (res.data.length === 0) {
              axios
                .post(`http://127.0.0.1:3001/api/usuarios/`, {
                  Nombre: `${localStorage.nombre}`,
                })
                .then((res) => {
                  const id = Number(res.data.id);
                  localStorage.userID = id;
                  // posteo a rankings con torneo 1, puntos 0 y el id del usuario
                  axios
                    .post(`http://127.0.0.1:3001/api/rankings/`, {
                      Puntos: 0,
                      TorneoID: 1, //champions
                      UsuarioID: id,
                    })
                    .catch(() => console.log("error"));
                })
                .catch(() => console.log("error"));
            } else {
              console.log(res.data[0].UsuarioID);
              const id = Number(res.data[0].UsuarioID);
              localStorage.userID = id;
            }
          })
          .catch(() => console.log("error")); 
   
  }

  return ( 
   
  
    <div> 
      <Router history={history} >
      
      <Header />
      
       <div className="">
       <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/ranking" exact component={Ranking} />
        <Route path="/prode" exact component={Prode} />
        <Route path="/predicciones" exact component={Predicciones} />
        <Route path="/torneos" exact component={Torneos} />
        <Route path="/perfil" exact component={Perfil} />
        {/*  <Route path="*">
           <Redirect to="/" /> 
        </Route>  */}
      </Switch>   
   
    </div>      
   
    
  

     </Router>
 </div>
     
  



    
      
  );
}

export default App;
