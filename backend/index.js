const express = require('express') // lo importamos
const app = express() // representa a la aplicacion
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const axios = require('axios')

// nos conectamos a la db
const db_name = path.join(__dirname, 'data', 'apptest.db')
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log("Successful connection to the database 'apptest.db'")
})

// Creamos la tabla si no existe
var sql_create = `CREATE TABLE IF NOT EXISTS Partido(
  PartidoID INTEGER PRIMARY KEY AUTOINCREMENT,
  GolesLocal INTEGER,
  GolesVisit INTEGER,
  UTCDATE TEXT,
  Score TEXT,
  LocalID INTEGER,
  VisitanteID INTEGER,
  Matchday INTEGER,
  FOREIGN KEY (LocalID) REFERENCES Equipo(EquipoID),
  FOREIGN KEY (VisitanteID) REFERENCES Equipo(EquipoID)
  );`

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }
})

// Database seeding, esto desp lo sacamos
// let sql_insert = `INSERT INTO Partido (PartidoID, GolesLocal, GolesVisit, UTCDATE, Score, LocalID, VisitanteID) VALUES
//  (1, 1, 0, '2021-06-22T18:00:00Z', 'HOME_TEAM', 1, 2),
// (2, 0, 3, '2021-06-23T18:00:00Z', 'AWAY_TEAM', 1, 2),
// (4, 1, 3, '2021-05-23T18:00:00Z', 'AWAY_TEAM', 1, 2),
// (3, 2, 2, '2021-07-24T19:30:00Z', 'DRAW', 2, 1);`
// db.run(sql_insert, err => {
// if (err) {
// return console.error(err.message)
// }
// })

// Creamos la tabla si no existe
var sql_create = `CREATE TABLE IF NOT EXISTS Equipo (
  EquipoID INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT NOT NULL, 
  ImgPath TEXT
);`
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }

  // Database seeding, esto desp lo sacamos
  //  let sql_insert = `INSERT INTO Equipo (EquipoID, Nombre) VALUES
  //  (1, 'Racing'),
  //  (2, 'PSG')`
  //  db.run(sql_insert, err => {
  //    if (err) {
  //      return console.error(err.message)
  //    }
  //    console.log('Successful creation')
  //  })
})
// Creamos la tabla si no existe
var sql_create = `CREATE TABLE IF NOT EXISTS Usuario(
  UsuarioID INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT NOT NULL
  );`
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }

  /*  // Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Usuario (UsuarioID, Nombre) VALUES
    (3, 'Cristiano Ronaldo'),
    (4, 'Ronaldinho')`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  }) */
})

var sql_create = `CREATE TABLE IF NOT EXISTS Prediccion(
  PrediccionID INTEGER PRIMARY KEY AUTOINCREMENT,
  Resultado TEXT NOT NULL,
  PartidoID INTEGER,
  UsuarioID INTEGER,
  Puntos INTEGER,
  Matchday INTEGER,
  GolesLocal INTEGER,
  GolesVisitante INTEGER,
  FOREIGN KEY (PartidoID) REFERENCES Partido(PartidoID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
  );`
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }

  /* / Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Prediccion (PrediccionID, Resultado, PartidoID, UsuarioID) VALUES
    (1, 'L', 1, 1),
    (2, 'E', 1, 2)`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  }) */
})
var sql_create = `CREATE TABLE IF NOT EXISTS Torneo(
  TorneoID INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT NOT NULL,
  FechaCreacion INTEGER,
  UsuarioCreador INTEGER,
  FOREIGN KEY (UsuarioCreador) REFERENCES Usuario(UsuarioID)
  );`
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }
})
var sql_create = `CREATE TABLE IF NOT EXISTS Solicitud(
    SolicitudID INTEGER PRIMARY KEY AUTOINCREMENT,
    TorneoID INTEGER,
    UsuarioID INTEGER,
    FOREIGN KEY (TorneoID) REFERENCES Torneo(TorneoID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
    );`
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }
})

/* / Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Torneo (TorneoID, Nombre) VALUES
    (1, 'Global Champions League')`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  }) */
var sql_create = `CREATE TABLE IF NOT EXISTS Ranking(
  RankingID INTEGER PRIMARY KEY AUTOINCREMENT,
  Puntos INTEGER NOT NULL,
  TorneoID INTEGER,
  UsuarioID INTEGER,
  FOREIGN KEY (TorneoID) REFERENCES Torneo(TorneoID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
  );`
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }

  /* // Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Ranking (RankingID, Puntos, TorneoID, UsuarioID) VALUES
    (3, 6, 1, 3),
    (4, 7, 1, 4)`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  }) */

})

/*var sql_create = `DROP TABLE Logros;`

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message)
  }
})*/

var sql_create = `CREATE TABLE IF NOT EXISTS Logros(
  LogroID INTEGER PRIMARY KEY AUTOINCREMENT,
  NombreLogro TEXT,
  ImgPath TEXT,
  Frase TEXT,
  Otorgado INTEGER
  );`;

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
});

/*const sql_insert = `INSERT INTO Logros (LogroID, NombreLogro, ImgPath, Frase, Otorgado) VALUES
    (1, 'Ganador del torneo Global', 'https://cdn.discordapp.com/attachments/877203565725245542/908175776392814602/CampeonAmigos.png', 'Ole, Ole y Ole!', 0),
    (2, 'Ganador del torneo de Amigos', 'https://cdn.discordapp.com/attachments/877203565725245542/908175783170805810/CampeonGlobal.png', 'Dale campeeoon', 0),
    (3, 'Perfect', 'https://cdn.discordapp.com/attachments/877203565725245542/908175784433291285/Perfect.png', 'Facilito', 0),
    (99, 'Tronco', 'https://cdn.discordapp.com/attachments/877203565725245542/908175787960700998/Tronco.png', 'Nos vamos al Nacional', 0)`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  })*/

/*const sql_insert = `INSERT INTO LogrosXUser (LogroID, UsuarioID) VALUES
    (99, 12),
    (1, 12)`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  })*/

var sql_create = `CREATE TABLE IF NOT EXISTS LogrosXUser(
  LogroID INTEGER,
  UsuarioID INTEGER,
  FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID),
  FOREIGN KEY (LogroID) REFERENCES Logros(LogroID)
  );`;
db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
});

// -------------------------------------------------------------------

app.use(cors())
app.use(express.json()) // para tener el bodyparser

// ---------------------------- additions ---------------------------------------

