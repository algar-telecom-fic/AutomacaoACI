import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import Select from "react-select";

// import './styles.css';

const AP = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [tenant, setTenant] = useState("");
  const [tenantVrfOptions, setTenantVrfOptions] = useState("");

  const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

  useEffect(() => {
    if (props.header) {
      setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
    }
    getTenant();
  }, [props.header]);

  async function getTenant() {
    await api
      .get("/tenants")
      .then((response) => {
        if (response.data.showTenants) {
          setTenantVrfOptions(response.data.tenants);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            alert("Tenants not found!");
          } else {
            alert(String(err.response.data.error));
          }
        } else {
          alert(String("ERROR!"));
        }
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      ap: name,
      description,
      tenant: tenant,
    };
    await api
      .post("/ap", { ApParam: data })
      .then((response) => {
        if (response.data.createdAP) {
          alert(response.data.statusMessage);
        } else {
          alert(response.data.createdAP);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        alert(err.response.data.error.stdout + "!");
        // alert(err.response.data.createdAP)
        // alert(err.response.data.error)
      });
  }

  return (
    <div className={getStyle}>
      {props.header ? <div className="h5">AP</div> : <Header title="Create AP" />}

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

// import React, { useState, useEffect } from 'react';
// import './styles.css'
// import logo from '../../img/algar-logo.png'
// import api from '../../services/api'
// import Select from 'react-select';

// export default function CreateAP() {

//     const [ ap, setAp] = useState('')
//     const [ description, setDescription] = useState('')
//     const [ tenant, setTenantname] = useState('')
//     const [ formatted_tn, setformatted_tn ] = useState('')

//     useEffect(() => {
//         api.get('ap').then(response => {
//             setformatted_tn(response.data)
//         })
//     }, [])

//     async function handleSubmit(e){ /*Função para post no back (TENANT) */
//         e.preventDefault()

//         const data = {
//             ap,
//             description,
//             tenant,
//         }
//         await api.post('ap' , data).then(response => {
//             if(response.data.statusMessage){
//                 alert(response.data.statusMessage)
//             }else{
//                 alert(response.data.created + " " + response.data.error)
//             }
//         })
//     }

//     return (

//         <div className="logon-container">
//             <div className="central">

//                 <img className="logo" src={logo} alt="Algar logo"/>

//                 <h3>Network Automation Tool</h3>

//                 <div className="item">
//                     <form onSubmit={handleSubmit}>
//                         <h5>Application Profile Name:</h5>
//                         <input placeholder="AP Name" value={ap} onChange={e => setAp(e.target.value)} autoFocus required/>

//                         <h5>Description:</h5>
//                         <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
//                         <h5>Tenant: </h5>

//                         <Select
//                             options={formatted_tn}
//                             value={tenant}
//                             onChange={e => setTenantname(e.value)}
//                             placeholder="Select tenant"
//                         />

//                         <button className="button" type="submit">Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }
