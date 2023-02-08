const host = "localhost";
const port = 8080;
const fs = require("fs");
const express = require("express");
const app = express();
const jsonData = require("../data.json");
const { validarParametros } = require("../middleware/addresser");
app.use(express.json());

app.get("/:completada", validarParametros, function (req, res) {
  const completada = req.params.completada;
  if (completada === "completada") {
    const completa = jsonData.filter((status) => status.estado === "true");
    res.json(completa);
  }
  if (completada === "incompleta") {
    const incompleta = jsonData.filter((status) => status.estado === "false");
    res.json(incompleta);
  } else {
    res.end();
  }
});

app.listen(port, host, () => {
  console.log(`El servidor está funcionando en http://${host}:${port}`);
});

module.exports = app;
