import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { ProgressBar } from 'primereact/progressbar';

import AP from '../AP/AP';
import VRF from '../VRF/VFR';
import BD from '../BD/BD';
import EPG from '../EPG/EPG';

const Combo02 = () => {
    const [getComboSize, setComboSize] = useState(0);
    const [getPage, setPage] = useState(1);
    const [getPageProportional, setPageProportional] = useState(0);

    useEffect(() => {
        setPageProportional(((getPage - 1) / getComboSize) * 100);
    }, [getPage, getComboSize]);

    useEffect(() => {
        getCombosSize();
    }, [])

    async function getCombosSize(){
        await api.get('/combo/02').then(response => {
            if(response.data.combo){
                setComboSize(response.data.length);
            }
        }).catch(err => {
            alert('error')
            console.log(err)
        })
    }
    
    return (
        <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
            <Header title="Combo 02"/>

            {getPage === 1
                ?
                    <AP header={true}/>
                : getPage === 2
                    ?
                        <VRF header={true}/>
                    : getPage === 3
                        ?  
                            <BD header={true}/>
                        : getPage === 4
                            ? 
                                <BD header={true}/>
                            : getPage === 5
                                ? 
                                    <EPG header={true}/>
                                : getPage === 6
                                    ? 
                                        <EPG header={true}/>
                                    : 
                                        <>
                                            <div className="h3">Combo 02 Executed</div>
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

export default Combo02;