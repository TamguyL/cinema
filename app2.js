const express = require("express");
const bcrypt = require("bcryptjs");
const session = require('express-session')
const app = express();
const pool = require('mysql2/promise').createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mcdcinema',
  multipleStatements: true,
});
const user = require('./routes/user')
const film = require('./routes/film')
const acteur = require('./routes/acteur')


app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 8640000 } }))
app.set("view engine", "ejs");
app.use(function (req, res, next) { res.locals.user = req.session.user; next(); });

app.use("/acteur", acteur)
app.use("/film", film)
app.use('/user', user)




// //----------------------------------------------------------------
// // -- affiche la liste des films 
// app.get('/listefilms', function (req, res) {
//   pool.getConnection()
//     .then((conn) => {
//       const res = conn.query('SELECT * FROM film');
//       conn.release();
//       return res;
//     })
//     .then((listefilm) => {
//       res.render('listefilms', { film: listefilm[0] })
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })
// //----------------------------------------------------------------
// // -- affiche le detail d'un film 
// app.get('/detailfilm/:id', function (req, res) {

//   pool.getConnection()
//     .then((conn) => {
//       const res = conn.query('SELECT * FROM film WHERE id_film= ?', [req.params.id]);
//       conn.release();
//       console.log(res)
//       return res;
//     })
//     .then((detailfilm) => {
//       console.log(detailfilm[0][0]);
//       res.render('detailfilm', { film: detailfilm[0][0] })
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

// //----------------------------------------------------------------
// // -- affiche le formulaire de CREATION film 
// app.get("/creafilm", function (req, res) {
//   pool.getConnection()
//     .then((conn) => {
//       const result = conn.query(
//         {
//           sql: 'SELECT * FROM realisateur;SELECT * FROM genre',
//           rowsAsArray: false,
//         },
//       );
//       conn.release();
//       return result;
//     })
//     .then((creafilm) => {
//       res.render('creafilm', { realisateur: creafilm[0][0], genre: creafilm[0][1] })
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })
// app.post("/creafilm", function (req, res) {
//   let titre = req.body.titre;
//   let description = req.body.description;
//   let affiche = req.body.affiche;
//   let realisateur = req.body.realisateur;
//   let genre = req.body.genre;

//   pool.getConnection()
//     .then((conn) => {
//       const result = conn.query(
//         "INSERT INTO film (titre,affiche,description,id_genre,id_realisateur) VALUES (?,?,?,?,?)",
//         [
//           titre,
//           affiche,
//           description,
//           genre,
//           realisateur,
//         ],
//       );
//       conn.release();
//       return result;
//     })
//     .then(() => {
//       console.log('film ajouter')
//       res.redirect('listefilms');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })

// //----------------------------------------------------------------
// // -- affiche le formulaire de MODIFICATION film
// app.get("/modiffilm/:id", function (req, res) {

//   pool.getConnection()
//     .then((conn) => {
//       const result = conn.query(
//         {
//           sql: 'SELECT * FROM film WHERE id_film= ?;SELECT * FROM realisateur;SELECT * FROM genre',
//           rowsAsArray: false,
//         }, [req.params.id]
//       );
//       conn.release();
//       return result;
//     })
//     .then((modiffilm) => {
//       console.log(modiffilm[0][1][0])
//       res.render('modiffilm', { film: modiffilm[0][0][0], realisateur: modiffilm[0][1], genre: modiffilm[0][2] })
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })
// app.post("/modiffilm", function (req, res) {
//   let id = req.body.id
//   let titre = req.body.titre;
//   let description = req.body.description;
//   let affiche = req.body.affiche;
//   let realisateur = req.body.realisateur;
//   let genre = req.body.genre;

