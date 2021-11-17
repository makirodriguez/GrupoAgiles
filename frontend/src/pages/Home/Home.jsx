const Home = () => {
  return (
    <div className="">
      <div style={{ textAlign: "center" }}>
        <br />
        <h1 style={{ fontFamily: "Copperplate" }}>Bienvenido a FURVO!</h1>
        <hr />
      </div>

      <div
        style={{
          position: "relative",
          top: "0px",
          left: "0px",
          width: "50%",
          marginTop: "10px",
          float: "left",
          // borderRight: "thick solid grey",
        }}
      >
        <ul
          style={{
            textAlign: "justify",
            paddingRight: "50px",
          }}
        >
          <li
            style={{
              fontFamily: "Copperplate",
              paddingLeft: "10px",
              fontSize: "20px",
            }}
          >
            ¿Qué es 'FURVO!'?
          </li>
          <ul>
            <li style={{ padding: "10px 50px 0px 0px" }}>
              {" "}
              Es una app donde podés completar pronósticos de los partidos que
              corresponden a torneos que se encuentran disponibles y en el cual
              se crean torneos de amigos para competir y jugar con ellos{" "}
            </li>
          </ul>
          <hr />
          <li
            style={{
              fontFamily: "Copperplate",
              paddingLeft: "10px",
              fontSize: "20px",
            }}
          >
            ¿Cómo funcionan las puntuaciones?
          </li>
          <ul>
            <li style={{ padding: "10px 50px 0px 0px" }}>
              <strong>3 puntos</strong> por acertar el resultado exacto
              (Perfect)
            </li>
            <li>
              <strong>1 punto</strong> por acertar el ganador o empate (Acierto)
            </li>
            <li>
              <strong>0 puntos</strong> por no acertar (Fallo)
            </li>
            <br />

            <strong>Ejemplo</strong>

            <ul>
              <span>
                Realizando el siguiente pronostico: Local 1 - 0 Visitante
              </span>
              <br />
              <span>Y el resultado es:</span>
              <li>1-0 entonces sumás 3 puntos (Perfect)</li>
              <li>2-1 entonces sumás 1 punto (Acierto)</li>
              <li>1-1 entonces sumás 0 puntos (Fallo)</li>
            </ul>
          </ul>
        </ul>
        <hr />
      </div>
      <div style={{ width: "50%", marginTop: "10px", float: "left" }}>
        <ul
          style={{
            textAlign: "justify",
            paddingRight: "50px",
          }}
        >
          <li
            style={{
              fontFamily: "Copperplate",
              paddingLeft: "10px",
              fontSize: "20px",
            }}
          >
            ¿Cómo jugar?
          </li>
          <ol>
            <li style={{ padding: "10px 50px 0px 0px" }}>
              Dirigete a la Pestaña prode
            </li>
            <li>
              Escribir cuantos goles crees que harán el equipo Local y el
              Visitante
            </li>
            <li>Darle click a Enviar</li>
            <li>Repite con todos los partidos</li>
            <li>Listo!</li>
          </ol>
          <hr />
          <li
            style={{
              fontFamily: "Copperplate",
              paddingLeft: "10px",
              fontSize: "20px",
            }}
          >
            ¿Cómo funcionan los Torneos de Amigos?
          </li>
          <ul>
            <li style={{ padding: "10px 50px 0px 0px" }}>
              Diviertete con tus amigos creando torneos y compitiendo contra
              ellos
            </li>
            <li>
              Puedes crear un solo torneo por usuario (Si te quedas con ganas,
              puedes optar por el pase premium y crear todos los torneos que tu
              quieras
            </li>
            <li>
              Puedes unirte a cuantos torneos desees, sólo necesitas el nombre
              de tu amigo o el nombre del torneo para poder buscarlo
            </li>
            <li>
              Y Listo, Así de fácil estarás compitiendo con tus amigos por ver
              quien es el rey del Fútbol!
            </li>
          </ul>
          <hr />
        </ul>
      </div>
    </div>
  );
};

export default Home;
