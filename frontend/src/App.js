import { Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import history from "./helpers/history";
import Home from "./pages/Home/Home";
import Ranking from "./pages/Ranking/Ranking";
import Prode from "./pages/Prode/Prode";
import Login from "./pages/Login/Login";
import Predicciones from "./pages/Predicciones/Predicciones";
import Perfil from "./pages/Perfil/Perfil";
import Torneos from "./pages/Torneos/Torneos";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/ranking" exact component={Ranking} />
            <Route path="/prode" exact component={Prode} />
            <Route path="/predicciones" exact component={Predicciones} />
            <Route path="/torneos" exact component={Torneos} />
            <Route path="/perfil" exact component={Perfil} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
