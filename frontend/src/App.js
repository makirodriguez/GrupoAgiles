import { Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import history from "./helpers/history";
import Home from "./pages/Home/Home";
import Ranking from "./pages/Ranking/Ranking";
import Prode from "./pages/Prode/Prode";
import Login from "./pages/Login/Login";
import Partidos from "./pages/Partidos/Partidos";
import Predicciones from "./pages/Predicciones/Predicciones";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="p-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/ranking" exact component={Ranking} />
            <Route path="/prode" exact component={Prode} />
            <Route path="/partidos" exact component={Partidos} />
            <Route path="/predicciones" exact component={Predicciones} />
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
