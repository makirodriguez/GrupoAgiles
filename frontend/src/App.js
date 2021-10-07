import { Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import history from "./helpers/history";
import Home from "./pages/Home/Home";
import Ranking from "./pages/Ranking/Ranking";
import Prode from "./pages/Prode/Prode";
import Partidos from "./pages/Partidos/Partidos";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Router history={history}>
        <Header />
        <div className="p-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/ranking" exact component={Ranking} />
            <Route path="/prode" exact component={Prode} />
            <Route path="/partidos" exact component={Partidos} />
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
