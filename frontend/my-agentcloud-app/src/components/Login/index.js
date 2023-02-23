import React, { useState, useContext } from "react";
import axios from "axios";
import "./style.css";
import { tokenContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  
  const setToken = useContext(tokenContext).setToken;
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;

  const navigate = useNavigate();

  const Log = () => {
    axios
      .post("http://localhost:5000/login/", {
        email,
        password,
      })

      .then((result) => {
        console.log(result);

        localStorage.setItem("token", result.data.token);
        setToken(localStorage.getItem("token"));
        
        localStorage.setItem("userId", result.data.id);
        
        setIsLoggedIn(true);

        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  };

  return (
  <div className="containerLog">
      <div className="Log">
      <div>
      <p className="Title">login</p>
      <p className="logtext">Enter your username & password to login</p>
      </div>
      
      <div className="containerInputLog">
      <label className="titleInput">Email</label>
      <input
      className="InputLog"
        type={"text"}
        placeholder={"email"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      </div>
      <div className="containerInputLog">
        <label className="titleInput">password</label>
      <input
       className="InputLog"
        type={"password"}
        placeholder={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      </div>
     
      

      
      <button className="ButtonLog" onClick={Log}>Login</button>
        <div className="ContentLinkSignup">
        Don't have account?<Link to="/signup"> Create an account</Link>
        </div>
      {message ? <p className="message">{message}</p> : ""}
    </div>
  </div>
  );
};

export default Login;
