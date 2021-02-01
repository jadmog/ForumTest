import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import Axios from "axios";

export default function LogOut(props) {
  const [loggedIn, setLoggedIn] = useState(props.setLoggedIn);
  const [loginUsername, setLoginUsername] = useState(props.setLoginUsername);
  const logout = () => {
    Axios({
      method: "GET",
      url: "http://localhost:5000/login/logout",
    }).then((res) => {
      console.log(res);
      if (res.data === "User Logged out") {
        setLoggedIn(false);
        setLoginUsername("");
      } else {
        console.log("Logout failed");
      }
    });
  };
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return <Button onClick={logout}>Log out</Button>;
}
