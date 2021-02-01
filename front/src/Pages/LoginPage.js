import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

export default function LoginPage(props) {
  const [loginUsername, setLoginUsername] = useState(props.setLoginUsername);
  const [loginPassword, setLoginPassword] = useState("");
  const setLoggedIn = props.setLoggedIn;
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/login/login",
    }).then((res) => {
      console.log(res);
      if (res.data === "Successfully Authenticated!") {
        setLoggedIn(true);
      } else {
        alert("Wrong credentials");
      }
    });
  };

  if ({ setLoggedIn }) {
    return <Redirect to={{ pathname: "/homepage/" + loginUsername }} />;
  }
  return (
    <div>
      <center>
        <div>
          <TextField
            onChange={(e) => setLoginUsername(e.target.value)}
            required
            id="outlined-required"
            label="Username"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </div>
        <div>
          <Button onClick={login}>Login</Button>
        </div>
        <div>
          <Button>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </center>
    </div>
  );
}
