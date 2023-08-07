const axios = require("axios");
const koa = require("koa");
const Router = require("koa-router");
const json = require("koa-json");
const bodyParser = require("koa-body-parser");
const cors = require("@koa/cors");

const jobsRoutes = require("./routes/jobs");
const userRoutes = require("./routes/user");

const app = new koa();
const router = new Router();

app.use(json());
app.use(bodyParser());

app.use(cors());

app.use(jobsRoutes.routes());
app.use(userRoutes.routes());

app.use(router.routes()).use(router.allowedMethods);

app.listen(3000, function () {
  console.log("Server running on https://localhost:3000");
});
