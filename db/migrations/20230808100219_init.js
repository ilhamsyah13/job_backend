/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("jobs", (table) => {
    table.increments("id");
    table.string("type");
    table.string("url");
    table.dateTime("created_at");
    table.string("company");
    table.string("company_url");
    table.string("location");
    table.string("title");
    table.text("description", "longtext");
    table.text("how_to_apply", "longtext");
    table.text("company_logo", "longtext");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("jobs");
};
