import React, { useState, useEffect } from "react";
import { Table, Tag, Space, message, Popconfirm, Avatar } from "antd";
import { useToasts } from "react-toast-notifications";
import api from "../../services/api";
import NavBar from "../../components/Nav";

import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

import "./styles.css";
import "../../global.css";

const ListUsers = () => {
  const [results, setResults] = useState([]);

  const { addToast } = useToasts();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const text = "Tem certeza de que deseja excluir esse usuário?";
  const confirm = () => {
    message.info("Clicked on Yes.");
  };
  useEffect(() => {
    api
      .get(`/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResults(response?.data);
      });
  }, [token, id]);

  const columns = [
    {
      render: () => {
        return (
          <Avatar
            size={34}
            style={{ backgroundColor: "#F7B12A" }}
            icon={<UserOutlined />}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: results?.map((res) => {
        return {
          text: `${res.first_name}`,
          value: `${res.first_name}`,
        };
      }),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "90%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <EditOutlined
              style={{
                backgroundColor: "#F7B12A",
                padding: 4,
                borderRadius: 4,
                color: "#FFFFFF",
                cursor: "pointer"
              }}
            />
            <Popconfirm
              placement="right"
              title={text}
              onConfirm={confirm}
              okText="Sim"
              cancelText="Não"
            >
              <DeleteOutlined
                style={{
                  backgroundColor: "#F7B12A",
                  padding: 4,
                  borderRadius: 4,
                  color: "#FFFFFF",
                }}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
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

  const data = results?.map((res) => {
    return {
      name: `${res.first_name}`,
      phone: `${res.date}`,
    };
  });

  return (
    <div className="profile_container">
      <NavBar />
      <h1>Lista de Usuários</h1>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ListUsers;
