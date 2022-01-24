import React from 'react';
import AlgarLogo from '../../img/algar-logo.png';
import {useHistory, useLocation } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

import './header.css';

const Header = (props) => {
    const history = useHistory();
    const location = useLocation();

    const items = [
        {
            label: '',
            icon: 'pi pi-fw pi-arrow-left',
            command: () => {
                history.goBack();
            },
        },
        {
            label: 'Home',
            command: () => {
                history.push('/');
            },
        },
        {
            label: 'Logical Objects',
            items: [
                {
                    label: 'Tenant',
                    command: () => {
                        history.push('/tenant');
                    }
                },
                {
                    label: 'VRF',
                    command: () => {
                        history.push('/vrf');
                    }
                },
                {
                    label: 'EPG',
                    command: () => {
                        history.push('/epg');
                    }
                },
                {
                    label: 'BD',
                    command: () => {
                        history.push('/bd');
                    }
                },
                {
                    label: 'AP',
                    command: () => {
                        history.push('/ap');
                    }
                },
            ]
        },
        {
            label: 'Physical Objects',
            items: [
                {
                    label: 'Domain',
                    command: () => {
                        history.push('/domain');
                    }
                },
                {
                    label: 'VlanPool',
                    command: () => {
                        history.push('/vlanpool');
                    }
                },
                {
                    label: 'AAEP',
                    command: () => {
                        history.push('/aaep');
                    }
                },
                {
                    label: 'Switch Profile',
                    command: () => {
                        history.push('/swprofile');
                    }
                },
                {
                    label: 'Leaf Profile',
                    command: () => {
                        history.push('/leafprof');
                    }
                },

            ]
        },
        {
            label: 'Combos',
            command: () => {
                history.push('/combo');
            },
        },
    ];

    const endMenuBar = <img style={{minWidth: "90px", minHeight: "25px"}} alt="Algar Logo" src={AlgarLogo} height="40"></img>
    // const start = <img className="mt-4 d-md-flex" style={{minWidth: "90px", minHeight: "25px", width: "10%"}} src={AlgarLogo} alt="Algar logo"/>;

    function checkRoute(){
        if(location.pathname === "/"){
            return "";
        }else{
            return items;
        }
    }

    return (
        <>
            <Menubar model={checkRoute()} end={endMenuBar} />
            {/* <img className="mt-4 d-md-flex mx-auto" style={{minWidth: "90px", minHeight: "25px", width: "10%"}} src={AlgarLogo} alt="Algar logo"/> */}
            <div className="row mt-2 text-center mx-auto">
                <div className="mt-3 h3">{props.title}</div>
            </div>
        </>
    )
}

export default Header;