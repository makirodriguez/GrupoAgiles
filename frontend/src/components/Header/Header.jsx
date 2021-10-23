import { Link } from "react-router-dom";
import logo from "./icon.png";

const Header = () => {
  return (
    <div className="bg-primary d-flex w-100">
      <div>
        <Link to="/home" className="text-white text-decoration-none">
          <img src={logo} width="120px" height="120px" alt="Logo" />
        </Link>
      </div>
      <div className="p-5" style={{ marginLeft: "auto" }}>
        <span className="mx-3">
          <Link to="/home" className="text-white text-decoration-none">
            Home
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/prode" className="text-white text-decoration-none">
            Prode
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/partidos" className="text-white text-decoration-none">
            Partidos
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/predicciones" className="text-white text-decoration-none">
            Predicciones
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/ranking" className="text-white text-decoration-none">
            Ranking
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/torneos" className="text-white text-decoration-none">
            Torneos
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/perfil" className="text-white text-decoration-none">
            Mi perfil
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/" className="text-white text-decoration-none">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
