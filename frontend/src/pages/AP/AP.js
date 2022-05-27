import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import Select from "react-select";

const AP = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tenant, setTenant] = useState("");
  const [tenantVrfOptions, setTenantVrfOptions] = useState("");

  useEffect(() => {
    getTenants();
  }, []);

  async function getTenants() {
    await api
      .get("/tenants")
      .then((response) => setTenantVrfOptions(response.data.tenants))
      .catch((error) => console.log(error));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      ap: name,
      description,
      tenant: tenant,
    };

    await api
      .post("/aps", { data })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="row pb-5 px-5 m-5 bg-light rounded text-center">
      <Header title="Create AP" />

      <form onSubmit={handleSubmit}>
        <div className="col-md-6 mx-auto">
          <p className="h6">AP Name:</p>
          <input
            className="col-sm-12 mx-auto"
            style={{ minWidth: "50px" }}
            placeholder="AP Name"
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

          <p className="h6 mt-2">Tenant:</p>
          <Select
            className="col-sm-12 mx-auto"
            defaultValue={tenantVrfOptions}
            options={tenantVrfOptions}
            onChange={(e) => setTenant(e.value)}
          />

          <button className="btn d-block mx-auto mt-2 btn-secondary col-12" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AP;
