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
        api.get('ap').then(response => {
            setformatted_tn(response.data)
        })
    }, [])
    
    async function handleSubmit(e){ /*Função para post no back (TENANT) */
        e.preventDefault()

        const data = {
            ap,
            description,
            tenant,
        }
        await api.post('ap' , data).then(response => {
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
                        <h5>Application Profile Name:</h5> 
                        <input placeholder="AP Name" value={ap} onChange={e => setAp(e.target.value)} autoFocus required/>
                                
                        <h5>Description:</h5> 
                        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                        <h5>Tenant: </h5>


                        <Select
                            options={formatted_tn}
                            value={tenant}
                            onChange={e => setTenantname(e.value)}
                            placeholder="Select tenant"
                        />

                        <button className="button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}