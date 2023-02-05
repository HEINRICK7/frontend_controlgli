import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useToasts } from "react-toast-notifications";
import api from "../../services/api";
import Moment from "react-moment";
import NavBar from "../../components/Nav";

//import controlGliImg from '../../assets/gli/Group 1.svg';

import "./styles.css";
import "../../global.css";

const Profile = () => {
  const [results, setResults] = useState([]);

  const { addToast } = useToasts();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const role = localStorage.getItem("role")
 console.log(role)
  useEffect(() => {
    api
      .get(`/users/${id}/results`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResults(response.data);
      });
  }, [token, id]);

  const handleDeleteResult = async (id) => {
    try {
      await api.delete(`results/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      addToast("resultado deletado com sucesso", {
        appearance: "info",
        autoDismiss: true,
      });
      setResults(results.filter((incident) => incident._id !== id));
    } catch (err) {
      addToast("Erro ao deletar resultado, tente novamente", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const calculaIdade = (data) => {
    if (data === undefined) {
      return;
    }

    const anoNascParts = data?.split("/");
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const diaNasc = Number(anoNascParts[0]);
    const mesNasc = Number(anoNascParts[1]);
    const anoNasc = Number(anoNascParts[2]);

    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();
    let idade = anoAtual - anoNasc;

    if (mesAtual === mesNasc && diaAtual < diaNasc) {
      return idade;
    }
    if (mesAtual === mesNasc && diaAtual > diaNasc) {
      return (idade = idade + 1);
    }
    if (mesAtual === mesNasc && diaAtual <= diaNasc) {
      return (idade = idade + 1);
    } else {
      return idade;
    }
  };

  return (
    <div className="profile-container">
      <NavBar />
      <Link className="button" to={`/results/new`}>
        Cadastrar novo usuário
      </Link>
      <h1> Resultados Cadastrados</h1>
      <div className="card">
        <ul>
          {results.map((result) => (
            <li key={result._id}>
              <strong>
                Nome:<p>{result.user_id.map((res) => res.first_name)}</p>
              </strong>

              <strong>
                Idade:
                <p>
                  {result?.user_id?.map((res) => calculaIdade(res?.date))} Anos
                </p>
              </strong>
              <strong>
                <p style={{ color: "#ED5656", fontSize: 40 }}>
                  {result.result} ml/dl
                </p>
              </strong>

              <strong>
                Descrição:
                <p>{result.description}</p>
              </strong>

              <strong>
                DATA:
                <p>
                  <Moment format="DD/MM/YY">{result?.date}</Moment>
                </p>
              </strong>
              <button
                className="icon"
                type="button"
                onClick={() => handleDeleteResult(result._id)}
              >
                <FiTrash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
