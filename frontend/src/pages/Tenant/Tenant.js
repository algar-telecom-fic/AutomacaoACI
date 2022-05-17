import React, { useState } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";

import "./styles.css";

const Tenant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("present");

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      description,
      state,
    };

    await api
      .post("/tenants", { data })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="row pb-5 px-5 m-5 bg-light rounded text-center">
      <Header title="Create Tenant" />

      <form onSubmit={handleSubmit}>
        <div className="col-md-6 mx-auto">
          <p className="h6">Tenant Name:</p>
          <input
            className="col-sm-12 mx-auto"
            placeholder="Tenant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <p className="h6 mt-2">Description:</p>
          <input
            className="col-sm-12 mx-auto"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <p className="h6 mt-2">State:</p>
          <select className="col-sm-12 mx-auto" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <button className="btn d-block mx-auto mt-2 btn-secondary col-sm-12" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tenant;
