const sql = require("./db.js");

const Persona = function (persona) {
  this.nombrecompleto = persona.nombrecompleto;
  this.nrodocumento = persona.nrodocumento;
  this.correo = persona.correo;
  this.telefono = persona.telefono;
};

Persona.create = (newPersona, result) => {
  sql.query("INSERT INTO table_persona SET ?", newPersona, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created persona: ", { id: res.insertId, ...newPersona });
    result(null, { id: res.insertId, ...newPersona });
  });
};

Persona.findById = (id, result) => {
  sql.query(`SELECT * FROM table_persona WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found persona: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Persona with the id
    result({ kind: "not_found" }, null);
  });
};

Persona.getAll = (nombrecompleto, result) => {
  let query = "SELECT * FROM table_persona";

  if (nombrecompleto) {
    query += ` WHERE nombrecompleto LIKE '%${nombrecompleto}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("table_persona: ", res);
    result(null, res);
  });
};

Persona.getAllReservas = (result) => {
  sql.query("SELECT * FROM table_persona WHERE reservas=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("table_persona: ", res);
    result(null, res);
  });
};

Persona.updateById = (id, persona, result) => {
  sql.query(
    "UPDATE table_persona SET nombrecompleto = ?, nrodocumento = ?, correo = ?, telefono = ? WHERE id = ?",
    [
      persona.nombrecompleto,
      persona.nrodocumento,
      persona.correo,
      persona.telefono,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Persona with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated persona: ", { id: id, ...persona });
      result(null, { id: id, ...persona });
    }
  );
};

Persona.remove = (id, result) => {
  sql.query("DELETE FROM table_persona WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Persona with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted persona with id: ", id);
    result(null, res);
  });
};

Persona.removeAll = (result) => {
  sql.query("DELETE FROM table_persona", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} table_persona`);
    result(null, res);
  });
};

module.exports = Persona;
