const Habitacion = require("../models/habitacion.model.js");

// Crear y guardar una nueva habitacion
exports.create = (req, res) => {
  // Validar solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Crear una habitacion
  const habitacion = new Habitacion({
    habitacionpiso: req.body.habitacionpiso,
    habitacionnro: req.body.habitacionnro,
    cantcamas: req.body.cantcamas,
    tienetelevision: req.body.tienetelevision || false,
    tienefrigobar: req.body.tienefrigobar || false,
  });

  // Guardar habitacion en la base de datos
  Habitacion.create(habitacion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo algún error al crear la habitacion.",
      });
    else res.send(data);
  });
};

// Recuperar todas las habitaciones de la base de datos (con condición).
exports.findAll = (req, res) => {
  const habitacionpiso = req.query.habitacionpiso;

  Habitacion.getAll(habitacionpiso, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Se produjo algún error al recuperar habitaciones.",
      });
    else res.send(data);
  });
};

// Encuentra una habitacion por ID
exports.findOne = (req, res) => {
  Habitacion.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró habitacion con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error de recuperar la habitacion con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Encuentra todas las habitaciones
exports.findAllReservas = (req, res) => {
  Habitacion.getAllReservas((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Se produjo algún error al recuperar las habitaciones.",
      });
    else res.send(data);
  });
};

// Actualizar una habitacion  por  ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  Habitacion.updateById(
    req.params.id,
    new Habitacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró habitacion con id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error de actualización de la habitacion con id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una habitacion por ID
exports.delete = (req, res) => {
  Habitacion.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una habitacion con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la habitacion id" + req.params.id,
        });
      }
    } else res.send({ message: `La habitacion fue eliminada con éxito!` });
  });
};

// Eliminar todas las habitaciones de la base de datos.
exports.deleteAll = (req, res) => {
  Habitacion.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Se produjo algún error al eliminar a todas las habitaciones.",
      });
    else
      res.send({
        message: `Todas las habitaciones fueron eliminadas con éxito!`,
      });
  });
};
