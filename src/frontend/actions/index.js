import axios from "axios";

export const actions = {
  setFavorite: "SET_FAVORITE",
  deleteFavorite: "DELETE_FAVORITE",
  loginRequest: "LOGIN_REQUEST",
  logoutRequest: "LOGOUT_REQUEST",
  registerRequest: "REGISTER_REQUEST",
  getVideoSource: "GET_VIDEO_SOURCE",
  setError: "SET_ERROR",
};

export const setFavorite = (payload) => {
  return {
    type: actions.setFavorite,
    payload,
  };
}; // payload es la info

export const deleteFavorite = (payload) => {
  return {
    type: actions.deleteFavorite,
    payload,
  };
};

export const loginRequest = (payload) => {
  return {
    type: actions.loginRequest,
    payload,
  };
};

export const logoutRequest = (payload) => {
  return {
    type: actions.logoutRequest,
    payload,
  };
};

export const registerRequest = (payload) => {
  return {
    type: actions.registerRequest,
    payload,
  };
};

export const getVideoSource = (payload) => {
  return {
    type: actions.getVideoSource,
    payload,
  };
};

export const setError = (payload) => ({
  type: actions.setError,
  payload,
});

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post("/auth/sign-up", payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const loginUser = ({ email, password, rememberMe }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: "/auth/sign-in",
      method: "post",
      auth: {
        username: email,
        password,
      },
      data: {
        rememberMe,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};
