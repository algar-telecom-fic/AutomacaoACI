import React, {useEffect, useState} from 'react';
import AlgarLogo from '../../img/algar-logo.png';

import './header.css';

const Header = (props) => {
    return (
        <div class="row mt-5 text-center">
            <img className="mx-auto" style={{minWidth: "50px", minHeight: "25px", width: "15%"}} src={AlgarLogo} alt="Algar logo"/>
            <div className="mt-3 h3">{props.title}</div>
        </div>
    )
}

export default Header;