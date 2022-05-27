import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import Select from "react-select";

const BDSubnet = (props) => {
  const [getBD, setBD] = useState("");
  const [getGateway, setGateway] = useState("");
  const [getMask, setMask] = useState("");
  const [getTenant, setTenant] = useState("");
  const [getTenantOptions, setTenantOptions] = useState();

  useEffect(() => {
    getTenantsVrf();
  }, []);

  async function getTenantsVrf() {
    await api
      .get("/tenants")
      .then((response) => setTenantOptions(response.data.tenants))
      .catch((error) => console.log(error));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await api
      .post("/bdsubnets", { tenant: getTenant, bd: getBD, gateway: getGateway, mask: getMask })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="row pb-5 px-5 m-5 bg-light rounded text-center">
      <Header title="Create BD Subnet" />

      <form onSubmit={handleSubmit}>
        <p className="h6">BD Name</p>
        <input style={{ width: "50%" }} placeholder="BD Name" value={getBD} onChange={(e) => setBD(e.target.value)} />

        <p className="h6 mt-2">Tenant:</p>
        <Select
          className="col-sm-6 mx-auto"
          defaultValue={getTenantOptions}
          options={getTenantOptions}
          onChange={(e) => setTenant(e.value)}
        />

        <p className="mt-2 h6">Gateway</p>
        <input
          style={{ width: "50%" }}
          placeholder="Gateway value"
          value={getGateway}
          onChange={(e) => setGateway(e.target.value)}
        />

        <p className="mt-2 h6">Mask</p>
        <input
          style={{ width: "50%" }}
          placeholder="Mask value"
          value={getMask}
          onChange={(e) => setMask(e.target.value)}
        />

        <button className="btn d-block mx-auto mt-2 btn-secondary" style={{ width: "50%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BDSubnet;
