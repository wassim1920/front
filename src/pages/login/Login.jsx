import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../logo.png";
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formdata, setformdata] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []); 


  const { loading, error, dispatch } = useContext(AuthContext);

 //the user will be save in all the pages

 const handleClick = async (e) => {
  e.preventDefault();
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", formdata);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details }); 
    console.log(res)
    navigate("/")
  } catch (err) {
    console.log("Wrong password or userName !")
    // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
  }
};
  return (
    <div className="main">
      {isLoading ? (
        <div className="loader">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              className="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>
      ) : (
        <>
          <header>
            <img src={logo} alt="Logo" className="logo" />
          </header>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <FontAwesomeIcon
                icon={faUser}
                size="2xl"
                style={{ color: "#081082", padding: "5px" }}
              />
            </div>
            <div className="heading">User Login</div>

            <form action="" className="form" onSubmit={handleClick}>
              <input
                required
                className="input"
                onChange={handleChange}
                value={formdata.username}
                type="text"
                name="username"
                placeholder="Username"
              />
              <input
                required
                className="input"
                onChange={handleChange}
                value={formdata.password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <span className="forgot-password">
                <a style={{ fontSize: "15px" }}>
                  Forgot Password?
                </a>
              </span>
              <input className="login-button" type="submit" value="Sign In" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