app.get('/api/usuarioxnombre/:name', (req, res) => {
  const name = req.params.name
  const sql = 'SELECT * FROM Usuario WHERE Nombre = ?'
  db.all(sql, name, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/participantesxtorneo/:id', (req, res) => {
  const id = req.params.id
  const sql =
    'SELECT Usuario.UsuarioID, Usuario.Nombre FROM Ranking inner join Usuario on Ranking.UsuarioID = Usuario.UsuarioID inner join Torneo on Torneo.TorneoID = Ranking.TorneoID WHERE Ranking.TorneoID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/solicitudesxtorneo/:id', (req, res) => {
  const id = req.params.id
  const sql =
    'SELECT Solicitud.SolicitudID, Usuario.UsuarioID, Usuario.Nombre, Torneo.TorneoID FROM Solicitud inner join Usuario on Solicitud.UsuarioID = Usuario.UsuarioID inner join Torneo on Torneo.TorneoID = Solicitud.TorneoID WHERE Solicitud.TorneoID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/solicitudesxuser/:id', (req, res) => {
  const id = req.params.id
  const sql =
    'SELECT Solicitud.SolicitudID, Torneo.TorneoID, Torneo.Nombre FROM Solicitud inner join Usuario on Solicitud.UsuarioID = Usuario.UsuarioID inner join Torneo on Torneo.TorneoID = Solicitud.TorneoID WHERE Solicitud.UsuarioID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})

// --------------------------- GET all -------------------------------

app.get('/api/allpartidosterminados', (req, res) => {
  const sql =
    'SELECT * FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID inner join Equipo a on a.EquipoID = Partido.VisitanteID WHERE Partido.Score is not null ORDER BY UTCDATE desc'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/partidosterminados', (req, res) => {
  const sql =
    'SELECT PartidoID, Matchday, UTCDATE, GolesLocal, GolesVisit, Score, Equipo.Nombre Local, Equipo.ImgPath LocalPath, a.Nombre Visitante, a.ImgPath VisitantePath FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID inner join Equipo a on a.EquipoID = Partido.VisitanteID WHERE Partido.Score is not null ORDER BY UTCDATE desc LIMIT 16'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/partidos', (req, res) => {
  const sql =
    'SELECT PartidoID, LocalID, VisitanteID, Matchday, UTCDATE, GolesLocal, GolesVisit, Score, Equipo.Nombre Local, Equipo.ImgPath LocalPath, a.Nombre Visitante, a.ImgPath VisitantePath FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID inner join Equipo a on a.EquipoID = Partido.VisitanteID ORDER BY UTCDATE'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/equipos', (req, res) => {
  const sql = 'SELECT * FROM Equipo ORDER BY Nombre'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/usuarios', (req, res) => {
  const sql = 'SELECT * FROM Usuario ORDER BY Nombre'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})

app.get('/api/prediccionesPorPartido', (req, res) => {
  const sql =
    'SELECT Partido.PartidoID, Partido.Matchday, UTCDATE, Partido.GolesLocal, Partido.GolesVisit, Prediccion.GolesLocal as GolesLocalPredichos, Prediccion.GolesVisitante, Score, Equipo.Nombre Local, Equipo.ImgPath LocalPath, a.Nombre Visitante, a.ImgPath VisitantePath, Usuario.Nombre, Prediccion.Resultado FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID  inner join Equipo a on a.EquipoID = Partido.VisitanteID  inner join Prediccion on Partido.PartidoID=Prediccion.PartidoID inner join Usuario on Prediccion.UsuarioID=Usuario.UsuarioID  ORDER BY Partido.PartidoID '
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})

app.get('/api/predicciones', (req, res) => {
  const sql =
    'SELECT PrediccionID, Prediccion.GolesLocal, Prediccion.GolesVisitante, Resultado, Usuario.Nombre, Partido.PartidoID, Partido.UTCDATE, Prediccion.Matchday, Prediccion.Puntos FROM Prediccion inner join Usuario on Prediccion.UsuarioID = Usuario.UsuarioID inner join Partido on Prediccion.PartidoID = Partido.PartidoID ORDER BY Partido.PartidoID'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/torneos', (req, res) => {
  const sql = 'SELECT * FROM Torneo ORDER BY Nombre'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/rankings', (req, res) => {
  const sql =
    "SELECT RankingID, Ranking.Puntos, Usuario.Nombre Usuario, Torneo.Nombre Torneo, Usuario.UsuarioID FROM Ranking inner join Usuario on Ranking.UsuarioID = Usuario.UsuarioID inner join Torneo on Ranking.TorneoID = Torneo.TorneoID ORDER by Ranking.Puntos DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});
app.get("/api/logros", (req, res) => {
  const sql = "SELECT * FROM Logros ORDER BY LogroID";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.get("/api/logrosXUser", (req, res) => {
  const sql = "SELECT DISTINCT LogroID, UsuarioID FROM LogrosXUser ORDER BY UsuarioID";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
});


// ------------------------ GET uno en especifico -------------------------------------

app.get('/api/partidos/:id', (req, res) => {
  const id = req.params.id
  const sql =
    'SELECT PartidoID, Matchday, UTCDATE, GolesLocal, GolesVisit, Score, Equipo.Nombre Local, Equipo.ImgPath LocalPath, a.Nombre Visitante, a.ImgPath VisitantePath FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID inner join Equipo a on a.EquipoID = Partido.VisitanteID WHERE PartidoID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/equipos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM Equipo WHERE EquipoID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/usuarios/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM Usuario WHERE UsuarioID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/predicciones/:id', (req, res) => {
  const id = req.params.id
  const sql =
    'SELECT PrediccionID, Prediccion.GolesLocal, Prediccion.GolesVisitante, Resultado, Usuario.Nombre, Partido.PartidoID, Partido.UTCDATE FROM Prediccion inner join Usuario on Prediccion.UsuarioID = Usuario.UsuarioID inner join Partido on Prediccion.PartidoID = Partido.PartidoID WHERE PrediccionID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/torneos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT * FROM Torneo WHERE TorneoID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
});
app.get("/api/allTorneos/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT Torneo.TorneoID, Torneo.Nombre FROM Torneo inner join Ranking on Torneo.TorneoID = Ranking.TorneoID INNER JOIN Usuario on Usuario.UsuarioID = Ranking.UsuarioID WHERE Usuario.UsuarioID = ? GROUP by Torneo.TorneoID";
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})
app.get('/api/rankings/:id', (req, res) => {
  const id = req.params.id
  const sql =

    "SELECT DISTINCT RankingID, Ranking.Puntos, count(case when Prediccion.Puntos = 1 then 1 else null end) as Aciertos, count(case when Prediccion.Puntos = 0 then 1 else null end) as Fallos, count(case when Prediccion.Puntos = 3 then 1 else null end) as Perfect, Usuario.Nombre Usuario, Usuario.UsuarioID, Torneo.Nombre Torneo FROM Ranking inner join Usuario on Ranking.UsuarioID = Usuario.UsuarioID inner join Torneo on Ranking.TorneoID = Torneo.TorneoID LEFT JOIN Prediccion on Usuario.UsuarioID = Prediccion.UsuarioID WHERE Torneo.TorneoID = ? Group by Usuario.Nombre ORDER by Ranking.Puntos DESC";
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});
app.get("/api/logros/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT * FROM Logros INNER JOIN LogrosXUser on Logros.LogroID = LogrosXUser.LogroID INNER JOIN Usuario on Usuario.UsuarioID = LogrosXUser.UsuarioID WHERE LogrosXUser.UsuarioID = ? ORDER BY LogroID";
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.get("/api/historialAciertos/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "SELECT Usuario.Nombre,  count(case when Prediccion.Puntos = 1 then 1 else null end) as Aciertos, count(case when Prediccion.Puntos = 0 then 1 else null end) as Fallos, count(case when Prediccion.Puntos = 3 then 1 else null end) as Perfect, count(Prediccion.UsuarioID) as Total FROM Prediccion inner join Usuario on Prediccion.UsuarioID = Usuario.UsuarioID where Usuario.UsuarioID = ?";

  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})


// ----------------------------- POST ----------------------------------

app.post('/api/partidos', (req, res) => {
  const sql =
    'INSERT INTO Partido (GolesLocal, GolesVisit, UTCDATE, Score, LocalID, VisitanteID, Matchday) VALUES (?, ?, ?, ?, ?, ?, ?)'
  const partido = [
    req.body.GolesLocal,
    req.body.GolesVisit,
    req.body.Utcdate,
    req.body.Score,
    req.body.LocalID,
    req.body.VisitanteID,
    req.body.Matchday
  ]
  db.run(sql, partido, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: partido
      })
    }
  })
})
app.post('/api/equipos', (req, res) => {
  const sql = 'INSERT INTO Equipo (Nombre, ImgPath) VALUES (?, ?)'
  const equipo = [req.body.Nombre, req.body.ImgPath]
  db.run(sql, equipo, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: equipo
      })
    }
  })
})
app.post('/api/usuarios', (req, res) => {
  const sql = 'INSERT INTO Usuario (Nombre) VALUES (?)'
  const usuario = [req.body.Nombre]
  db.run(sql, usuario, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: usuario
      })
    }
  })
})
app.post('/api/predicciones', (req, res) => {
  const sql =
    'INSERT INTO Prediccion (Resultado, PartidoID, UsuarioID, Matchday, GolesLocal, GolesVisitante) VALUES (?, ?, ?, ?, ?, ?)'
  const predict = [
    req.body.Resultado,
    req.body.PartidoID,
    req.body.UsuarioID,
    req.body.Matchday,
    req.body.GolesLocal,
    req.body.GolesVisitante
  ]
  db.run(sql, predict, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: predict
      })
    }
  })
})
app.post('/api/torneos', (req, res) => {
  const sql =
    'INSERT INTO Torneo (Nombre, UsuarioCreador, FechaCreacion) VALUES (?, ?, ?)'
  const torneo = [
    req.body.Nombre,
    req.body.UsuarioCreador,
    req.body.FechaCreacion
  ]
  db.run(sql, torneo, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: torneo
      })
    }
  })
})
app.post('/api/solicitudes', (req, res) => {
  const sql =
    'INSERT INTO Solicitud (TorneoID, UsuarioID) VALUES (?, ?)'
  const solicitud = [
    req.body.TorneoID,
    req.body.UsuarioID
  ]
  db.run(sql, solicitud, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: solicitud
      })
    }
  })
})
app.post('/api/rankings', (req, res) => {
  const sql =
    'INSERT INTO Ranking (Puntos, TorneoID, UsuarioID) VALUES (?, ?, ?)'
  const ranking = [req.body.Puntos, req.body.TorneoID, req.body.UsuarioID]
  db.run(sql, ranking, function (err, result) {
    if (err) {
      return console.error(err.message)
    } else {
      res.status(201).json({
        id: this.lastID,
        data: ranking
      })
    }
  })
})

