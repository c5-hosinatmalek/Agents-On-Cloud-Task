import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./style.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [message, setMessage] = useState("");
  const [isRegistered, setIsReg] = useState(false);


  const navigate = useNavigate();

  const addUser = () => {
    axios
      .post("http://localhost:5000/signup/", {
        lastName,
        firstName,
        email,
        password,
      })
      .then((result) => {
        setMessage(result.data.message);
        setIsReg(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        console.log(err.response.data.message)
        setIsReg(false);
      });

  };


  return (
    <div className="containerreg">
      <div className="reg">
      <div>
    <p className="TitleReg">Sign-Up</p>
        </div>
     
     <div className="containerInputReg">
     <label className="titleInputReg">Email</label>
     <input
     required
      className="InputReg"
        type={"text"}
        placeholder={"email"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
     </div>
      
      <div className="containerInputReg">
      <label className="titleInputReg">password</label>
      <input
       required
      className="InputReg"
        type={"password"}
        placeholder={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      </div>
      
      <div className="containerInputReg">
      <label className="titleInputReg">first name</label>
      <input
       required
       className="InputReg"
        type={"text"}
        placeholder={"first name"}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      </div>
    
      <div className="containerInputReg">
      <label className="titleInputReg">last name</label>
      <input
       required
       className="InputReg"
        type={"text"}
        placeholder={"last name"}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      </div>
      
      <div>
      <button className="ButtonLog" onClick={addUser}>Sign Up</button>
      </div>
    
    </div>
    </div>
    
  );
};

export default SignUp;
