import React, { useState, useEffect } from 'react';
import './styles.css'
import logo from '../../img/algar-logo.png'
import api from '../../services/api'
import Select from 'react-select';

export default function CreateEPG() {

    const [ epg, setEpg] = useState('')
    const [ vrf, setVrf] = useState('')
    const [ bd, setBd] = useState('')
    const [ ap, setAp] = useState('')

    const [ description, setDescription] = useState('')
    const [ tenant, setTenantname] = useState('')
    const [ formatted_tn, setformatted_tn ] = useState('')
    const [ formatted_vrf, setformatted_vrf ] = useState('')
    const [ formatted_bd, setformatted_bd ] = useState('')
    const [ formatted_ap, setformatted_ap ] = useState('')

    useEffect(() => {
        api.get('epg').then(response => {
            setformatted_tn(response.data)
        })
        api.get('epg/vrfs').then(response => {
            setformatted_vrf(response.data)
        })
        api.get('epg/bd').then(response => {
            setformatted_bd(response.data)
        })
        api.get('epg/ap').then(response => {
            setformatted_ap(response.data)
        })
    }, [])

    async function handleSubmit(e){ /*Função para post no back (TENANT) */
        e.preventDefault()

        const data = {
            epg,
            description,
            tenant,
            vrf,
            bd,
            ap,
        }
        // console.log(data)
        await api.post('epg' , data).then(response => {
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
                <form onSubmit={handleSubmit}>
                    <div className="roww">
                        <div className="filho">
                        <h5>Endpoint Group Name:</h5> 
                        <input className="EPGinp"
                            placeholder="EPG Name" 
                            value={epg}
                            onChange={e => setEpg(e.target.value)}
                            autoFocus
                            required
                        ></input>
                                
                        <h5>Description:</h5> 
                        <input className="EPGinp"
                            placeholder="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></input>
                                            
                        </div>
                        <div className="filho">
                            <h5>Tenant: </h5>
                            <Select
                                options={formatted_tn}
                                value={tenant}
                                onChange={e => setTenantname(e.value)}
                                placeholder="Select tenant"
                            />
                            <h5>VRF: </h5>
                            <Select
                                options={formatted_vrf}
                                value={vrf}
                                onChange={e => setVrf(e.value)}
                                placeholder="Select VRF"
                            />
                            <h5>Bridge Domain: </h5>
                            <Select
                                options={formatted_bd}
                                value={bd}
                                onChange={e => setBd(e.value)}
                                placeholder="Select BD"
                            /> 
                                <h5>Application Profile: </h5>
                            <Select
                                options={formatted_ap}
                                value={ap}
                                onChange={e => setAp(e.value)}
                                placeholder="Select AP"
                            />
                        </div>
                    </div>
                    <div className="test">
                        <button className="buttonn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