app.post("/api/logrosXUser", (req, res) => {
  const sql = "INSERT INTO LogrosXUser (UsuarioID, LogroID) VALUES (?, ?)";
  const logroUser = [req.body.UsuarioID, req.body.LogroID];
  db.run(sql, logroUser, function (err, result) {
    if (err) {
      return console.error(err.message);
    }
  });
});

// ------------------------------- PUT editar/id --------------------------

app.put('/api/partidos/:id', (req, res) => {
  const id = req.params.id
  const partido = [
    req.body.GolesLocal,
    req.body.GolesVisit,
    req.body.Utcdate,
    req.body.Score,
    req.body.LocalID,
    req.body.VisitanteID,
    req.body.Matchday,
    id
  ]
  const sql =
    'UPDATE Partido SET GolesLocal = ?, GolesVisit = ?, UTCDATE = ?, Score = ?, LocalID = ?, VisitanteID = ?, Matchday = ?, WHERE (PartidoID = ?)'
  db.run(sql, partido, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(partido)
  })
})
app.put('/api/equipos/:id', (req, res) => {
  const id = req.params.id
  const equipo = [req.body.Nombre, req.body.ImgPath, id]
  const sql = 'UPDATE Equipo SET Nombre = ?, ImgPath = ? WHERE (EquipoID = ?)'
  db.run(sql, equipo, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(equipo)
  })
})
app.put('/api/usuarios/:id', (req, res) => {
  const id = req.params.id
  const usuario = [req.body.Nombre, id]
  const sql = 'UPDATE Usuario SET Nombre = ? WHERE (UsuarioID = ?)'
  db.run(sql, usuario, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(usuario)
  })
})
app.put('/api/predicciones/:id', (req, res) => {
  const id = req.params.id
  const predict = [
    req.body.Resultado,
    req.body.PartidoID,
    req.body.UsuarioID,
    req.body.Matchday,
    req.body.GolesLocal,
    req.body.GolesVisitante,
    id
  ]
  const sql =
    'UPDATE Equipo SET Resultado = ?, PartidoID = ?, UsuarioID = ?, Matchday = ?, GolesLocal = ?, GolesVisitante = ? WHERE (PrediccionID = ?)'
  db.run(sql, predict, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(predict)
  })
})
app.put('/api/torneos/:id', (req, res) => {
  const id = req.params.id
  const torneo = [
    req.body.Nombre,
    req.body.FechaCreacion,
    req.body.UsuarioCreador,
    id
  ]
  const sql =
    'UPDATE Torneo SET Nombre = ?, FechaCreacion = ?, UsuarioCreador = ? WHERE (TorneoID = ?)'
  db.run(sql, torneo, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(torneo)
  })
})
app.put('/api/rankings/:id', (req, res) => {
  const id = req.params.id
  const ranking = [req.body.Puntos, req.body.TorneoID, req.body.UsuarioID, id]
  const sql =
    'UPDATE Ranking SET Puntos = ?, TorneoID = ?, UsuarioID = ? WHERE (RankingID = ?)'
  db.run(sql, ranking, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(ranking)
  })
})

