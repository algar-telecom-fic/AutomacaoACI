import React from 'react'
import {Link} from 'react-router-dom';
import './styles.css'
import logo from '../../img/algar-logo.png'

export default function CreateTenant() {

    return (
        <div className="logon-container">
            <div className="central">
            
                <img className="logo" src={logo} alt="Algar logo"/>
                
                <h3>Network Automation Tool</h3>
                <h4 className="pb-3">Creating Objects</h4>
                {/* Objetos logicos */}
                <p className="h6">Logical Objects</p>
                <div className="card-group">
                    <div className="card border">
                        <Link style={{textDecoration: "none"}} to="/tenant">
                            <div className="card-body">
                                {/* <button>Tenant</button> */}
                                <p className="card-text">Create Tenant</p>
                            </div>
                        </Link>
                    </div>  
                    <div className="card mx-2 border">
                        <Link style={{textDecoration: "none"}} to="/vrf">
                            <div className="card-body">
                                {/* <button>VRF</button> */}
                                <div className="card-text">Create VRF</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card border">
                        <Link style={{textDecoration: "none"}} to="/epg">
                            <div className="card-body">
                                {/* <button>EPG</button> */}
                                <div className="card-text">Create EPG</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card mx-2 border">
                        <Link style={{textDecoration: "none"}} to="/bd">
                            <div className="card-body">
                                {/* <button>BD</button> */}
                                <div className="card-text">Create BD</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card border">
                        <Link style={{textDecoration: "none"}} to="/ap">
                            <div className="card-body">
                                {/* <button>AP</button> */}
                                <div className="card-text">Create AP</div>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* objetos fisicos */}
                <p className="h6 mt-2">Physical Objects</p>
                <div className="card-group">
                    <div className="card">
                        <Link style={{textDecoration: "none"}} to="/domain">
                            <div className="card-body">
                                {/* <button>Tenant</button> */}
                                <p className="card-title">Create Domain</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        
        </div>
    )
}