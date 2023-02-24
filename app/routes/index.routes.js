module.exports = (app) => {
  const personas = require("../controllers/persona.controller.js");
  const habitaciones = require("../controllers/habitacion.controller.js");
  const reservas = require("../controllers/reserva.controller.js");

  var router = require("express").Router();

  // Crear una nueva persona
  router.post("/personas", personas.create);

  // Recuperar todas las personas
  router.get("/personas", personas.findAll);

  // Recuperar todas las Reservas
  router.get("/personas", personas.findAllReservas);

  // Recuperar una sola persona con id
  router.get("/personas/:id", personas.findOne);

  // Actualizar una persona con id
  router.put("/personas/:id", personas.update);

  // Eliminar una persona con id
  router.delete("/personas/:id", personas.delete);

  // Eliminar todas las Personas
  router.delete("/personas", personas.deleteAll);

  //----------------------------------------------------------------//

  // Crear una nueva habitacion
  router.post("/habitaciones", habitaciones.create);

  // Recuperar todas las habitaciones
  router.get("/habitaciones", habitaciones.findAll);

  // Recuperar todas las Reservas
  router.get("/habitaciones", habitaciones.findAllReservas);

  // Recuperar una sola persona con id
  router.get("/habitaciones/:id", habitaciones.findOne);

  // Actualizar una persona con id
  router.put("/habitaciones/:id", habitaciones.update);

  // Eliminar una persona con id
  router.delete("/habitaciones/:id", habitaciones.delete);

  // Eliminar todas las Personas
  router.delete("/habitaciones", habitaciones.deleteAll);

  //----------------------------------------------------------------//

  // Crear una nueva reserva
  router.post("/reservas", reservas.create);

  // Recuperar todas las reservas
  router.get("/reservas", reservas.findAll);

  // Recuperar una sola persona con id
  router.get("/reservas/:id", reservas.findOne);

  // Actualizar una persona con id
  router.put("/reservas/:id", reservas.update);

  // Eliminar una persona con id
  router.delete("/reservas/:id", reservas.delete);

  // Eliminar todas las Personas
  router.delete("/reservas", reservas.deleteAll);

  app.use("/api/", router);
};
