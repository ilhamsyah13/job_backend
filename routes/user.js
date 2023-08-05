const db = require("../db/db");
const Router = require("koa-router");
const jwt = require("jsonwebtoken");

const router = new Router();

router.post("/user/auth", async (ctx, next) => {
  let { username, password } = ctx.request.body;
  let existingUser;
  let token;
  if (username === "admin" && password === "password") {
    existingUser = { id: 9999, username: "username", password: "password" };
    try {
      token = jwt.sign(existingUser, "SECRET_KEY", { expiresIn: "1h" });
    } catch (err) {
      ctx.throw(err.status, err.message);
    }
    ctx.body = {
      success: true,
      data: {
        userId: existingUser.id,
        username: existingUser.username,
        token: token,
      },
    };
  } else {
    try {
      existingUser = await db("user").select("*").where({ username: username });
    } catch (err) {
      ctx.throw(err.status, err.message);
    }
    if (existingUser.length === 0 || existingUser[0].password !== password) {
      ctx.response.body = {
        success: false,
        message: "Wrong Password or Username",
      };
      ctx.throw(ctx.response.status, ctx.response.body);
    }
    try {
      token = jwt.sign(existingUser[0], "SECRET_KEY", { expiresIn: "1h" });
    } catch (err) {
      ctx.throw(err.status, err.message);
    }
    ctx.body = {
      success: true,
      data: {
        userId: existingUser[0].id,
        username: existingUser[0].username,
        token: token,
      },
    };
  }
});

router.get("/user/profile", (ctx) => {
  const token = ctx.headers.authorization.split(" ")[1];
  if (!token) {
    ctx.response.body = "Error!Token was not provided.";
    ctx.throw(ctx.response.status, ctx.response.body);
  }
  const decodedToken = jwt.verify(token, "SECRET_KEY");
  ctx.body = {
    success: true,
    data: {
      id: decodedToken.id,
      username: decodedToken.username,
    },
  };
});

module.exports = router;
