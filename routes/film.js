const express = require("express");
const session = require('express-session')
const app = express.Router();
// const router = express.Router()
const pool = require('mysql2/promise').createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mcdcinema',
  multipleStatements: true,
});

app.use(timeLog)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 8640000 } }))
app.use(function (req, res, next) { res.locals.user = req.session.user; next(); });





//----------------------------------------------------------------
// -- affiche la liste des films 
app.get('/listefilms', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query('SELECT * FROM film');
      conn.release();
      return res;
    })
    .then((listefilm) => {
      res.render('listefilms', { film: listefilm[0] })
    })
    .catch((err) => {
      console.log(err);
    });
})
//----------------------------------------------------------------
// -- affiche le detail d'un film 
app.get('/detailfilm/:id', function (req, res) {

  pool.getConnection()
    .then((conn) => {
      const res = conn.query('SELECT * FROM film WHERE id_film= ?', [req.params.id]);
      conn.release();
      console.log(res)
      return res;
    })
    .then((detailfilm) => {
      console.log(detailfilm[0][0]);
      res.render('detailfilm', { film: detailfilm[0][0] })
    })
    .catch((err) => {
      console.log(err);
    });
})

//----------------------------------------------------------------
// -- affiche le formulaire de CREATION film 
app.get("/creafilm", function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        {
          sql: 'SELECT * FROM realisateur;SELECT * FROM genre',
          rowsAsArray: false,
        },
      );
      conn.release();
      return result;
    })
    .then((creafilm) => {
      res.render('creafilm', { realisateur: creafilm[0][0], genre: creafilm[0][1] })
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/creafilm", function (req, res) {
  let titre = req.body.titre;
  let description = req.body.description;
  let affiche = req.body.affiche;
  let realisateur = req.body.realisateur;
  let genre = req.body.genre;

  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        "INSERT INTO film (titre,affiche,description,id_genre,id_realisateur) VALUES (?,?,?,?,?)",
        [
          titre,
          affiche,
          description,
          genre,
          realisateur,
        ],
      );
      conn.release();
      return result;
    })
    .then(() => {
      console.log('film ajouter')
      res.redirect('listefilms');
    })
    .catch((err) => {
      console.log(err);
    });
})

//----------------------------------------------------------------
// -- affiche le formulaire de MODIFICATION film
app.get("/modiffilm/:id", function (req, res) {

  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        {
          sql: 'SELECT * FROM film WHERE id_film= ?;SELECT * FROM realisateur;SELECT * FROM genre',
          rowsAsArray: false,
        }, [req.params.id]
      );
      conn.release();
      return result;
    })
    .then((modiffilm) => {
      console.log(modiffilm[0][1][0])
      res.render('modiffilm', { film: modiffilm[0][0][0], realisateur: modiffilm[0][1], genre: modiffilm[0][2] })
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/modiffilm", function (req, res) {
  let id = req.body.id
  let titre = req.body.titre;
  let description = req.body.description;
  let affiche = req.body.affiche;
  let realisateur = req.body.realisateur;
  let genre = req.body.genre;

  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        "UPDATE film SET titre = ?, affiche = ?, description = ?, Id_realisateur = ?, Id_genre = ? WHERE film.id_film = ? ",
        [
          titre,
          affiche,
          description,
          realisateur,
          genre,
          id,
        ],
      );
      conn.release();
      return result;
    })
    .then(() => {
      console.log('film modifier')
      res.redirect('listefilms');
    })
    .catch((err) => {
      console.log(err);
    });
})


//----------------------------------------------------------------
// -- SUPPRIME un film 
app.get('/supprfilm/:id', function (req, res) {

  pool.getConnection()
    .then((conn) => {
      const result = conn.query('DELETE FROM film WHERE film.id_film = ?', [req.params.id]);
      conn.release();
      // console.log(res)
      return result;
    })
    .then(() => {
      res.redirect('/listefilms');
    })
    .catch((err) => {
      console.log(err);
    });
})
