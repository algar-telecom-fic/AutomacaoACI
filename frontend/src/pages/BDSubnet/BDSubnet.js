import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api';

import Select from 'react-select';

const BDSubnet = (props) => {
    const [getBD, setBD] = useState('');
    const [getGateway, setGateway] = useState('');
    const [getMask, setMask] = useState('');

    const [getTenant, setTenant] = useState('');
    const [getTenantOptions, setTenantOptions ] = useState();

    const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

    useEffect(() => {
        if(props.header){
            setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
        }
        getTenantsVrf();
    }, [props.header])

    async function getTenantsVrf(){
        await api.get('/vrf').then(response => {
            if(response.data.showTenants){
                setTenantOptions(response.data.tenants);
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
    
    async function handleSubmit(event){
        event.preventDefault();
        await api.post('/bdsubnet', {tenant: getTenant, bd: getBD, gateway: getGateway, mask: getMask}).then(response => {
            console.log(response)
            if(response.data.createdBdSubnet){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdAaep)
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
                <div className="h5">BD Subnet</div>
            :   
                <Header title="Create BD Subnet"/>
            }
            <form onSubmit={handleSubmit}>
                
                <p className="h6">BD Name</p>
                <input style={{width: "50%"}} placeholder="BD Name" value={getBD} onChange={e => setBD(e.target.value)}/>
                
                <p className="h6 mt-2">Tenant:</p>
                <Select className="col-sm-6 mx-auto" defaultValue={getTenantOptions} options={getTenantOptions} onChange={e => setTenant(e.value)}/>
                
                <p className="mt-2 h6">Gateway</p>
                <input style={{width: "50%"}} placeholder="Gateway value" value={getGateway} onChange={e => setGateway(e.target.value)}/>
                
                <p className="mt-2 h6">Mask</p>
                <input style={{width: "50%"}} placeholder="Mask value" value={getMask} onChange={e => setMask(e.target.value)}/>

                <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default BDSubnet;