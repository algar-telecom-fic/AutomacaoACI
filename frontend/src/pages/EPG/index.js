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

    window.onload = function QueryTenants(){  /* Função para get de Query de tenants (epg)*/      
        api.get('epg').then(response => {
        setformatted_tn(response.data)
        })
        }              
      });


      useEffect (() => {
        async function QueryVRF() {
          
            api.get('epg/vrfs').then(response => {
            setformatted_vrf(response.data)})}
            QueryVRF()

      }, [tenant])


      useEffect (() => {
        async function QueryVRF() {
          
            api.get('epg/bd').then(response => {
            setformatted_bd(response.data)})}
            QueryVRF()

      }, [tenant])

      useEffect (() => {
        async function QueryVRF() {
          
            api.get('epg/ap').then(response => {
            setformatted_ap(response.data)})}
            QueryVRF()

      }, [tenant])


      
    
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
    console.log(data)
    const response = await api.post('epg' , data)
    alert('EPG criado com sucesso!')

    }

    return (
        
        <div className="logon-container">

            <div className="central">
            <img className="logo" src={logo} alt="Algar logo"/>

            <h1>Network Automation Tool</h1>
            <form onSubmit={handleSubmit}>
            <div className="roww">
                <div className="filho">
                <h2>Endpoint Group Name:</h2> <input className="EPGinp"
                    placeholder="EPG Name" 
                    value={epg}
                    onChange={e => setEpg(e.target.value)}
                    ></input>
                          
                <h2>Description:</h2> <input className="EPGinp"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></input>
                     
                
                </div>


                <div className="filho">
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
                     <h2>Bridge Domain: </h2>
                <Select
                    options={formatted_bd}
                    value={bd}
                    onChange={e => setBd(e.value)}
                    placeholder={bd}
                    /> <h2>Application Profile: </h2>
                    <Select
                        options={formatted_ap}
                        value={ap}
                        onChange={e => setAp(e.value)}
                        placeholder={ap}
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
