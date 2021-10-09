const express = require('express') // lo importamos
const app = express() // representa a la aplicacion
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

// nos conectamos a la db
const db_name = path.join(__dirname, 'data', 'apptest.db')
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message)
  }
  console.log("Successful connection to the database 'apptest.db'")
})

// Creamos la tabla si no existe
var sql_create = `CREATE TABLE IF NOT EXISTS Partido(
  PartidoID INTEGER PRIMARY KEY AUTOINCREMENT,
  GolesLocal INTEGER NOT NULL,
  GolesVisit INTEGER NOT NULL,
  UTCDATE TEXT,
  Score TEXT,
  LocalID INTEGER,
  VisitanteID INTEGER,
  FOREIGN KEY (LocalID) REFERENCES Equipo(EquipoID),
  FOREIGN KEY (VisitanteID) REFERENCES Equipo(EquipoID)
  );`
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message)
  }

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
})
// })

// Creamos la tabla si no existe
var sql_create = `CREATE TABLE IF NOT EXISTS Equipo (
  EquipoID INTEGER PRIMARY KEY AUTOINCREMENT,
  Nombre TEXT NOT NULL, 
  ImgPath TEXT
);`
db.run(sql_create, err => {
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
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message)
  }

  /* Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Usuario (UsuarioID, Nombre) VALUES
    (1, 'Messi'),
    (2, 'Neymar')`
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
  FOREIGN KEY (PartidoID) REFERENCES Partido(PartidoID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
  );`
db.run(sql_create, err => {
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
  Nombre TEXT NOT NULL
  );`
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message)
  }

  /* / Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Torneo (TorneoID, Nombre) VALUES
    (1, 'Global Champions League')`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  }) */
})
var sql_create = `CREATE TABLE IF NOT EXISTS Ranking(
  RankingID INTEGER PRIMARY KEY AUTOINCREMENT,
  Puntos INTEGER NOT NULL,
  TorneoID INTEGER,
  UsuarioID INTEGER,
  FOREIGN KEY (TorneoID) REFERENCES Torneo(TorneoID),
  FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
  );`
db.run(sql_create, err => {
  if (err) {
    return console.error(err.message)
  }

  /* / Database seeding, esto desp lo sacamos
  const sql_insert = `INSERT INTO Ranking (RankingID, Puntos, TorneoID, UsuarioID) VALUES
    (1, 10, 1, 1),
    (2, 5, 1, 2)`
  db.run(sql_insert, err => {
    if (err) {
      return console.error(err.message)
    }
  }) */
})

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

// --------------------------- GET all -------------------------------

app.get('/api/partidos', (req, res) => {
  const sql = 'SELECT PartidoID, UTCDATE, GolesLocal, GolesVisit, Score, Equipo.Nombre Local, Equipo.ImgPath LocalPath, a.Nombre Visitante, a.ImgPath VisitantePath FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID inner join Equipo a on a.EquipoID = Partido.VisitanteID ORDER BY UTCDATE'
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
app.get('/api/predicciones', (req, res) => {
  const sql = 'SELECT PrediccionID, Resultado, Usuario.Nombre, Partido.PartidoID, Partido.UTCDATE FROM Prediccion inner join Usuario on Prediccion.UsuarioID = Usuario.UsuarioID inner join Partido on Prediccion.PartidoID = Partido.PartidoID ORDER BY Partido.PartidoID'
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
  const sql = 'SELECT RankingID, Puntos, Usuario.Nombre Usuario, Torneo.Nombre Torneo FROM Ranking inner join Usuario on Ranking.UsuarioID = Usuario.UsuarioID inner join Torneo on Ranking.TorneoID = Torneo.TorneoID ORDER BY Ranking.Puntos DESC'
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})

// ------------------------ GET uno en especifico -------------------------------------

app.get('/api/partidos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT PartidoID, UTCDATE, GolesLocal, GolesVisit, Score, Equipo.Nombre Local, Equipo.ImgPath LocalPath, a.Nombre Visitante, a.ImgPath VisitantePath FROM Partido inner join Equipo on Equipo.EquipoID = Partido.LocalID inner join Equipo a on a.EquipoID = Partido.VisitanteID WHERE PartidoID = ?'
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
  const sql = 'SELECT PrediccionID, Resultado, Usuario.Nombre, Partido.PartidoID, Partido.UTCDATE FROM Prediccion inner join Usuario on Prediccion.UsuarioID = Usuario.UsuarioID inner join Partido on Prediccion.PartidoID = Partido.PartidoID WHERE PrediccionID = ?'
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
    res.json(rows)
  })
})
app.get('/api/rankings/:id', (req, res) => {
  const id = req.params.id
  const sql = 'SELECT RankingID, Puntos, Usuario.Nombre Usuario, Torneo.Nombre Torneo FROM Ranking inner join Usuario on Ranking.UsuarioID = Usuario.UsuarioID inner join Torneo on Ranking.TorneoID = Torneo.TorneoID WHERE RankingID = ?'
  db.all(sql, id, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows)
  })
})

