import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-5 bg-primary d-flex w-100">
      <div className="text-white">Logo</div>
      <div style={{ marginLeft: "auto" }}>
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
