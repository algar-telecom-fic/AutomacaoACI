import React, { useState } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";

const Domain = () => {
  const [getAaep, setAaep] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await api
      .post("/aaep", { aep: getAaep })
      .then((response) => {
        console.log(response);
        if (response.data.createdAaep) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.createdAaep);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error.stdout + "!");
      });
  }

  return (
    <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
      <Header title="Create AAEP" />
      <form onSubmit={handleSubmit}>
        <p className="h6">AAEP Name</p>
        <input
          style={{ width: "50%" }}
          placeholder="AAEP name"
          value={getAaep}
          onChange={(e) => setAaep(e.target.value)}
        />
        <button className="btn d-block mx-auto mt-2 btn-secondary" style={{ width: "50%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Domain;
