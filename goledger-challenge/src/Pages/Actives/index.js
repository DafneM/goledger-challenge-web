import React, { useState, useEffect } from "react";
import {
  List,
  Blockchain,
  Buttons,
  RegisterActive,
  PActive,
  PRegisterActive,
  ImageNotebook,
  ButtonCreateActive,
  Input,
} from "./style";
import BlockchainContainer from "../../Components/BlockchainContainer";
import Button from "../../Components/Button";
// import NotebookHand from "../../Assets/notebookandhand.png";
import axios from "axios";

const Transactions = () => {
  const [activeName, setActiveName] = useState("");
  const [activeType, setActiveType] = useState("");
  const [activeDescription, setActiveDescription] = useState("");
  const [activeSellerCNPJ, setActiveSellerCNPJ] = useState("");
  const [activeSellerAddress, setActiveSellerAddress] = useState("");
  const [activeSellerName, setActiveSellerName] = useState("");
  const [activeSellerDescription, setActiveSellerDescription] = useState("");
  const [actives, setActive] = useState("");

  const getActives = () => {
    axios
    .get(
      "http://ec2-54-173-117-139.compute-1.amazonaws.com/api/query/getSchema",
    )
    .then((response) => setActive(response.data))
    .catch(function (error) {
    })
    .then(function () {});
  }

  useEffect(() => {
    getActives();
  }, []);

  const createActive = () => {
    if (activeDescription === "category")
      axios
        .post(
          "http://ec2-54-173-117-139.compute-1.amazonaws.com/api/invoke/createAsset/",
          {
            asset: [
              {
                "@assetType": `${activeDescription}`,
                name: `${activeName}`,
              },
            ],
          }
        )
        .then((response) => {
          console.log(response.data.description);
        })
        .catch(function (error) {
          console.log(error);
          alert("Não foi possivel criar esse ativo!");
        });
    else if (activeSellerDescription === "seller") {
      axios.post(
        "http://ec2-54-173-117-139.compute-1.amazonaws.com/api/invoke/createAsset",
        {
          asset: [
            {
              "@assetType": `${activeSellerDescription}`,
              cnpj: `${activeSellerCNPJ}`,
              name: `${activeSellerName}`,
              address: `${activeSellerCNPJ}`,
              dateJoined: "2021-03-30T03:00:00Z",
            },
          ],
        }
      );
    }
    // else if(activeDescription === 'seller'){
    //   axios.post('http://ec2-54-173-117-139.compute-1.amazonaws.com/api/invoke/createAsset', {
    //     "asset": [
    //       {
    //         "@assetType": "product",
    //          "name": "cell",
    //          "code": "123",
    //          "price": "600",
    //          "soldBy": {"assetType": "seller"}
    //       }
    //     ]
    // })
    // }
    else {
      alert("Esse tipo não está disponível!");
    }
    // listActives();
  };

  const searchActiveType = () => {
    if (
      activeType === "category" ||
      activeType === "product" ||
      activeType === "seller"
    ) {
      axios
        .post(
          "http://ec2-54-173-117-139.compute-1.amazonaws.com/api/query/search",
          {
            query: {
              selector: {
                "@assetType": { activeType },
              },
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const listActives = () => {
    if (actives?.length === 0) {
      return (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    }
    return actives?.map((active) => (<BlockchainContainer active={active}/>));
  };

  return (
    <List>
      <Buttons>
        <p
          style={{
            color: "rgba(0, 0, 0, 0.8)",
            marginBottom: "0",
            fontFamily: "Poppins",
            fontSize: "2rem",
            marginRight: "10vw",
            marginBottom: "0px",
            fontWeight: "600",
          }}
        >
          Blockchain
        </p>
        <input
          type="text"
          onChange={(e) => setActiveType(e.target.value)}
          value={activeType}
          style={{
            backgroundColor: "white",
            height: "5vh",
            width: "400px",
            padding: "2px",
            borderRadius: "0.5rem",
            marginRight: "0.5vw",
            marginBottom: "0.5rem",
          }}
          placeholder="Pesquisar ativo por tipo"
        ></input>
        <Button toDo="Pesquisar" submit={searchActiveType} />
      </Buttons>

      <Blockchain>
        {/* <BlockchainContainer/> */}
        {listActives()}
      </Blockchain>

      <PRegisterActive>
        <p
          style={{
            color: "rgba(0, 0, 0, 0.8)",
            fontFamily: "Poppins",
            fontSize: "2rem",
            fontWeight: "600",
          }}
        >
          Cadastre um ativo
        </p>
      </PRegisterActive>
      <PActive>
        <p
          style={{
            color: "#00B2EE",
            fontFamily: "Poppins",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Categoria
        </p>
      </PActive>

      <input
        style={{
          backgroundColor: "white",
          height: "5vh",
          width: "400px",
          padding: "2px",
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
        }}
        placeholder="Nome"
        onChange={(e) => setActiveName(e.target.value)}
        value={activeName}
      ></input>
      <input
        style={{
          backgroundColor: "white",
          height: "5vh",
          width: "400px",
          padding: "2px",
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
        }}
        placeholder="Tipo"
        onChange={(e) => setActiveDescription(e.target.value)}
        value={activeDescription}
      ></input>

      <ButtonCreateActive>
        <Button toDo="Criar ativo" submit={createActive} />
      </ButtonCreateActive>

      <PActive>
        <p
          style={{
            color: "#00B2EE",
            fontFamily: "Poppins",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Vendedor
        </p>
      </PActive>
      {/* <input placeholder="Nome" onChange={(e) => setActiveName(e.target.value)} value={activeName}></input>
        <input placeholder="Tipo" onChange={(e) => setActiveDescription(e.target.value)} value={activeDescription}></input> */}

      <input
        style={{
          backgroundColor: "white",
          height: "5vh",
          width: "400px",
          padding: "2px",
          borderRadius: "0.5rem",
          marginRight: "0.5vw",
          marginBottom: "0.5rem",
        }}
        placeholder="Nome"
        onChange={(e) => setActiveSellerName(e.target.value)}
        value={activeSellerName}
      ></input>
      <input
        style={{
          backgroundColor: "white",
          height: "5vh",
          width: "400px",
          padding: "2px",
          borderRadius: "0.5rem",
          marginRight: "0.5vw",
          marginBottom: "0.5rem",
        }}
        placeholder="Tipo"
        onChange={(e) => setActiveSellerDescription(e.target.value)}
        value={activeSellerDescription}
      ></input>
      <input
        style={{
          backgroundColor: "white",
          height: "5vh",
          width: "400px",
          padding: "2px",
          borderRadius: "0.5rem",
          marginRight: "0.5vw",
          marginBottom: "0.5rem",
        }}
        placeholder="CNPJ"
        onChange={(e) => setActiveSellerCNPJ(e.target.value)}
        value={activeSellerCNPJ}
      ></input>
      <input
        style={{
          backgroundColor: "white",
          height: "5vh",
          width: "400px",
          padding: "2px",
          borderRadius: "0.5rem",
          marginRight: "0.5vw",
          marginBottom: "0.5rem",
        }}
        placeholder="Endereço"
        onChange={(e) => setActiveSellerAddress(e.target.value)}
        value={activeSellerAddress}
      ></input>
      <ButtonCreateActive>
        <Button toDo="Criar ativo" submit={createActive} />
      </ButtonCreateActive>
{/* 
      <PActive>
        <p
          style={{
            color: "#00B2EE",
            fontFamily: "Poppins",
            fontSize: "2rem",
            fontWeight: "700",
          }}
        >
          Produto
        </p>
      </PActive> */}

      {/* <ImageNotebook>
        <img style={{ width: "50vw" }} src={NotebookHand} />
      </ImageNotebook> */}
    </List>
  );
};

export default Transactions;