// ----------------------------- POST ----------------------------------

app.post('/api/partidos', (req, res) => {
  const sql = 'INSERT INTO Partido (GolesLocal, GolesVisit, UTCDATE, Score, LocalID, VisitanteID) VALUES (?, ?, ?, ?, ?, ?)'
  const partido = [req.body.GolesLocal, req.body.GolesVisit, req.body.Utcdate, req.body.Score, req.body.LocalID, req.body.VisitanteID]
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
  const sql = 'INSERT INTO Prediccion (Resultado, PartidoID, UsuarioID) VALUES (?, ?, ?)'
  const predict = [req.body.Resultado, req.body.PartidoID, req.body.UsuarioID]
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
  const sql = 'INSERT INTO Torneo (Nombre) VALUES (?)'
  const torneo = [req.body.Nombre]
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
app.post('/api/rankings', (req, res) => {
  const sql = 'INSERT INTO Ranking (Puntos, TorneoID, UsuarioID) VALUES (?, ?, ?)'
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

// ------------------------------- PUT editar/id --------------------------

app.put('/api/partidos/:id', (req, res) => {
  const id = req.params.id
  const partido = [req.body.GolesLocal, req.body.GolesVisit, req.body.Utcdate, req.body.Score, req.body.LocalID, req.body.VisitanteID, id]
  const sql = 'UPDATE Partido SET GolesLocal = ?, GolesVisit = ?, UTCDATE = ?, Score = ?, LocalID = ?, VisitanteID = ? WHERE (PartidoID = ?)'
  db.run(sql, partido, err => {
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
  db.run(sql, equipo, err => {
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
  db.run(sql, usuario, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(usuario)
  })
})
app.put('/api/predicciones/:id', (req, res) => {
  const id = req.params.id
  const predict = [req.body.Resultado, req.body.PartidoID, req.body.UsuarioID, id]
  const sql = 'UPDATE Equipo SET Resultado = ?, PartidoID = ?, UsuarioID = ? WHERE (PrediccionID = ?)'
  db.run(sql, predict, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(predict)
  })
})
app.put('/api/torneos/:id', (req, res) => {
  const id = req.params.id
  const torneo = [req.body.Nombre, id]
  const sql = 'UPDATE Torneo SET Nombre = ? WHERE (TorneoID = ?)'
  db.run(sql, torneo, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(torneo)
  })
})
app.put('/api/rankings/:id', (req, res) => {
  const id = req.params.id
  const ranking = [req.body.Puntos, req.body.TorneoID, req.body.UsuarioID, id]
  const sql = 'UPDATE Ranking SET Puntos = ?, TorneoID = ?, UsuarioID = ? WHERE (RankingID = ?)'
  db.run(sql, ranking, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(ranking)
  })
})

// ---------------------------- DELETE delete/id ----------------------------

app.delete('/api/partidos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Partido WHERE PartidoID = ?'
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/equipos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Equipo WHERE EquipoID = ?'
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/usuarios/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Usuario WHERE UsuarioID = ?'
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/predicciones/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Prediccion WHERE PrediccionID = ?'
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/torneos/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Torneo WHERE TorneoID = ?'
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})
app.delete('/api/rankings/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Ranking WHERE RankingID = ?'
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message)
    }
    res.status(200).json(id)
  })
})

// ----------------------------------------------------------------------------

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
