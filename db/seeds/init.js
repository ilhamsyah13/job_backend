/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user").del();
  await knex("user").insert([
    { username: "bob", password: "bob123" },
    { username: "joni", password: "joni123" },
    { username: "john", password: "john123" },
  ]);
};
