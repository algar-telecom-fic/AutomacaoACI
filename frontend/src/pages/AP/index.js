import React, { useState, useEffect } from 'react';
import './styles.css'
import logo from '../../img/algar-logo.png'
import api from '../../services/api'
import Select from 'react-select';




export default function CreateAP() {


    const [ ap, setAp] = useState('')
    const [ description, setDescription] = useState('')
    const [ tenant, setTenantname] = useState('')
    const [ formatted_tn, setformatted_tn ] = useState('')
    


    useEffect(() => {

    window.onload = function QueryTenants(){  /* Função para get de Query de tenants (VRF)*/      
        api.get('ap').then(response => {
        setformatted_tn(response.data)
        })
        }              
      });
    
    async function handleSubmit(e){ /*Função para post no back (TENANT) */
        e.preventDefault()

        const data = {
            ap,
            description,
            tenant,
        }
    console.log(data)
    const response = await api.post('ap' , data)
    alert('Application Profile criada com sucesso!')

    }

    return (
        
        <div className="logon-container">
            <div className="central">
            
                <img className="logo" src={logo} alt="Algar logo"/>
                
                <h1>Network Automation Tool</h1>
                
               
                <div className="item">
                <form onSubmit={handleSubmit}>
                <h2>Application Profile Name:</h2> <input
                    placeholder="AP Name" 
                    value={ap}
                    onChange={e => setAp(e.target.value)}
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

                
                    
                    
               

                <button className="button" type="submit">Submit</button>


                </form>
                </div>
            </div>
        
        </div>
    )
}