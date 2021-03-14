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
                
                <div className="card-columns">
                    <div className="card">
                        <Link to="/tenant">
                            <div className="card-body text-center">
                                {/* <button>Tenant</button> */}
                                <div className="card-text">Create Tenant</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card">
                        <Link to="/vrf">
                            <div className="card-body">
                                {/* <button>VRF</button> */}
                                <div className="card-text">Create VRF</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card">
                        <Link to="/epg">
                            <div className="card-body">
                                {/* <button>EPG</button> */}
                                <div className="card-text">Create EPG</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card">
                        <Link to="/bd">
                            <div className="card-body">
                                {/* <button>BD</button> */}
                                <div className="card-text">Create BD</div>
                            </div>
                        </Link>
                    </div>
                    <div className="card">
                        <Link to="/ap">
                            <div className="card-body">
                                {/* <button>AP</button> */}
                                <div className="card-text">Create AP</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        
        </div>
    )
}