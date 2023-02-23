import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./style.css";
import { tokenContext } from "../../App";

const Dashboard = () => {

  const navigate = useNavigate();


  const itemDetails = (item) => {
    console.log(item);

    navigate(`/details/${item.id}`);
  };


  const { token, setToken } = useContext(tokenContext);
  const [items, setItems] = useState([]);
  const [userID, setuserId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [show, setShow] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);
  const [itemId, setItemId] = useState(false);
  const [message, setMessage] = useState("");

  /////////////getallItems///////////////

  const getallItems = () => {
    axios
      .get(`http://localhost:5000/items`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setuserId(localStorage.getItem("userId"));

        setItems(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallItems();
  }, []);

  console.log(userID);

  //////////////////////////////////

  const handleUpdateClick = (item) => {
    setUpdateBox(!updateBox);
    setItemId(item.id);
    setTitle(item.title);
    setPrice(item.price);
    if (updateBox) updateItem(item.id);
  };

  const updateItem = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/items/${id}/edit`,
        {
          title,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getallItems();
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////////////////////////

  const deleteItem = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/items/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getallItems();
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////

  return (
    <div className="Contdash">
     
      {items &&
        items.map((item, index) => {
          return (
            <div className="Cart" key={index}>
              <img className="item-img" src={item.img} 
               onClick={() => {
                itemDetails(item);
              }}
              
              
              
              />
              <p> {item.title}</p>
              <p> {item.price + " " + "$"}</p>
              {userID == item.owner_id ? (
                <>
                  {updateBox && itemId === item.id && (
                    <form>
                      <br />
                      <input
                        type="text"
                        defaultValue={item.title}
                        placeholder="item title here"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <br />

                      <input
                        placeholder="item price here"
                        defaultValue={item.price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </form>
                  )}
                 <div className="contButton">
                 <button
                    className="delete"
                    onClick={() => deleteItem(item.id)}
                  >
               Delete
                  </button>
                  <button
                    className="update"
                    onClick={() => handleUpdateClick(item)}
                  >
                    Update
                  </button>
                 </div>
                </>
              ) : (
                <></>
              )}
            </div>
          );
        })}
    </div>
  
  );
};

export default Dashboard;
