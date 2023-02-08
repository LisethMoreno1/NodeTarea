const jsonData = require("../data.json");
const host = "localhost";
const port = 8080;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.json(jsonData);
  res.end();
});

const userss = [
  {
    nombre: "liseth",
    rol: "admin",
  },
  {
    nombre: "user",
    rol: "user",
  },
];

/* app.post("/login", function (req, res) {
  const usero = req.body.nombre;
  //  console.log(usero);

  const userInfo = userss.filter((user) => {
    if (user.nombre == usero) {
      return true;
    } else {
      return false;
    }
  });

  console.log(process.env.SECRET_KEY);

  if (userInfo.length !== 0) {
    token = jwt.sign(
      {
        nombre: userInfo[0].nombre,
        rol: userInfo[0].rol,
      },
      process.env.SECRET_KEY,
      {
        algorithm: "HS256",
      }
    );
    console.log(token);
    res.json({ token });
  } else {
    res
      .status(401)
      .json({ error: "Doesn't exist any user with this email account" });
  }
  env.config();
}); */

/* const users =  [
      {
       nombre: "liseth",
       rol:"admin"
      },
      {
        nombre: "user",
        rol:"user"
      }
    ] */

app.post("/login", function (req, res) {
  const userInfo = userss.map((user) => {
    if (user.nombre == req.body.nombre) {
      return user;
    }
  });
  if (userInfo.length === 0) {
    res.status(401).send({ error: "Invalid user name or password" });
  } else {
    const token = jwt.sign(userInfo[0], process.env.SECRET_KEY, {
      algorithm: "HS256",
    });
    res.json({ token });
  }
});
app.get("/proteger", function (req, res) {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    res.send("autenticado");
  } catch (error) {
    res.json({ error });
  }
});

app.listen(port, host, () => {
  console.log(`El servidor está funcionando en http://${host}:${port}`);
});

module.exports = app;
