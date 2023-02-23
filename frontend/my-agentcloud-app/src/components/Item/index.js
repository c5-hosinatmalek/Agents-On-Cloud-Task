import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const ItemInfo = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  let { id } = useParams();

  ////////////////////////////////
  //getMoviebyId
  const getItembyId = () => {
    axios
      .get(
        //
        `http://localhost:5000/items/${id}`
      )
      .then((response) => {
        console.log(response.data);
        setInfo(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getItembyId();
  }, []);

  return (
    <div className="containerItemInfo">
      <div className="ItemInfo">
      {info &&
        info.map((detail, index) => {
          return (
            <div className="Cart" key={index}>
              <img className="img-detail" src={detail.img} />
              <p> {detail.title}</p>
              <p> {detail.price + " " + "$"}</p>
              <p> {detail.description}</p>
            </div>
          );
        })}
    </div>
    </div>
  );
};

export default ItemInfo;
