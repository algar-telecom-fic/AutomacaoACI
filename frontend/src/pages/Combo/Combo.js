import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import {useHistory} from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Domain = () => {
    const history = useHistory();
    const [getComboSize, setComboSize] = useState(0);
    const [getPage, setPage] = useState(0);
    const [getPageProportional, setPageProportional] = useState(0);
    const [getSelectedCombo, setSelectedCombo] = useState(null);

    useEffect(() => {
        setPageProportional(((getPage - 1) / getComboSize) * 100);
    }, [getPage, getComboSize]);

    useEffect(() => {
        getCombosSize();
    }, [])

    async function getCombosSize(){
        await api.get('/combo/01').then(response => {
            if(response.data.combo){
                setComboSize(response.data.length);
            }
        }).catch(err => {
            alert('error')
            console.log(err)
        })
    }

    function confirmStart(){
        if(!getSelectedCombo){
            alert("Select a Combo!");
            return;
        }
        if(window.confirm("Do you want to start with " + getSelectedCombo.name + "?")){
            console.log(getSelectedCombo)
            if(getSelectedCombo.id === 0){
                history.push('/combo/01');
            }
            setPage(1)
        }else{
            alert("Operation canceled!");
        }
    }

    const comboTypes = [
        {
            "id": 0,
            "name": "Combo 01",
            "type": "Tenant, AP, VRF, BD, BD_Subnet, EPG"  
        },
        {
            "id": 1,
            "name": "Combo 02",
            "type": "cassasdsa"  
        },
    ]

    
    return (
        <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
            <Header title="Combos"/>
            <>
                <DataTable className="mx-auto" style={{"width": "50%"}} metaKeySelection={false} value={comboTypes} responsiveLayout="scroll" selectionMode="single" selection={getSelectedCombo} onSelectionChange={e => setSelectedCombo(e.value)} dataKey="id">
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="type" header="Objects"></Column>
                </DataTable>
                <br></br>
                <div className="d-flex p-0 mx-auto mt-2" style={{"width": "50%"}}>
                    <button className="btn d-block btn-success mx-auto mt-2" style={{"width": "50%"}} onClick={confirmStart}>Start</button>
                </div>
            </>
        </div>
    )
}

export default Domain;




























