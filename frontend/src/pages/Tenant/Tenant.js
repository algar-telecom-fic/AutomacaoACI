import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api'

import './styles.css';

const Tenant = (props) => {
    const [ name, setName] = useState('')
    const [ description, setDescription] = useState('')
    const [ state, setState] = useState('present')

    const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

    useEffect(() => {
        if(props.header){
            setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
        }
    }, [props.header])

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
        <div className={getStyle}>
            {props.header
            ?
                <div className="h5">Tenant</div>

            :   
                <Header title="Create Tenant"/>
            }
            <form onSubmit={handleSubmit}>
                <div className="col-md-6 mx-auto">
                    <p className="h6">Tenant Name:</p> 
                    <input className="col-sm-12 mx-auto" style={{"minWidth": "50px"}} placeholder="Tenant Name" value={name} onChange={e => setName(e.target.value)}/>
                    <p className="h6 mt-2">Description:</p> 
                    <input className="col-sm-12 mx-auto" style={{"minWidth": "50px"}} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                    <p className="h6 mt-2">State:</p>
                    <select className="col-sm-12 mx-auto" style={{"minWidth": "50px"}} value={state} onChange={e => setState(e.target.value)}>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                    </select>
                    <button className="btn d-block mx-auto mt-2 btn-secondary col-sm-12" style={{"minWidth": "50px"}} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Tenant;