const jsonData = require("../data.json");
const host = "localhost";
const port = 8080;
const fs = require("fs");
const express = require("express");
const app = express();
const {
  error,
  Validarse,
  validacionPeticion,
  validarParametros,
  validarurl,
} = require("../middleware/addresser");

app.use(express.json());
app.use(error);
app.use(Validarse);
app.use(validarurl);
app.use(validacionPeticion);
app.use(validarParametros);

//TOKE
app.post("/login", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const password = req.body.password;
  jwt.sign(id, password, username, "secret_key", (err, token) => {
    if (err) {
      res.status(400).send({ msg: "Error" });
    } else {
      res.send({ msg: "success", token: token });
    }
  });
});

// Agregar
app.post("/agregar", function (req, res) {
  const Data = req.body;
  console.log(Data);
  jsonData.push(Data);
  fs.writeFileSync("../data.json", JSON.stringify(jsonData), function (err) {
    if (err) throw err;
    console.log("recibido");
  });
  res.send("recibido");
  res.end();
});

// Eliminar
app.delete("/eliminar", function (req, res) {
  const Data = req.body;
  console.log(Data);
  jsonData.pop(Data);
  fs.writeFileSync("../data.json", JSON.stringify(jsonData), function (err) {
    if (err) throw err;
    console.log("eliminado");
  });
  res.send("eliminado");
  res.end();
});

// editar

app.put("/editar/:id", function (req, res) {
  const Data = req.body;
  console.log(Data);
  const { id } = req.params;
  const jsonData = JSON.parse(fs.readFileSync("../data.json", "utf-8"));
  jsonData.forEach((tarea) => {
    if (tarea.id == id) {
      tarea.descripcion = req.body.descripcion;
      tarea.fecha = req.body.fecha;
    }
  });
  fs.writeFileSync("../data.json", JSON.stringify(jsonData), function (err) {
    if (err) throw err;
    console.log("editado");
  });
  res.json({ Mensaje: `Tarea ${id}  ha sido actualizada` });
  res.end();
});

app.listen(port, host, () => {
  console.log(`El servidor está funcionando en http://${host}:${port}`);
});

module.exports = app;
