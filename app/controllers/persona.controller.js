const Persona = require("../models/persona.model.js");

// Crear y guardar una nueva persona
exports.create = (req, res) => {
  // Validar solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Crear una persona
  const persona = new Persona({
    nombrecompleto: req.body.nombrecompleto,
    nrodocumento: req.body.nrodocumento,
    correo: req.body.correo,
    telefono: req.body.telefono,
  });

  // Guardar persona en la base de datos
  Persona.create(persona, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo algún error al crear la persona.",
      });
    else res.send(data);
  });
};

// Recuperar todas las personas de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombrecompleto = req.query.nombrecompleto;

  Persona.getAll(nombrecompleto, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo algún error al recuperar personas.",
      });
    else res.send(data);
  });
};

// Encuentra una persona por ID
exports.findOne = (req, res) => {
  Persona.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró persona con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error de recuperar la persona con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Encuentra todas las personas
exports.findAllReservas = (req, res) => {
  Persona.getAllReservas((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo algún error al recuperar personas.",
      });
    else res.send(data);
  });
};

// Actualizar una persona  por  ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  Persona.updateById(req.params.id, new Persona(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró persona con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error de actualización de la persona con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Eliminar una persona por ID
exports.delete = (req, res) => {
  Persona.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una persona con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la persona id" + req.params.id,
        });
      }
    } else res.send({ message: `La persona fue eliminada con éxito!` });
  });
};

// Eliminar todas las personas de la base de datos.
exports.deleteAll = (req, res) => {
  Persona.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Se produjo algún error al eliminar a todas las personas.",
      });
    else
      res.send({ message: `Todas las personas fueron eliminadas con éxito!` });
  });
};
