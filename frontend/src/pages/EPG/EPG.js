import React, { useState, useEffect } from 'react';
import './styles.css'
import api from '../../services/api'
import Select from 'react-select';
import Header from '../../components/Header/Header';

const EPG = () => {

    // const [ epg, setEpg] = useState('')
    // const [ vrf, setVrf] = useState('')
    // const [ bd, setBd] = useState('')
    // const [ ap, setAp] = useState('')
    // const [ description, setDescription] = useState('')
    // const [ tenant, setTenantname] = useState('')

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tenant, setTenant] = useState();
    const [vrf, setVrf] = useState('Selecione')
    const [bd, setBd] = useState('Selecione')
    const [ap, setAp] = useState('Selecione')

    const [ tenantOptions, setTenantOptions ] = useState();
    const [ vrfOptions, setVrfOptions ] = useState();
    const [ bdOptions, setBdOptions ] = useState();
    const [ apOptions, setApOptions ] = useState();

    // const [ formatted_tn, setformatted_tn ] = useState('')
    // const [ formatted_vrf, setformatted_vrf ] = useState('')
    // const [ formatted_bd, setformatted_bd ] = useState('')
    // const [ formatted_ap, setformatted_ap ] = useState('')

    useEffect(() => {
        getTenantEPG();
        getVrfEPG();
        getBdEPG();
        getApEPG();
        // api.get('epg').then(response => {
        //     console.log(response)
        //     setTenantOptions(response.data)
        // })
        // api.get('epg/vrfs').then(response => {
        //     setVrfOptions(response.data)
        // })
        // api.get('epg/bd').then(response => {
        //     setBdOptions(response.data)
        // })
        // api.get('epg/ap').then(response => {
        //     setApOptions(response.data)
        // })
    }, [])

    async function getTenantEPG() {
        await api.get('/epg').then(response => {
            if(response.data.showTenants){
                setTenantOptions(response.data.tenants);
            }
        }).catch(err => {
            if(err.response){
                if(err.response.status == 404){
                    alert("Tenants not found!");
                }else{
                    alert(String(err.response.data.error))
                }
            }else{
                alert(String("ERROR!"));
            }
        })      
    }
    
    async function getVrfEPG(){
        await api.get('/epg/vrfs').then(response =>{
            if(response.data.showVrf){
                setVrfOptions(response.data.vrfs);
            }
        }).catch(err => {
            if(err.response){
                if(err.response.status == 404){
                    alert("VRFs not found!");
                }else{
                    alert(String(err.response.data.error))
                }
            }else{
                alert(String("ERROR!"));
            }
        })
    }
    
    async function getBdEPG(){
        await api.get('/epg/bd').then(response =>{
            if(response.data.showBd){
                setBdOptions(response.data.bds);
            }
        }).catch(err => {
            if(err.response){
                if(err.response.status == 404){
                    alert("BDs not found!");
                }else{
                    alert(String(err.response.data.error))
                }
            }else{
                alert(String("ERROR!"));
            }
        })
    }

    async function getApEPG(){
        await api.get('/epg/ap').then(response => {
            if(response.data.showAp){
                setApOptions(response.data.aps);
            }
        }).catch(err => {
            if(err.response.status == 404){
                alert("APs not found!");
            }else{
                alert(String(err.response.data.error))
            }
        })
    }



    // async function handleSubmit(e){ /*Função para post no back (TENANT) */
    //     e.preventDefault()

    //     const data = {
    //         epg,
    //         description,
    //         tenant,
    //         vrf,
    //         bd,
    //         ap,
    //     }
    //     // console.log(data)
    //     await api.post('epg' , data).then(response => {
    //         if(response.data.statusMessage){
    //             alert(response.data.statusMessage)
    //         }else{
    //             alert(response.data.created + " " + response.data.error)
    //         }
    //     })
    // }

    async function handleSubmit(event){
        event.preventDefault();
        const data = {
            epgName: name,
            description,
            tenant,
            vrf,
            bd,
            ap
        }
        await api.post('/epg', {EPGParam: data}).then(response => {
            if(response.data.createdEPG){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdEPG)
            }
        }).catch(err => {
            alert(err.response.data.error)
        })
    }

    return (
        
        <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
            {/* o header está sendo utilizado para identificar o titulo da página indicando o objeto em questão */}
            <Header title="Create EPG"/>
            {/* com o form se tem um formulário para coletar as informações que o usuário deseja */}
            {/* com o onSubmit temos a ação de submissão do formulário */}
            <form className="row px-5" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    {/* com p se trata de um parágrafo respeitando o estilo definido em bootstrap em h6 */}
                    {/* h6 se trata de um título com fonte pequena */}
                    <p className="h6">EPG Name:</p> 
                    {/* com o input se tem uma caixa de entrada para o usuário digitar a informação necessária */}
                    {/* na definição de estilo, width: "50%" diz que irá ficar 50% afastado da borda da largura, com isso o colocando no meio */}
                    {/* placeholder o texto que se inicia na caixa */}
                    {/* value captura o que a pessoa digitou para redefinir o campo */}
                    <input style={{width: "100%"}} placeholder="EPG Name" value={name} onChange={e => setName(e.target.value)} autoFocus required/>
                    <p className="h6 mt-2">Description:</p> 
                    <input style={{width: "100%"}} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required/>
                </div>
                <div className="col-md-6">
                    <p className="h6 mt-md-0 mt-sm-2">Tenant:</p>
                    {/* nesse trecho temos uma caixa de seleção */}
                    <Select className="col-sm-12 mx-auto" defaultValue={tenantOptions} options={tenantOptions} onChange={e => setTenant(e.value)}/>

                    <p className="h6 mt-2">VRF:</p>
                    {/* nesse trecho temos uma caixa de seleção */}
                    <Select className="col-sm-12 mx-auto" defaultValue={vrfOptions} options={vrfOptions} onChange={e => setVrf(e.value)} />

                    <p className="h6 mt-2">Bridge Domain:</p>
                    {/* nesse trecho temos uma caixa de seleção */}
                    <Select className="col-sm-12 mx-auto" defaultValue={bdOptions} options={bdOptions} onChange={e => setBd(e.value)} />

                    <p className="h6 mt-2">Application Profile:</p>
                    {/* nesse trecho temos uma caixa de seleção */}
                    <Select className="col-sm-12 mx-auto" defaultValue={apOptions} options={apOptions} onChange={e => setAp(e.value)} />

                    {/* com button se tem um botão para submeter o conteúdo digitado */}
                </div>
                <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
            </form>
        </div>

    )
}

export default EPG;