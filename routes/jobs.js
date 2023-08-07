const Router = require("koa-router");
const axios = require("axios");

const router = new Router();
const BASE_URL = "/api/recruitments/positions";

router.get(BASE_URL, async (ctx) => {
  try {
    let description = ctx.request.query.description || "";
    let location = ctx.request.query.location || "";
    let fulltime = ctx.request.query.fulltime || false;
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?full_time=${fulltime}&description=${description}&location=${location}`
    );
    ctx.body = response.data;
  } catch (error) {
    console.log(error);
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const { id } = ctx.request.params;
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
    );
    ctx.body = response.data;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