app.put("/api/logros/:id", (req, res) => {
  const id = req.params.id;
  const logros = [req.body.NombreLogro, req.body.ImgPath, req.body.Frase, req.body.Otorgado, id];
  const sql =
    "UPDATE Logros SET NombreLogro = ?, ImgPath = ?, Frase = ?, Otorgado = ? WHERE (LogroID = ?)";
  db.run(sql, logros, (err) => {
    if (err) {
      return console.error(err.message);
    }
    res.status(200).json(logros);
  });
});

// ---------------------------- DELETE delete/id ----------------------------

app.delete('/api/partidos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Partido WHERE PartidoID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/equipos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Equipo WHERE EquipoID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/usuarios/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Usuario WHERE UsuarioID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/predicciones/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Prediccion WHERE PrediccionID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/torneos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Torneo WHERE TorneoID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/solicitudes/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Solicitud WHERE SolicitudID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/rankings/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Ranking WHERE RankingID = ?'
  db.run(sql, id, (err) => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
// ----------------------------------Cargamos los equipos a la BBDD-------------------------------------

axios
  .get(
    'https://api.football-data.org/v2/competitions/CL/teams?stage=GROUP_STAGE&season=2021',
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '4ac84deb5017487bb0c57a298189ee60'
      }
    }
  )
  .then((res) => {
    res.data.teams.map((x) => {
      const sql =
        'INSERT or REPLACE INTO Equipo (EquipoID, Nombre, ImgPath) VALUES (?, ?, ?)'
      const equipo = [x.id, x.shortName, x.crestUrl]
      db.run(sql, equipo, function (err, result) {
        if (err) {
          return console.error(err.message)
        }
      })
    })
  })
  .catch(() => console.log('error'))

