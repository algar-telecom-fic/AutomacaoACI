import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { ProgressBar } from 'primereact/progressbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import Tenant from '../Tenant/Tenant';
import AP from '../AP/AP';
import VRF from '../VRF/VFR';
import BD from '../BD/BD';
import BDSubnet from '../BDSubnet/BDSubnet';
import EPG from '../EPG/EPG';

const Domain = () => {
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


            {getPage === 0
                ?
                    <>
                        <DataTable className="mx-auto" style={{"width": "50%"}} metaKeySelection={false} value={comboTypes} responsiveLayout="scroll" selectionMode="single" selection={getSelectedCombo} onSelectionChange={e => setSelectedCombo(e.value)} dataKey="id">
                            <Column field="id" header="Index"></Column>
                            <Column field="name" header="Code"></Column>
                            <Column field="type" header="Objects"></Column>
                        </DataTable>
                        <br></br>
                        <div className="d-flex p-0 mx-auto mt-2" style={{"width": "50%"}}>
                            <button className="btn d-block btn-success mx-auto mt-2" style={{"width": "50%"}} onClick={confirmStart}>Start</button>
                        </div>
                    </>
                : getPage === 1
                    ?
                        <Tenant header={true}/>
                    : getPage === 2
                        ?
                            <AP header={true}/>
                        : getPage === 3
                            ?  
                                <VRF header={true}/>
                            : getPage === 4
                                ? <BD header={true}/>
                                : getPage === 5
                                    ? <BDSubnet header={true}/>
                                    : getPage === 6
                                        ? <EPG header={true}/>
                                        : 
                                            <>
                                                <div className="h3">Combo 01 Executed</div>
                                            </>
                            
            }
            
            <br></br>
            {getPage === 0
                ?
                    <></>
                :
                <>
                    <div className="d-flex p-0 mx-auto mt-2" style={{"width": "50%"}}>
                        {getPage === 1
                            ?
                                <></>
                            :
                                <button className="btn d-md-flex mx-auto btn-secondary ms-sm-2" style={{width: "15vw"}} onClick={() => setPage(getPage - 1)}>◄ Previous</button>
                        }
                        {getPage === 7
                            ?
                                <></>
                            :
                                <button className="btn d-md-flex mx-auto btn-secondary me-sm-2" style={{width: "15vw"}} onClick={() => setPage(getPage + 1)}>Next ►</button>
                        }
                    </div>
                    <div>
                        <ProgressBar className="d-block my-2 mx-auto px-0" style={{width: "50%"}} value={getPageProportional | 0}></ProgressBar>
                    </div>
                </>
            }
        </div>
    )
}

export default Domain;