//   pool.getConnection()
//     .then((conn) => {
//       const result = conn.query(
//         "UPDATE film SET titre = ?, affiche = ?, description = ?, Id_realisateur = ?, Id_genre = ? WHERE film.id_film = ? ",
//         [
//           titre,
//           affiche,
//           description,
//           realisateur,
//           genre,
//           id,
//         ],
//       );
//       conn.release();
//       return result;
//     })
//     .then(() => {
//       console.log('film modifier')
//       res.redirect('listefilms');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })


// //----------------------------------------------------------------
// // -- SUPPRIME un film 
// app.get('/supprfilm/:id', function (req, res) {

//   pool.getConnection()
//     .then((conn) => {
//       const result = conn.query('DELETE FROM film WHERE film.id_film = ?', [req.params.id]);
//       conn.release();
//       // console.log(res)
//       return result;
//     })
//     .then(() => {
//       res.redirect('/listefilms');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })



// //--------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------
// // NE FONCTIONNE PAS A METTRE EN PROMISE PUIS FAIRE DES SESSION DANS CHAQUES PAGES
// //--------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------


// ----------------------------- USER-----------------------------
//----------------------------------------------------------------
// -- connection
app.get('/connect', function (req, res) { res.render('connect') })
app.post("/profil/", function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query("SELECT * FROM `users` WHERE `email` = ?", [req.body.email],);
      conn.release();
      return result;
    })
    .then((result) => {
      if (bcrypt.compareSync(req.body.password, result[0][0].password)) {
        req.session.user = result[0][0]
        res.render('profil', { users: result[0][0] });
      } else {
        res.render('authfail');
      }
    })
    .catch(() => {
      res.render('authfail');
    });
})

// //----------------------------------------------------------------
// // -- formulaire de MODIFICATION user
app.get("/usermodif/:id", function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query('SELECT * FROM users WHERE id= ?', [req.params.id]);
      conn.release();
      return result;
    })
    .then((result) => {
      res.render('usermodif', { users: result[0][0] })
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/usermodif", function (req, res) {
  let id = req.body.id
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let email = req.body.email;

  if (bcrypt.compareSync(req.body.password, req.body.idpass)) {
    pool.getConnection()
      .then((conn) => {
        const result = conn.query(
          "UPDATE `users` SET nom = ?, prenom = ?, email = ? WHERE users.id = ?",
          [
            nom,
            prenom,
            email,
            id,
          ],
        );
        conn.release();
        return result;
      })
      .then(() => {
        res.redirect('/usermodif/' + id);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send('Erreur !<br><a href="/connect"><button>Retour à la connexion</button>')
  }
});

// //----------------------------------------------------------------
// // -- SUPPRIME un utilisateur
app.get('/usersuppr/:id', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query('DELETE FROM users WHERE users.id = ?', [req.params.id]);
      conn.release();
      return result;
    })
    .then((result) => {
      res.redirect('/connect');

    })
    .catch((err) => {
      console.log(err);
    });
})

  // //----------------------------------------------------------------
  // // -- Ajoute un nouvel utilisateur
  // app.get("/newuser", function (req, res) {
  //     res.render('newuser')
  // })
  // app.post("/newuser", function (req, res) {
  //     pool.getConnection(function (err, connection) {
  //         if (err) {
  //             return cb(err);
  //         }
  //         let nom = req.body.nom;
  //         let prenom = req.body.prenom;
  //         let email = req.body.email;
  //         let password = req.body.password;
  //         let newu ="INSERT INTO `users` (nom,prenom,email,password) VALUES (?,?,?,?)";
  //         var salt = bcrypt.genSaltSync(10);
  //         var hash = bcrypt.hashSync(password, salt);
  //         connection.query(newu,
  //             [
  //                 nom,
  //                 prenom,
  //                 email,
  //                 hash,
  //             ],
  //             function (err) {
  //                 if (err) console.log(err);
  //                 connection.release();
  //                 res.send(`Enregistré!<br> <a href="/connect"><button>Retour</button></a>`);
  //             });
  //     });
  // });



  app.listen(8088, () => console.log('lancer sur le port 8088'))
