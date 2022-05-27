import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import Select from "react-select";

import "./styles.css";

const VRF = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tenant, setTenant] = useState();
  const [tenantOptions, setTenantOptions] = useState();

  useEffect(() => {
    getTenantVRF();
  }, []);

  async function getTenantVRF() {
    await api
      .get("/tenants")
      .then((response) => setTenantOptions(response.data))
      .catch((error) => console.log(error));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      description,
      tenant,
    };

    await api
      .post("/vrfs", { data })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="row pb-5 px-5 m-5 bg-light rounded text-center">
      <Header title="Create VRF" />

      <form onSubmit={handleSubmit}>
        <p className="h6">VRF Name:</p>
        <input
          style={{ width: "50%" }}
          placeholder="Tenant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="h6 mt-2">Description:</p>
        <input
          style={{ width: "50%" }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <p className="h6 mt-2">Tenant:</p>
        <Select
          className="col-sm-6 mx-auto"
          defaultValue={tenantOptions}
          options={tenantOptions}
          onChange={(e) => setTenant(e.value)}
        />

        <button className="btn d-block mx-auto mt-2 btn-secondary" style={{ width: "50%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VRF;
