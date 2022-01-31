import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import CreateTenant from './pages/Tenant/Tenant';
import CreateBD from './pages/BD/BD'
import CreateAP from './pages/AP/AP'
import CreateEPG from './pages/EPG/EPG';
import Main from './pages/Main/Main';

import CreateVRF from './pages/VRF/VFR';

import Domain from './pages/Domain/Domain';
import VlanPool from './pages/VlanPool/VlanPool';
import Aaep from './pages/Aaep/Aaep';
import BDSubnet from './pages/BDSubnet/BDSubnet';
import SwProfile from './pages/SwitchProfile/SwitchProfile';
import LeafProfile from './pages/LeafProfile/LeafProfile';

import Combo from './pages/Combo/Combo';
import Combo01 from './pages/Combo/Combo01';
import Combo02 from './pages/Combo/Combo02';

import Querys from './pages/Update/Querys';

import Config from './pages/Config/Config';

import About from './pages/About/About';

import NotFound from './pages/NotFound/NotFound';

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
                <Route path="/vlanpool" exact component={VlanPool} />
                <Route path="/aaep" exact component={Aaep} />
                <Route path="/bdsubnet" exact component={BDSubnet} />
                <Route path="/swprofile" exact component={SwProfile} />
                <Route path="/leafprof" exact component={LeafProfile} />
                
                <Route path="/combo" exact component={Combo} />
                <Route path="/combo/01" exact component={Combo01} />
                <Route path="/combo/02" exact component={Combo02} />
                
                <Route path="/update/querys" exact component={Querys} />
                
                <Route path="/config" exact component={Config} />
                
                <Route path="/about" exact component={About} />
                
                <Route path="/404" component={NotFound}/>
                <Redirect to="/404"/>
            </Switch>
         </BrowserRouter>
    )
}