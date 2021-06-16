import React from 'react'
import {Link} from 'react-router-dom';
import './styles.css'
import Header from '../../components/Header/Header';

export default function CreateTenant() {

    return (
        <div className="row m-sm-5 pb-5 px-md-5 bg-light rounded text-center" style={{minWidth: "174px"}}>
            {/* o header está sendo utilizado para identificar o titulo da página indicando o objeto em questão */}
            <Header title="Main Page"/>
            
            <p className="h5">Creating Objects</p>
            {/* Objetos logicos */}
            <p className="h6">Logical Objects</p>
            <div className="card-group mx-auto col-lg-6">
                <div className="card border">
                    <Link style={{textDecoration: "none"}} to="/tenant">
                        <div className="card-body">
                            <p className="card-text">Create Tenant</p>
                        </div>
                    </Link>
                </div>  
                <div className="card mx-sm-2 border">
                    <Link style={{textDecoration: "none"}} to="/vrf">
                        <div className="card-body">
                            <div className="card-text">Create VRF</div>
                        </div>
                    </Link>
                </div>
                <div className="card border">
                    <Link style={{textDecoration: "none"}} to="/epg">
                        <div className="card-body">
                            <div className="card-text">Create EPG</div>
                        </div>
                    </Link>
                </div>
                <div className="card mx-sm-2 border">
                    <Link style={{textDecoration: "none"}} to="/bd">
                        <div className="card-body">
                            <div className="card-text">Create BD</div>
                        </div>
                    </Link>
                </div>
                <div className="card border">
                    <Link style={{textDecoration: "none"}} to="/ap">
                        <div className="card-body">
                            <div className="card-text">Create AP</div>
                        </div>
                    </Link>
                </div>
            </div>
            {/* objetos fisicos */}
            <p className="h6 mt-2">Physical Objects</p>
            <div className="card-group mx-auto col-lg-6">
                <div className="card border">
                    <Link style={{textDecoration: "none"}} to="/domain">
                        <div className="card-body">
                            <p className="card-title">Create Domain</p>
                        </div>
                    </Link>
                </div>
                <div className="card mx-sm-2 border">
                    <Link style={{textDecoration: "none"}} to="/vlanpool">
                        <div className="card-body">
                            <p className="card-title">Create VlanPool</p>
                        </div>
                    </Link>
                </div>
                <div className="card border">
                    <Link style={{textDecoration: "none"}} to="/domain">
                        <div className="card-body">
                            <p className="card-title">Create AAEP</p>
                        </div>
                    </Link>
                </div>
            </div>
        
        </div>
    )
}