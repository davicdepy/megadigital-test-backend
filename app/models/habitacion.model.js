const sql = require("./db.js");

const Habitacion = function (habitacion) {
  this.habitacionpiso = habitacion.habitacionpiso;
  this.habitacionnro = habitacion.habitacionnro;
  this.cantcamas = habitacion.cantcamas;
  this.tienetelevision = habitacion.tienetelevision;
  this.tienefrigobar = habitacion.tienefrigobar;
};

Habitacion.create = (newHabitacion, result) => {
  sql.query("INSERT INTO table_habitacion SET ?", newHabitacion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created habitacion: ", { id: res.insertId, ...newHabitacion });
    result(null, { id: res.insertId, ...newHabitacion });
  });
};

Habitacion.findById = (id, result) => {
  sql.query(`SELECT * FROM table_habitacion WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found habitacion: ", res[0]);
      result(null, res[0]);
      return;
    }

    // no encontrado habitación con el id
    result({ kind: "not_found" }, null);
  });
};

Habitacion.getAll = (habitacionpiso, result) => {
  let query = "SELECT * FROM table_habitacion";

  if (habitacionpiso) {
    query += ` WHERE habitacionpiso LIKE '%${habitacionpiso}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("table_habitacion: ", res);
    result(null, res);
  });
};

Habitacion.getAllHabitaciones = (result) => {
  sql.query(
    "SELECT * FROM table_habitacion WHERE reservas=true",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("table_habitacion: ", res);
      result(null, res);
    }
  );
};

Habitacion.updateById = (id, habitacion, result) => {
  sql.query(
    "UPDATE table_habitacion SET habitacionpiso = ?, habitacionnro = ?, cantcamas = ?, tienetelevision = ?, tienefrigobar = ? WHERE id = ?",
    [
      habitacion.habitacionpiso,
      habitacion.habitacionnro,
      habitacion.cantcamas,
      habitacion.tienetelevision,
      habitacion.tienefrigobar,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Habitacion with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated habitacion: ", { id: id, ...habitacion });
      result(null, { id: id, ...habitacion });
    }
  );
};

Habitacion.remove = (id, result) => {
  sql.query("DELETE FROM table_habitacion WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no encontrado habitación con el id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted habitacion with id: ", id);
    result(null, res);
  });
};

Habitacion.removeAll = (result) => {
  sql.query("DELETE FROM table_habitacion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} table_habitacion`);
    result(null, res);
  });
};

module.exports = Habitacion;
