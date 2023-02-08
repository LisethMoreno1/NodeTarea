const error = (req, res, next) => {
  const method = req.method;
  if (method === "POST" || method === "PUT") {
    if (Object.values(req.body).length === 0) {
      return res.status(400).send("Solicitudes POST con el cuerpo vacio");
    }
  }

  next();
};

const Validarse = (req, res, next) => {
  const { body } = req;
  if (Object.keys(body).length < 1) {
    return res
      .status(400)
      .send(
        "Solicitudes POST/PUT que tengan información no valida o atributos faltantes para crear las tareas"
      );
  }
  next();
};

const validacionPeticion = (req, res, next) => {
  const { method } = req;
  console.log(method);

  if (
    method === "POST" ||
    method === "GET" ||
    method === "PUT" ||
    method === "DELETE"
  ) {
    next();
  } else {
    return res.status(400).send("Method no valido");
  }
};

const validarParametros = (req, res, next) => {
  const estado = req.params.estado;
  if (estado === "completada" || estado === "incompleta") {
  } else {
    next();
    res.status(404).send("Bad request");
  }
};

const validarurl = (req, res, next) => {
  const { originalUrl } = req;
  const urls = originalUrl.split("/");
  if (
    urls[1] === "agregar" ||
    urls[1] === "/editar/:id" ||
    urls[1] === "eliminar"
  ) {
    res.send("la url es valida");
  } else {
    next();
    res.status(404).send(" La url es Invalida");
  }
};

module.exports = {
  error,
  Validarse,
  validacionPeticion,
  validarParametros,
  validarurl,
};
