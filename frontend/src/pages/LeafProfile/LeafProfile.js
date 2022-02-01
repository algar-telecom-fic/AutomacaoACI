import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";

const LeafProfile = (props) => {
  const [getSiteId, setSiteId] = useState("");
  const [getSwId, setSwId] = useState("");

  const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

  useEffect(() => {
    if (props.header) {
      setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
    }
  }, [props.header]);

  async function handleSubmit(event) {
    event.preventDefault();
    await api
      .post("/leafprof", { site_id: getSiteId, sw_id: getSwId })
      .then((response) => {
        console.log(response);
        if (response.data.createdLeafProfile) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.createdLeafProfile);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error.stdout + "!");
      });
  }

  return (
    <div className={getStyle}>
      {props.header ? <div className="h5">Leaf Profile</div> : <Header title="Create Leaf Profile" />}
      <form onSubmit={handleSubmit}>
        <p className="h6">Site ID</p>
        <input
          style={{ width: "50%" }}
          placeholder="Site ID"
          value={getSiteId}
          onChange={(e) => setSiteId(e.target.value)}
        />

        <p className="mt-2 h6">Leaf Profile ID</p>
        <input
          style={{ width: "50%" }}
          placeholder="Gateway value"
          value={getSwId}
          onChange={(e) => setSwId(e.target.value)}
        />

        <button className="btn d-block mx-auto mt-2 btn-secondary" style={{ width: "50%" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeafProfile;