axios
  .get(
    'https://api.football-data.org/v2/competitions/CL/matches?stage=GROUP_STAGE',
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '4ac84deb5017487bb0c57a298189ee60'
      }
    }
  )
  .then((res) => {
    res.data.matches.map((x) => {
      const sql =
        'INSERT or REPLACE INTO Partido (PartidoID, GolesLocal, GolesVisit, UTCDATE, Score, LocalID, VisitanteID, Matchday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      const partido = [
        x.id,
        x.score.fullTime.homeTeam,
        x.score.fullTime.awayTeam,
        x.utcDate,
        x.score.winner,
        x.homeTeam.id,
        x.awayTeam.id,
        x.matchday
      ]
      db.run(sql, partido, function (err, result) {
        if (err) {
          return console.error(err.message)
        }
      })
    })
  })
  .catch(() => console.log('error'))

// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------Sumamos los puntos cuando se levanta la BBDD-------------------------------------
function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function demo () {
  const creaTabla = `
    CREATE TABLE IF NOT EXISTS Variables (Usuario TEXT, Puntos INTEGER);`
  db.run(creaTabla, function (err, result) {
    if (err) {
      return console.error(err.message)
    }
  })
  await sleep(1000)
  const insertTabla1 = `
  INSERT INTO Variables (Usuario, Puntos) 
  SELECT Usuario.Nombre, SUM(Puntos) AS Puntos
  FROM  Usuario INNER JOIN Prediccion ON Usuario.UsuarioID = Prediccion.UsuarioID
  GROUP BY Usuario.UsuarioID;`
  await sleep(1000)
  db.run(insertTabla1, function (err, result) {
    if (err) {
      return console.error(err.message)
    }
  })
  const insertTabla2 = `
  INSERT OR REPLACE INTO Ranking
  SELECT RankingID, ifNull(Variables.Puntos,0) AS Puntos, TorneoID, Usuario.UsuarioID 
  FROM Ranking INNER JOIN Usuario ON Ranking.RankingID = Usuario.UsuarioID 
  LEFT JOIN Variables ON Usuario.Nombre = Variables.Usuario;`
  await sleep(1000)
  db.run(insertTabla2, function (err, result) {
    if (err) {
      return console.error(err.message)
    }
  })
  const eliminaTabla = `
    DROP TABLE Variables;`
  db.run(eliminaTabla, function (err, result) {
    if (err) {
      return console.error(err.message)
    }
  })
}
demo()

