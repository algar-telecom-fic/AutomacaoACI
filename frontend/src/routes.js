import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CreateTenant from './pages/Tenant/Tenant';
import CreateBD from './pages/BD/BD'
import CreateAP from './pages/AP'
import CreateEPG from './pages/EPG/EPG';
import Main from './pages/Main/Main';

import CreateVRF from './pages/VRF/VFR';

import Domain from './pages/Domain/Domain';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/tenant" exact component={CreateTenant} />
                <Route path="/vrf" exact component={CreateVRF} />
                <Route path="/epg" exact component={CreateEPG} />
                <Route path="/bd" exact component={CreateBD} />
                <Route path="/ap" exact component={CreateAP} />
                
                <Route path="/domain" exact component={Domain} />
            </Switch>
         </BrowserRouter>
    )
}