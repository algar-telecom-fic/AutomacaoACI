import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Select from "react-select";
import Header from "../../components/Header/Header";

// import './styles.css';

const Querys = (props) => {
  const [getTenant, setTenant] = useState();
  const [tenantOptions, setTenantOptions] = useState();
  const [getSiteId, setSiteId] = useState();
  const [getSwId, setSwId] = useState();
  const [getLoading, setLoading] = useState(false);

  const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

  useEffect(() => {
    if (props.header) {
      setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
    }
    getTenantFunction();
  }, [props.header]);

  async function getTenantFunction() {
    await api
      .get("/tenants")
      .then((response) => {
        if (response.data.showTenants) {
          setTenantOptions(response.data.tenants);
        }
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  async function updateTenant() {
    setLoading(true);
    await api
      .put("/update/query/tenant")
      .then((response) => {
        if (response.data.updateQueryTenant) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.updateQueryTenant);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
          alert(err.response.data.error.stdout + "!");
        }
      });
    setLoading(false);
  }

  async function updateAp() {
    const data = {
      tenant: getTenant,
    };
    setLoading(true);
    await api
      .put("/update/query/ap", { APParam: data })
      .then((response) => {
        if (response.data.updateQueryAp) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.updateQueryAp);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
          alert(err.response.data.error.stdout + "!");
        }
      });
    setLoading(false);
  }

  async function updateBd() {
    const data = {
      tenant: getTenant,
    };
    setLoading(true);
    await api
      .put("/update/query/bd", { BDParam: data })
      .then((response) => {
        if (response.data.updateQueryBd) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.updateQueryBd);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
          alert(err.response.data.error.stdout + "!");
        }
      });
    setLoading(false);
  }

  async function updateVrf() {
    const data = {
      tenant: getTenant,
    };
    setLoading(true);
    await api
      .put("/update/query/bd", { BDParam: data })
      .then((response) => {
        if (response.data.updateQueryBd) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.updateQueryBd);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.error);
          alert(err.response.data.error.stdout + "!");
        }
      });
    setLoading(false);
  }

  async function UpdateSW(event) {
    event.preventDefault();
    const data = {
      siteId: getSiteId,
      swId: getSwId,
    };
    setLoading(true);
    await api
      .put("/update/query/swprofile", { SwProfParam: data })
      .then((response) => {
        if (response.data.createdSwProfile) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.createdSwProfile);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error.stdout + "!");
      });
    setLoading(false);
  }

  return (
    <div className={getStyle}>
      {props.header ? <div className="h5">Querys</div> : <Header title="Update Querys" />}
      <button
        className="btn d-block mx-auto mt-2 btn-secondary"
        style={{ width: "50%" }}
        onClick={() => updateTenant()}
      >
        Update Tenants List
      </button>
      <p className="h6 mt-2">To view more update tasks, select a tenant bellow</p>
      <p className="h6 mt-2">Select Tenant:</p>
      <Select
        className="col-sm-6 d-block mx-auto mt-2"
        defaultValue={tenantOptions}
        options={tenantOptions}
        onChange={(e) => setTenant(e.value)}
      />
      <br></br>
      {getTenant ? (
        <div>
          <button
            className="btn d-block mx-auto mt-2 btn-secondary"
            style={{ width: "50%" }}
            onClick={() => updateAp()}
          >
            Update AP
          </button>
          <button
            className="btn d-block mx-auto mt-2 btn-secondary"
            style={{ width: "50%" }}
            onClick={() => updateBd()}
          >
            Update BD
          </button>
          <button
            className="btn d-block mx-auto mt-2 btn-secondary"
            style={{ width: "50%" }}
            onClick={() => updateVrf()}
          >
            Update VRF
          </button>
          <button
            className="btn d-block mx-auto mt-2 btn-secondary"
            style={{ width: "50%" }}
            onClick={() => {
              updateAp();
              updateBd();
              updateVrf();
            }}
          >
            Update AP, BD and VRF
          </button>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={UpdateSW}>
        <p className="h6 mt-2">Site Id:</p>
        <input
          style={{ width: "50%" }}
          placeholder="Site Id"
          value={getSiteId}
          onChange={(e) => setSiteId(e.target.value)}
        />
        <p className="h6 mt-2">Switch Profile ID:</p>
        <input
          style={{ width: "50%" }}
          placeholder="Switch Profile Id"
          value={getSwId}
          onChange={(e) => setSwId(e.target.value)}
        />
        <button className="btn d-block mx-auto mt-2 btn-secondary" style={{ width: "50%" }} type="submit">
          Update SW List
        </button>
      </form>
      <br></br>

      {getLoading ? (
        <div className="mt-3">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2em" }}></i>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Querys;
