const sql = require("./db.js");

const Reserva = function (reserva) {
  this.fechareserva = reserva.fechareserva;
  this.fechaentrada = reserva.fechaentrada;
  this.fechasalida = reserva.fechasalida;
  this.habitacionid = reserva.habitacionid;
  this.personaid = reserva.personaid;
  this.montoreserva = reserva.montoreserva;
};

Reserva.create = (newReserva, result) => {
  console.log("reserva", newReserva);
  sql.query("INSERT INTO table_reserva SET ?", newReserva, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created reserva: ", { id: res.insertId, ...newReserva });
    result(null, { id: res.insertId, ...newReserva });
  });
};

Reserva.findById = (id, result) => {
  sql.query(`SELECT * FROM table_reserva WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found reserva: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Reserva with the id
    result({ kind: "not_found" }, null);
  });
};

Reserva.getAll = (fechareserva, result) => {
  let query = "SELECT * FROM table_reserva";

  if (fechareserva) {
    query += ` WHERE fechareserva LIKE '%${fechareserva}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("table_reserva: ", res);
    result(null, res);
  });
};

Reserva.updateById = (id, reserva, result) => {
  sql.query(
    "UPDATE table_reserva SET fechareserva = ?, fechaentrada = ?, fechasalida = ?, habitacionid = ?, personaid = ?, montoreserva = ? WHERE id = ?",
    [
      reserva.fechareserva,
      reserva.fechaentrada,
      reserva.fechasalida,
      reserva.habitacionid,
      reserva.personaid,
      reserva.montoreserva,
      id,
    ],

    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Reserva with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated reserva: ", { id: id, ...reserva });
      result(null, { id: id, ...reserva });
    }
  );
};

Reserva.remove = (id, result) => {
  sql.query("DELETE FROM table_reserva WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Reserva with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted reserva with id: ", id);
    result(null, res);
  });
};

Reserva.removeAll = (result) => {
  sql.query("DELETE FROM table_reserva", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} table_reserva`);
    result(null, res);
  });
};

module.exports = Reserva;
