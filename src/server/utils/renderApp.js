import axios from "axios";
import jwt from "jsonwebtoken";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { renderRoutes } from "react-router-config";
import { StaticRouter } from "react-router-dom";
import Layout from "../../frontend/components/Layout";
import serverRoutes from "../../frontend/routes/serverRoutes";

import reducer from "../../frontend/reducers";

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest["main.css"] : "assets/app.css";
  const mainBuild = manifest ? manifest["main.js"] : "assets/app.js";

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Platzi Video</title>
        <link rel="stylesheet" href=${mainStyles} type="text/css" />
      </head>
      <body>
        <div id="app">
          ${html}
        </div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            "\\u003c"
          )}
        </script>
        <script src=${mainBuild} type="text/javascript"></script>
      </body>
    </html>
  `;
};

const renderApp = async (req, res) => {
  let initialState;

  const { token } = req.cookies;
  const verifyToken = jwt.decode(token) || {
    sub: { email: undefined, name: undefined, id: undefined },
  };

  const email = req.cookies.email || verifyToken.sub.email;
  const name = req.cookies.name || verifyToken.sub.name;
  const id = req.cookies.id || verifyToken.sub.id;

  try {
    let { data: userMovies } = await axios({
      url: `${process.env.API_URL}/api/user-movies?userId=${id}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    });

    userMovies = userMovies.data;

    let { data: movieList } = await axios({
      url: `${process.env.API_URL}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    });

    movieList = movieList.data;

    initialState = {
      user: {
        email,
        name,
        id,
      },
      playing: {},
      myList: userMovies.map((userMovie) => {
        const favoriteMovie = movieList.find(
          (item) => item._id === userMovie.movieId
        );

        return {
          ...favoriteMovie,
          userMovieId: userMovie._id,
        };
      }),
      trends: movieList.filter(
        (movie) => movie.contentRating === "PG" && movie._id
      ),
      originals: movieList.filter(
        (movie) => movie.contentRating === "G" && movie._id
      ),
    };
  } catch (err) {
    initialState = {
      user: {},
      playing: {},
      myList: [],
      trends: [],
      originals: [],
    };
  }

  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = initialState.user.id;
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>
  );

  res.removeHeader("x-powered-by");
  res.send(setResponse(html, preloadedState, req.hashManifest));
};

export default renderApp;
