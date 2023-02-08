require("colors");

const {
  menu,
  obtenerNuevaTarea,
  pausa,
  eliminar,
  confirmar,
} = require("./helpers/menuInquire");
const listTareas = require("./class/tarea");

const principal = async () => {
  try {
    let resmenu;
    do {
      resmenu = await menu();
      const lista = new listTareas();

      switch (resmenu) {
        case "1": // agregar tarea
          const { description } = await obtenerNuevaTarea();

          lista.nuevaTarea(description);
          await pausa(`Se ha agregado ${"CORRECTAMENTE".green}`);
          break;

        case "2": // ver tareas
          console.clear();
          lista.mostrarTareas();
          await pausa(`Presione ${"Enter".green} para Continuar`);

          break;
        case "3": //borrar tareas
          const array = lista.traerDataFromDB();
          const deleteID = await eliminar(array);
          const ok = await confirmar(
            `'¿ Desea ${"borrar".red} la ${"tarea".green}? '`
          );
          ok ? lista.delteData(deleteID) : false;
          await pausa(`Presione ${"Enter".green} para Continuar`);

          break;
      }
    } while (resmenu != 0);
  } catch (error) {
    console.log(error);
  }
};

principal();
