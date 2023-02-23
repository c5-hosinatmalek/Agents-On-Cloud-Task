import { React, useContext, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./style.css";
import { tokenContext } from "../../App";

const Navbar = () => {
  const isLoggedIn = useContext(tokenContext).isLoggedIn;
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;
  const setToken = useContext(tokenContext).setToken;
  const navigate = useNavigate();
useEffect(()=>{
  if(isLoggedIn){
    navigate("/login")
  }
},[])
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setToken("");
  };
  return (
    <div className="Nev" >
      {isLoggedIn ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <Link className="LinkNav" to="/dashboard/">Dashboard</Link>
          <Link className="LinkNav" to="/newItem">
              Add New Item
            </Link>
          <Link className="LinkNav" to="/login" onClick={logOut}>
            logout
          </Link>
        </div>
      ) : (
        <div>
          Please login to access the site
          </div>
      )}
    </div>
  );
};

export default Navbar;



