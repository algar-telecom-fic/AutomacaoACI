import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import Select from "react-select";

const BD = (props) => {
  const [name, setName] = useState("");
  const [tenantVrf, setTenantVrf] = useState("");
  const [vrf, setVrf] = useState("");
  const [tenantVrfOptions, setTenantVrfOptions] = useState();
  const [vrfOptions, setVrfOptions] = useState();

  useEffect(() => {
    getTenantVrf();
    getVrfBd();
  }, []);

  async function getTenantVrf() {
    await api
      .get("/tenants")
      .then((response) => setTenantVrfOptions(response.data.tenants))
      .catch((error) => console.log(error));
  }

  async function getVrfBd() {
    await api
      .get("/vrfs")
      .then((response) => setVrfOptions(response.data.vrfs))
      .catch((error) => console.log(error));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      bd: name,
      tenant: tenantVrf,
      vrf,
    };

    await api
      .post("/bds", { data })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="row pb-5 px-5 m-5 bg-light rounded text-center">
      <Header title="Create BD" />

      <form onSubmit={handleSubmit}>
        <div className="col-md-6 mx-auto">
          <p className="h6">BD Name:</p>
          <input
            className="col-sm-12 mx-auto"
            style={{ minWidth: "50px" }}
            placeholder="BD Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <p className="h6 mt-2">Tenant:</p>
          <Select
            className="col-sm-12 mx-auto"
            defaultValue={tenantVrfOptions}
            options={tenantVrfOptions}
            onChange={(e) => setTenantVrf(e.value)}
          />

          <p className="h6 mt-2">VRF:</p>
          <Select
            className="col-sm-12 mx-auto"
            defaultValue={vrfOptions}
            options={vrfOptions}
            onChange={(e) => setVrf(e.value)}
          />

          <button className="btn d-block mx-auto mt-2 btn-secondary col-12" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BD;
