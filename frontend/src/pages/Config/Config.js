import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Header from '../../components/Header/Header';

const Config = (props) => {
    const [getHost, setHost] = useState('');
    const [getUsername, setUsername] = useState('');
    // const [cookies, setCookie, removeCookie] = useCookies(['config']);
    const [, setCookie, ] = useCookies(['config']);
    
    const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");
    
    useEffect(() => {
        if(props.header){
            setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
        }
    }, [props.header])
    
    async function handleSubmit(event){
        event.preventDefault();
        if(getHost && getUsername){
            var configValues = {
                hostname: getHost,
                username: getUsername
            }
            setCookie('config', configValues, { path: '/' });
        }else{
            alert("Host or Username invalid!");
        }
    }

    return (
        <>
            <div className={getStyle}>
                {props.header
                ?
                    <div className="h5">Config</div>
                :   
                    <Header title="Config"/>
                }

                <div class="d-grid gap-2 col-6 mx-auto my-2">
                    <button class="btn btn-secondary" type="button">Check Config Values</button>
                    <button class="btn btn-secondary" type="button">Set Check Values</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <p className="h6">Host</p>
                    <input style={{width: "50%"}} placeholder="Hostname" value={getHost} onChange={e => setHost(e.target.value)}/>
                    
                    <p className="mt-2 h6">Username</p>
                    <input style={{width: "50%"}} placeholder="Username" value={getUsername} onChange={e => setUsername(e.target.value)}/>

                    <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Config;