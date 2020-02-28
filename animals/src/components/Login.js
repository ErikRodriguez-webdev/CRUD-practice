import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Login(props) {
  // How can we log in? What do we need to do?
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post("/login", login)
      .then((response) => {
        console.log(response);
        window.localStorage.setItem("token", response.data.payload);
      })
      .catch((error) => {
        console.log(error.response);
      });

    setLogin({
      username: "",
      password: ""
    });
  };

  return (
    <div>
      <h1>Welcome to the Safari App!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            value={login.username}
            onChange={handleChange}
            placeholder="jerrySpringer123"
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="abc123!@#"
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
