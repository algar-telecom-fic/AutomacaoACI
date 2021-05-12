import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api'

import './styles.css';

const Tenant = () => {
    const [ name, setName] = useState('')
    const [ description, setDescription] = useState('')
    const [ state, setState] = useState('present')


    async function handleSubmit(event){
        event.preventDefault();
        const data = {
            name,
            description,
            state
        }
        await api.post('/tenant', {TenantParam: data}).then(response => {
            if(response.data.createdTenant){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdTenant)
            }
        }).catch(err => {
            alert(err.response.data.error)
        })
    }

    return (
        <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
            <Header title="Create Tenant"/>
            <form onSubmit={handleSubmit}>
                <p className="h6">Tenant Name:</p> 
                <input style={{width: "50%"}} placeholder="Tenant Name" value={name} onChange={e => setName(e.target.value)}/>
                <p className="h6 mt-2">Description:</p> 
                <input style={{width: "50%"}} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                <p className="h6 mt-2">State:</p>
                <select style={{width: "50%"}} value={state} onChange={e => setState(e.target.value)}>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Tenant;