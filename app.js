const express = require("express");
const bcrypt = require("bcryptjs");
const session = require('express-session')
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const path = require('path');
const app = express();

const pool = require('mysql2/promise').createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mcdcinema',
  multipleStatements: true,
});
const dotenv = require('dotenv')


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 8640000 } }))
app.set("view engine", "ejs");
app.use(function (req, res, next) { res.locals.user = req.session.user; next(); });



// ----------------------------- Acceuil-----------------------------
// ----------------------------------------------------------------
app.get('/', function (req, res) { res.render('connect') })
app.post("/connect/", function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query("SELECT * FROM `users` WHERE `email` = ?", [req.body.email],);
      conn.release();
      return result;
    })
    .then((result) => {
      if (bcrypt.compareSync(req.body.password, result[0][0].password)) {
        req.session.user = result[0][0]
        res.render('bienvenue', { users: result[0][0] });
      } else {
        res.render('authfail');
      }
    })
    .catch(() => {
      res.render('authfail');
    });
})

// ----------------------------- Ajout-----------------------------
// ----------------------------------------------------------------
app.get('/ajout', function (req, res) { res.render('ajout') })
//-----------------------------------------------------------------
// -- crée acteur 
app.get('/creaacteur', function (req, res) {
    pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        {
          sql: 'SELECT * FROM acteur;SELECT * FROM film;SELECT * FROM joue',
          rowsAsArray: false,
        },
      );
        conn.release();
        return result;
      })
      .then((retour) => {
        res.render('creaacteur', { acteur: retour[0][0], film : retour[0][1], joue : retour[0][2]})
      })
      .catch((err) => {
        console.log(err);
      });
});
app.post("/creaacteur", upload.single('upload'), function (req, res) {
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let photo = req.file.filename;
  let film = req.body.film;
  
  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        "INSERT INTO acteur (nom,prenom,photo) VALUES (?,?,?)",
        [
          nom,
          prenom,
          photo,
        ],
      );
      conn.release();
      return result;
    })
    .then(() => {
      console.log('Acteur ajouter')
      res.redirect('creaacteur');
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/modifacteur", upload.single('upload'), function (req, res) {
  let id = req.body.idmodif;
  let nom = req.body.nommodif;
  let prenom = req.body.prenommodif;
  let photo = req.file.filename;
  let filmcheck = req.body.checkfilm
  // console.log(req.body.checkfilm)

  if (req.body.actionto == 'Modifier') {
    pool.getConnection()
      .then((conn) => {
        const result = conn.query(
           "UPDATE acteur SET nom = ?, prenom = ?, photo = ? WHERE acteur.id_acteur = ?",
          [
            nom,
            prenom,
            photo,
            id,
          ]
        );
        conn.query("DELETE FROM joue WHERE joue.Id_acteur = ?", [id,])
        if (Array.isArray(filmcheck)){
            filmcheck.forEach(element => {
              conn.query("INSERT INTO joue (Id_film,Id_acteur) VALUES (?,?)", [element , id])
            })
        } else {
          conn.query("INSERT INTO joue (Id_film,Id_acteur) VALUES (?,?)", [filmcheck , id])
        }
        conn.release();
        return result;
      })
      .then(() => {
        console.log('Acteur Modifier')
        res.redirect('creaacteur');
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (req.body.actionto == 'Supprimer') {
    pool.getConnection()
      .then((conn) => {
        const result = conn.query("DELETE FROM acteur WHERE acteur.id_acteur = ?", [id,]);
        conn.release();
        return result;
      })
      .then(() => {
        console.log('Acteur Supprimer')
        res.redirect('creaacteur');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 
})
//----------------------------------------------------------------
// -- crée réal
app.get('/creareal', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query('SELECT * FROM realisateur');
      conn.release();
      return result;
    })
    .then((real) => {
      res.render('creareal', { real: real[0] })
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/creareal", upload.single('upload'), function (req, res) {
let nom = req.body.nom;
let prenom = req.body.prenom;
let photo = req.file.filename;
pool.getConnection()
  .then((conn) => {
    const result = conn.query(
      "INSERT INTO realisateur (nom,prenom,photo) VALUES (?,?,?)",
      [
        nom,
        prenom,
        photo,
      ],
    );
    conn.release();
    return result;
  })
  .then(() => {
    console.log('Realisateur ajouter')
    res.redirect('creareal');
  })
  .catch((err) => {
    console.log(err);
  });
})
app.post("/modifreal", upload.single('upload'), function (req, res) {
let id = req.body.idmodif;
let nom = req.body.nommodif;
let prenom = req.body.prenommodif;
let photo = req.file.filename;

if (req.body.actionto == 'Modifier') {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        "UPDATE realisateur SET nom = ?, prenom = ?, photo = ? WHERE realisateur.id_realisateur = ? ",
        [
          nom,
          prenom,
          photo,
          id,
        ],
      );
      conn.release();
      return result;
    })
    .then(() => {
      console.log('Réal Modifier')
      res.redirect('creareal');
    })
    .catch((err) => {
      console.log(err);
    });
} else if (req.body.actionto == 'Supprimer') {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query("DELETE FROM realisateur WHERE realisateur.id_realisateur = ?", [id,]);
      conn.release();
      return result;
    })
    .then(() => {
      console.log('realisateur Supprimer')
      res.redirect('creareal');
    })
    .catch((err) => {
      console.log(err);
    });
}

// 
})
//----------------------------------------------------------------
// -- crée genre
app.get('/creagenre', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query('SELECT * FROM genre');
      conn.release();
      return result;
    })
    .then((genre) => {
      res.render('creagenre', { genre: genre[0] })
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/creagenre", function (req, res) {
let type = req.body.type;
pool.getConnection()
  .then((conn) => {
    const result = conn.query(
      "INSERT INTO genre (type) VALUES (?)",
      [
        type,
      ],
    );
    conn.release();
    return result;
  })
  .then(() => {
    console.log('Genre ajouter')
    res.redirect('creagenre');
  })
  .catch((err) => {
    console.log(err);
  });
})
app.post("/modifreal", function (req, res) {
let id = req.body.idmodif;
let type = req.body.typemodif;

if (req.body.actionto == 'Modifier') {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        "UPDATE genre SET type = ? WHERE genre.id_genre = ? ",
        [
          type,
          id,
        ],
      );
      conn.release();
      return result;
    })
    .then(() => {
      console.log('Genre Modifier')
      res.redirect('creagenre');
    })
    .catch((err) => {
      console.log(err);
    });
} else if (req.body.actionto == 'Supprimer') {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query("DELETE FROM genre WHERE genre.id_genre = ?", [id,]);
      conn.release();
      return result;
    })
    .then(() => {
      console.log('genre Supprimer')
      res.redirect('creagenre');
    })
    .catch((err) => {
      console.log(err);
    });
}

