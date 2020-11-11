import React, { useState } from 'react'
import './styles.css'
import logo from '../../img/algar-logo.png'
import api from '../../services/api'



export default function CreateTenant() {

    const [ name, setName] = useState('')
    const [ description, setDescription] = useState('')
    const [ state, setState] = useState('')

    async function handleSubmit(e){
        e.preventDefault()

        const data = {
            name,
            description,
            state
        }

        const response = await api.post('tenant' , data)

        alert('Tenant criado com sucesso!')

    }

    return (
        <div className="logon-container">
            <div className="central">
            
                <img className="logo" src={logo} alt="Algar logo"/>
                
                <h1>Network Automation Tool</h1>
                
               
                <div className="item">
                <form onSubmit={handleSubmit}>
                <h2>Tenant Name:</h2> <input
                    placeholder="Tenant Name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    ></input>
                          
                <h2>Description:</h2> <input
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></input>
                <h2>State: </h2>
                <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>

                <button className="button" type="submit">Submit</button>

                </form>
                </div>
            </div>
        
        </div>
    )
}