async function demo2() {
  const creaTabla2 = `
    CREATE TABLE IF NOT EXISTS Variables2 (UsuarioID INTEGER, TorneoID INTEGER, Puntos INTEGER);`;
  db.run(creaTabla2, function (err, result) {
    if (err) {
      return console.error(err.message);
    }
  });
  await sleep(1000);
  const insertTabla12 = `
  INSERT INTO Variables2 (UsuarioID, TorneoID, Puntos) 
  SELECT Usuario.UsuarioID, Torneo.TorneoID, SUM(Case when Prediccion.Matchday >= Torneo.FechaCreacion Then Puntos Else null End) AS Puntos
  FROM Usuario INNER JOIN Prediccion ON Usuario.UsuarioID = Prediccion.UsuarioID inner join Torneo on Usuario.UsuarioID = Torneo.UsuarioCreador
  GROUP BY Usuario.UsuarioID;`;
  await sleep(1000);
  db.run(insertTabla12, function (err, result) {
    if (err) {
      return console.error(err.message);
    }
  });

  const insertTabla22 = `
  INSERT OR REPLACE INTO Ranking (RankingID, Puntos, TorneoID, UsuarioID)
  SELECT Ranking.RankingID, ifNull(Variables2.Puntos,0) AS Puntos, Variables2.TorneoID, Variables2.UsuarioID
  From Ranking inner JOIN Variables2 ON (Ranking.TorneoID = Variables2.TorneoID and Ranking.UsuarioID = Variables2.UsuarioID)
  where Variables2.TorneoID > 1`;
  await sleep(1000);
  db.run(insertTabla22, function (err, result) {
    if (err) {
      return console.error(err.message);
    }
  });
  const eliminaTabla2 = `
    DROP TABLE Variables2;`;
  db.run(eliminaTabla2, function (err, result) {
    if (err) {
      return console.error(err.message);
    }
  });
}
demo2();

// ----------------------------------------------------------------------------

// ----------------------------------Asigna puntos segun si le pegó o no------------------------------------------
const asignaPuntos = `
INSERT OR REPLACE INTO Prediccion 
SELECT Prediccion.PrediccionID, Prediccion.Resultado, Prediccion.PartidoID, Prediccion.UsuarioID, 
            CASE 
            WHEN Prediccion.Resultado = Partido.Score
            THEN  CASE  
                    WHEN (Prediccion.GolesLocal = Partido.GolesLocal AND Prediccion.GolesVisitante = Partido.GolesVisit)
                    THEN 3
                    WHEN (Prediccion.GolesLocal != Partido.GolesLocal OR Prediccion.GolesVisitante != Partido.GolesVisit)
                    THEN 1
                    END
            WHEN Prediccion.Resultado != Partido.Score
            THEN 0
            END AS Puntos, Partido.Matchday, Prediccion.GolesLocal, Prediccion.GolesVisitante
FROM Prediccion INNER JOIN Partido ON Prediccion.PartidoID = Partido.PartidoID;`
db.run(asignaPuntos, function (err, result) {
  if (err) {
    return console.error(err.message)
  }
})

// -------------------------------- Asignación de Puerto------------------------
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