// 
})



// ----------------------------- FILM-----------------------------
// ---------------------------------------------------------------
// -- affiche la liste des films 
app.get('/listefilms', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query('SELECT * FROM film');
      conn.release();
      return res;
    })
    .then((listefilm) => {
      res.render('listefilms', { film: listefilm[0], session: req.session.user})
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
      const res = conn.query(
        {
          sql: 'SELECT * FROM film WHERE id_film= ?; SELECT * FROM commentaire WHERE id_film= ?; SELECT * FROM users; SELECT * FROM joue WHERE Id_film= ?; SELECT * FROM acteur',
          rowsAsArray: false,
        },[req.params.id,req.params.id,req.params.id,]
      );
      conn.release();
      return res;
    })
    .then((detailfilm) => {
      res.render('detailfilm', { film: detailfilm[0][0][0], comment: detailfilm[0][1], usecomment: detailfilm[0][2], joue : detailfilm[0][3], acteur : detailfilm[0][4],})
    })
    .catch((err) => {
      console.log(err);
    });
})
app.get('/apidetail/:id', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query(
        {
          sql: 'SELECT * FROM film WHERE id_film= ?; SELECT * FROM commentaire WHERE id_film= ?; SELECT * FROM joue WHERE Id_film= ?; SELECT * FROM acteur',
          rowsAsArray: false,
        },[req.params.id,req.params.id,req.params.id,]
      );
      conn.release();
      return res;
    })
    .then((detailfilm) => {
      let obj = { film: detailfilm[0][0][0], comment: detailfilm[0][1], joue : detailfilm[0][2], acteur : detailfilm[0][3],}
      res.json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
})
// ajout commentaire
app.post("/detailfilm", function (req, res) {
  let id = req.body.id;
  let mail = req.body.mail;
  let comment = req.body.comment;
  let note = req.body.note;
  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        'INSERT INTO commentaire (id_film,mail,commentaire,note) VALUES (?,?,?,?)',
        [
          id,
          mail,
          comment,
          note,
        ],
      );
      conn.release();
      return result;
    })
    .then(() => {
      console.log('new comment')
      pool.getConnection()
        .then((conn) => {
          const res = conn.query(
            {
              sql: 'SELECT * FROM film WHERE id_film= ?; SELECT * FROM commentaire WHERE id_film= ?; SELECT * FROM users; SELECT * FROM joue WHERE Id_film= ?; SELECT * FROM acteur',
              rowsAsArray: false,
            },[id,id,id]
          );
          conn.release();
          return res;
        })
        .then((detailfilm) => {
          res.render('detailfilm', { film: detailfilm[0][0][0], comment: detailfilm[0][1], usecomment: detailfilm[0][2], joue : detailfilm[0][3], acteur : detailfilm[0][4],})
        })
        .catch((err) => {
          console.log(err);
        });
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
          sql: 'SELECT * FROM realisateur;SELECT * FROM genre;SELECT * FROM film',
          rowsAsArray: false,
        },
      );
      conn.release();
      return result;
    })
    .then((creafilm) => {
      res.render('creafilm', { realisateur: creafilm[0][0], genre: creafilm[0][1], film: creafilm[0][2] })
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/creafilm", upload.single('upload'), function (req, res) {
  let titre = req.body.titre;
  let description = req.body.description;
  let affiche = req.file.filename;
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
      res.redirect('creafilm');
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/modiffilm", upload.single('upload'), function (req, res) {
  let id = req.body.id
  let titre = req.body.titre;
  let description = req.body.description;
  let affiche = req.file.filename;;
  let realisateur = req.body.realisateur;
  let genre = req.body.genre;
console.log(req.file)
  if (req.body.actionto == 'Modifier') {
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
      console.log('Film modifier')
      res.redirect('creafilm');
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (req.body.actionto == 'Supprimer') {
    pool.getConnection()
    .then((conn) => {
      const result = conn.query("DELETE FROM film WHERE film.id_film = ?", [id,]);
      conn.release();
      return result;
    })
    .then(() => {
      console.log('Film Supprimer')
      res.redirect('creafilm');
    })
    .catch((err) => {
      console.log(err);
    });
}
})
//----------------------------------------------------------------
// -- SUPPRIME un film
app.get('/supprfilm/:id', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const result = conn.query(
        {
          sql: 'DELETE FROM joue WHERE Id_film = ?; DELETE FROM film WHERE id_film = ?',
          rowsAsArray: false,
        },[req.params.id,req.params.id],
      )
      conn.release();
      return result;
    })
    .then(() => {
      res.redirect('/listefilms');
    })
    .catch((err) => {
      console.log(err);
    });
})


// ----------------------------- USER-----------------------------
// ---------------------------------------------------------------

// -- connection + profil
app.get('/profil', function (req, res) { res.render('profil') })
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
        req.session.user.nom = nom;
        req.session.user.prenom = prenom;
        req.session.user.email = email;
        res.redirect('/usermodif/' + id);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send('Erreur !<br><a href="/"><button>Retour à la connexion</button>')
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
      res.redirect('/');

    })
    .catch((err) => {
      console.log(err);
    });
})
//----------------------------------------------------------------
// -- Ajoute un nouvel utilisateur
app.get("/newuser", function (req, res) {res.render('newuser')})
//  A revoir : ajouter une verification de mail avant de crée le nouvel user
app.post("/newuser", function (req, res) {
        let nom = req.body.nom;
        let prenom = req.body.prenom;
        let email = req.body.email;
        let password = req.body.password;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
    pool.getConnection()
      .then((conn) => {
        const result = conn.query(
          "INSERT INTO `users` (nom,prenom,email,password) VALUES (?,?,?,?)",
          [
            nom,
            prenom,
            email,
            hash,
          ],
        );
        conn.release();
        return result;
      })
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
});






app.listen(process.env.PORT, () => console.log('lancer sur le port '+ process.env.PORT))
