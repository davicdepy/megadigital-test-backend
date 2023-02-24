const Reserva = require("../models/reserva.model.js");

// Crear y guardar una nueva reserva
exports.create = (req, res) => {
  // Validar solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Crear una reserva
  const reserva = new Reserva({
    fechareserva: req.body.fechareserva,
    fechaentrada: req.body.fechaentrada,
    fechasalida: req.body.fechasalida,
    habitacionid: req.body.habitacionid,
    personaid: req.body.personaid,
    montoreserva: req.body.montoreserva,
  });

  // Guardar reserva en la base de datos
  Reserva.create(reserva, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo algún error al crear la reserva.",
      });
    else res.send(data);
  });
};

// Recuperar todas las reservas de la base de datos (con condición).
exports.findAll = (req, res) => {
  const fechareserva = req.query.fechareserva;

  Reserva.getAll(fechareserva, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Se produjo algún error al recuperar reservas.",
      });
    else res.send(data);
  });
};

// Encuentra una reserva por ID
exports.findOne = (req, res) => {
  Reserva.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró reserva con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error de recuperar la reserva con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Encuentra reservas por rango de fechas

// Actualizar una reserva  por  ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  Reserva.updateById(req.params.id, new Reserva(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró reserva con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error de actualización de la reserva con id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Eliminar una reserva por ID
exports.delete = (req, res) => {
  Reserva.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una reserva con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la reserva id" + req.params.id,
        });
      }
    } else res.send({ message: `La reserva fue eliminada con éxito!` });
  });
};

// Eliminar todas las reservas de la base de datos.
exports.deleteAll = (req, res) => {
  Reserva.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Se produjo algún error al eliminar a todas las reservas.",
      });
    else
      res.send({
        message: `Todas las reservas fueron eliminadas con éxito!`,
      });
  });
};
