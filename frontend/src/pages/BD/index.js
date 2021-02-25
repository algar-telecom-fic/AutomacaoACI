import React, { useState, useEffect } from 'react';
import './styles.css'
import logo from '../../img/algar-logo.png'
import api from '../../services/api'
import Select from 'react-select';




export default function CreateBD() {


    const [ bd, setBd] = useState('')
    const [ vrf, setVrf] = useState('')
    const [ description, setDescription] = useState('')
    const [ tenant, setTenantname] = useState('')
    const [ formatted_tn, setformatted_tn ] = useState('')
    const [ formatted_vrf, setformatted_vrf ] = useState('')
    
    useEffect(() => {
        api.get('vrf').then(response => {
            console.log(response)
            setformatted_tn(response.data)
        })
        api.get('bd/vrfs', tenant).then(response => {
            setformatted_vrf(response.data)
        })
    }, [])
    
    async function handleSubmit(e){ /*Função para post no back (TENANT) */
        e.preventDefault()

        const data = {
            bd,
            description,
            tenant,
            vrf,
        }
        await api.post('bd' , data).then(response => {
            if(response.data.statusMessage){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.created + " " + response.data.error)
            }
        })
    }

    return (
        
        <div className="logon-container">
            <div className="central">
            
                <img className="logo" src={logo} alt="Algar logo"/>
                
                <h3>Network Automation Tool</h3>
                
               
                <div className="item">
                    <form onSubmit={handleSubmit}>
                        <h5>Bridge Domain Name:</h5> 
                        <input placeholder="BD Name" value={bd} onChange={e => setBd(e.target.value)}/>
                                
                        <h5>Description:</h5> 
                        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                        <h5>Tenant: </h5>
                        <Select
                            options={formatted_tn}
                            value={tenant}
                            onChange={e => setTenantname(e.value)}                            
                            placeholder={tenant}
                        />

                        <h5>VRF: </h5>
                        <Select
                            options={formatted_vrf}
                            value={vrf}
                            onChange={e => setVrf(e.value)}
                            placeholder={vrf}
                        />   
                        <button className="button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}