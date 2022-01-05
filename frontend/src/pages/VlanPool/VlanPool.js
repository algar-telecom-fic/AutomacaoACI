import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api';

const Domain = () => {
    const [getVlanPool, setVlanPool] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        await api.post('/vlanpool', {vlanpool: getVlanPool}).then(response => {
            if(response.data.createdVlanPool){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdVlanPool)
            }
        }).catch(err => {
            console.log(err)
            alert(err.response.data.error + "1")
        })
    }

    return (
        <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
            <Header title="Create Vlan Pool"/>
            <form onSubmit={handleSubmit}>
                <p className="h6">Pool Name</p>
                <input style={{width: "50%"}} placeholder="Vlan Pool name" value={getVlanPool} onChange={e => setVlanPool(e.target.value)}/>
                <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Domain;