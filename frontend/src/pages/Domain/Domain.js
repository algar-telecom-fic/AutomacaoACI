import React, { useState } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";

import "./styles.css";

const Domain = () => {
  const [getDomain, setDomain] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await api
      .post("/domain", { domain: getDomain })
      .then((response) => {
        if (response.data.createdDomain) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.createdDomain);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error.stdout + "!");
      });
  }

  return (
    <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
      <Header title="Create Domain" />
      <form onSubmit={handleSubmit}>
        <p className="h6">Domain</p>
        <input
          style={{ width: "50%" }}
          placeholder="Domain name"
          value={getDomain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button className="btn d-block mx-auto mt-2 btn-secondary" style={{ width: "50%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Domain;
