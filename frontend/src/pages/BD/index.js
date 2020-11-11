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
        window.onload = function QueryTenants(){  /* Função para get de Query de tenants (VRF)  */  
        api.get('vrf').then(response => {
        setformatted_tn(response.data)
        })
        }              
      }
      );
      

      useEffect (() => {
        async function QueryVRF() {
          
            api.get('bd/vrfs', tenant).then(response => {
            setformatted_vrf(response.data)})}
            QueryVRF()

      }, [tenant])


    
    async function handleSubmit(e){ /*Função para post no back (TENANT) */
        e.preventDefault()

        const data = {
            bd,
            description,
            tenant,
            vrf,
        }
    console.log(data)
    const response = await api.post('bd' , data)
    alert('BD criado com sucesso!')

    }

    return (
        
        <div className="logon-container">
            <div className="central">
            
                <img className="logo" src={logo} alt="Algar logo"/>
                
                <h1>Network Automation Tool</h1>
                
               
                <div className="item">
                <form onSubmit={handleSubmit}>
                <h2>Bridge Domain Name:</h2> <input
                    placeholder="BD Name" 
                    value={bd}
                    onChange={e => setBd(e.target.value)}
                    ></input>
                          
                <h2>Description:</h2> <input
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></input>
                <h2>Tenant: </h2>


                <Select
                    options={formatted_tn}
                    value={tenant}
                    onChange={e => setTenantname(e.value)}
                    
                    placeholder={tenant}
                    />

                <h2>VRF: </h2>
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