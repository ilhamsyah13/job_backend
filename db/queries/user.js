const knex = require("../db");

function getUser(id) {
  return knex("user")
    .select("*")
    .where({ id: parseInt(id) });
}

module.exports = { getUser };
