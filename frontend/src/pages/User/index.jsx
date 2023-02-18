import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";
const User = () => {
  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  const { _id } = useParams();
  useEffect(() => {
    api
      .get(`/users/${_id}/results`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResults(response.data);
      });
  }, [token, _id, id]);
  return (
    <div className="user_container">
      <h1>Hello User {results[0]?.user_id[0]?.first_name}</h1>
    </div>
  );
};

export default User;
