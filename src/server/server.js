import express from "express";
import dotenv from "dotenv";
import webpack from "webpack";
import helmet from "helmet";

import coockieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";

import getManifest from "./utils/getManifest";

import userMovies from "./routes/userMovies";
import auth from "./routes/auth";

import renderApp from "./utils/renderApp";

dotenv.config();

const app = express();
const { ENV, PORT } = process.env;

// parsers
app.use(express.json());
app.use(coockieParser());

// session
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

if (ENV === "development") {
  console.log("Development config");
  const webpackConfig = require("../../webpack.config");
  const webpackDevMidlleware = require("webpack-dev-middleware");
  const webpackHotMidlleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };

  app.use(webpackDevMidlleware(compiler, serverConfig));
  app.use(webpackHotMidlleware(compiler));
} else {
  console.log("Production config");
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
}

// routes
userMovies(app);
auth(app);
app.get("*", renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);

  console.log(`Server running in http://localhost:${PORT}`);
});
