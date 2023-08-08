const Router = require("koa-router");
const axios = require("axios");
const db = require("../db/db");

const router = new Router();
const BASE_URL = "/api/recruitment/positions";

router.get(BASE_URL, async (ctx) => {
  try {
    let description = ctx.request.query.description || "";
    let location = ctx.request.query.location || "";
    let fulltime = ctx.request.query.full_time || true;
    if (ctx.request.query.full_time == "true" || fulltime === true) {
      fulltime = "Full Time";
    }
    const response = await db("jobs")
      .select("*")
      .where("description", "ilike", `%${description}%`)
      .andWhere("location", "ilike", `%${location}%`)
      .andWhere("type", "ilike", `%${fulltime}%`);
    ctx.body = response;
  } catch (error) {
    console.log(error);
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const response = await db("jobs").select("*").where({ id: id });
    ctx.body = response;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
