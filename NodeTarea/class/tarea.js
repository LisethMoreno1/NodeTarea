const { v4: uuidv4 } = require("uuid"); // para generar un ID unico
require("colors");
const moment = require("moment");
const { saveData, showData, deleteDataDB } = require("../helpers/DB");

class tarea {
  constructor(desc = "", estado = "") {
    (this.id = uuidv4()),
      (this.descripcion = desc),
      (this.fecha = moment().format("dddd Do MMMM")),
      (this.estado = estado);
  }
}

class tareas {
  constructor() {
    this.listadoTareas = {};
  }

  nuevaTarea(desc, estado) {
    const item = new tarea(desc, estado);

    const { id, ...all } = item; // nuevo de ES9

    this.listadoTareas[id] = item;
    saveData(this.listadoTareas[id]);
  }

  mostrarTareas() {
    const dataObj = showData();
    let cont = 1;
    let lastfecha = "";
    for (const property in dataObj) {
      const { descripcion, fecha, estado } = dataObj[property];

      lastfecha != fecha
        ? console.log(
            `${
              "------------------------------------------------------".magenta
            }`
          )
        : false;

      console.log(
        `${cont.toString().blue}${")".blue}  ${descripcion},${estado} ${
          "_____REALIZADO".green
        } el : ${fecha}`
      );
      cont++;
      lastfecha = fecha;
    }
  }

  traerDataFromDB() {
    // devuelve un array de la data , para luego mandarlo a menuquirer y se graficada para borrar

    const dataObj = showData();
    let array = [];

    for (const property in dataObj) {
      array[property] = dataObj[property];
    }
    return array;
  }
  delteData(id) {
    deleteDataDB(id);
  }
}

module.exports = tareas;
