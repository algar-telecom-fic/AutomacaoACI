import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import Select from 'react-select';

// import './styles.css';

const BD = (props) => {
    const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    
    const [tenantVrf, setTenantVrf] = useState('');
    const [vrf, setVrf] = useState('');

    const [ tenantVrfOptions, setTenantVrfOptions ] = useState();
    const [ vrfOptions, setVrfOptions ] = useState();

    const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

    useEffect(() => {
        if(props.header){
            setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
        }
        getTenantVrf();
        getVrfBd();
    }, [props.header])

    async function getTenantVrf(){
        await api.get('/tenants').then(response => {
            if(response.data.showTenants){
                setTenantVrfOptions(response.data.tenants);
            }
        }).catch(err => {
            if(err.response){
                if(err.response.status === 404){
                    alert("Tenants not found!");
                }else{
                    alert(String(err.response.data.error))
                }
            }else{
                alert(String("ERROR!"));
            }
        });
    }

    async function getVrfBd(){
        await api.get('/vrfs').then(response => {
            if(response.data.showVrfs){
                setVrfOptions(response.data.vrfs);
            }
        }).catch(err => {
            if(err.response){
                console.log(err.response.data.error)
                alert(err.response.data.error.stdout + "!")
            }else{
                alert(String("ERROR!"));
            }
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        const data = {
            bd: name,
            // description,
            tenant: tenantVrf,
            vrf
        }
        await api.post('/bd', {BdParam: data}).then(response => {
            if(response.data.createdBD){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdBD)
            }
        }).catch(err => {
            console.log(err.response.data.error)
            alert(err.response.data.error.stdout + "!")
        })
    }

    return (
        <div className={getStyle}>
            {props.header
            ?
                <div className="h5">BD</div>
            :   
                <Header title="Create BD"/>
            }
            <form onSubmit={handleSubmit}>
                <div className="col-md-6 mx-auto">
                    <p className="h6">BD Name:</p> 
                    <input className="col-sm-12 mx-auto" style={{"minWidth": "50px"}} placeholder="BD Name" value={name} onChange={e => setName(e.target.value)}/>

                    {/* <p className="h6 mt-2">Description:</p> 
                    <input className="col-sm-12 mx-auto" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/> */}

                    <p className="h6 mt-2">Tenant:</p>
                    <Select className="col-sm-12 mx-auto" defaultValue={tenantVrfOptions} options={tenantVrfOptions} onChange={e => setTenantVrf(e.value)}/>

                    <p className="h6 mt-2">VRF:</p>
                    <Select className="col-sm-12 mx-auto" defaultValue={vrfOptions} options={vrfOptions} onChange={e => setVrf(e.value)}/>

                    <button className="btn d-block mx-auto mt-2 btn-secondary col-12" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default BD;