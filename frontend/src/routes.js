import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CreateTenant from './pages/Tenant'
import CreateVRF from './pages/VRF'
import CreateBD from './pages/BD'
import CreateAP from './pages/AP'
import CreateEPG from './pages/EPG'



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
            <Route path="/tenant" exact component={CreateTenant} />
            <Route path="/vrf" exact component={CreateVRF} />
            <Route path="/epg" exact component={CreateEPG} />
            <Route path="/bd" exact component={CreateBD} />
            <Route path="/ap" exact component={CreateAP} />



            
            </Switch>
         </BrowserRouter>
    )
}