import { Link } from "react-router-dom";
import logo from "./icon.png";
import AuthNav from '../auth-nav';


const Header = () => {
  return (
    <div className="bg-primary d-flex w-100">
      <div >
        <Link to="/home" className="text-white text-decoration-none">
          <img src={logo} width="120px" height="120px" alt="Logo" />
        </Link>
        <span className="mx-3">
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/prode" className="text-white text-decoration-none">
            Prode
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
          <Link to="/misTorneos" className="text-white text-decoration-none">
            Mis Torneos
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/solicitudes" className="text-white text-decoration-none">
            Unirse
          </Link>
        </span>
        <span className="mx-3">
          <Link to="/perfil" className="text-white text-decoration-none">
            Mi perfil
          </Link>
        </span>
      </div>
      <div className="p-5" style={{ marginLeft: "auto" }}> 
          <Link to="/login" className="text-white text-decoration-none">
            <AuthNav />
          </Link>
      </div>
     
    </div>
  );
};

export default Header;
