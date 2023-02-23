import React, { useContext, useState, useEffect } from "react";
import { tokenContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";

//===============================================================

const AddNewitem = () => {
  const { token, setToken } = useContext(tokenContext);
  const setIsLoggedIn = useContext(tokenContext).setIsLoggedIn;
  const isLoggedIn = useContext(tokenContext).isLoggedIn;
  const [image, SetImage] = useState("");
  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");
  const [imgto, setImgto] = useState("");
  // const [img,setImg]=useState();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const createNewItem = async (e) => {
    e.preventDefault();
    try {
      const item = {
        title,
        description,
        price,
        img: image,
      };
      const result = await axios.post("http://localhost:5000/items", item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The item has been uploaded successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================
  const uploadImage  = (e) => {
    const data = new FormData();
    data.append("file", e);
    data.append("upload_preset", "Project4");
    data.append("cloud_name", "halhouli");
    fetch("  https://api.cloudinary.com/v1_1/halhouli/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        SetImage(data.url);
      })
      .catch((err) => console.log(err));
  };
  //===============================================================
  useEffect(() => {
    if (!isLoggedIn) {
      history("/dashboard");
    }
  },[]);

  //===============================================================
  return (
    <>
      <div className="containerAddItem">
        <form onSubmit={createNewItem}>
          <div>
            <p className="titleAddItem">Add Item</p>
          </div>
          <div className="containerInLab">
            <label className="NameInputItem">Title</label>
            <input
              type="text"
              placeholder="item title here"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="containerInLab">
            <label className="NameInputItem">Description</label>
            <input
              placeholder="item description here"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="containerInLab">
            <label className="NameInputItem">Price</label>
            <input
              placeholder="item price here"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* <input
        type="text"
        placeholder="Image link"
        onChange={(e) => {
          setImg(e.target.value);
        }}
      /> */}

          <div className="containerInLab">
            <label className="NameInputItem">Upload Image</label>
            <input
              type="file"
              className="updateinputImg"
              onChange={ (e) => {
                uploadImage(e.target.files[0]);
              }}
            />
          </div>

          <button className="ButtonLog">Upload New Item</button>
        </form>
      </div>

      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default AddNewitem;
