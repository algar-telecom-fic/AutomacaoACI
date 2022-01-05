import React, { useState, useEffect } from 'react';
import './styles.css'
import api from '../../services/api'
import Select from 'react-select';
import Header from '../../components/Header/Header';

const VRF = (props) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tenant, setTenant] = useState();
    const [ tenantOptions, setTenantOptions ] = useState();
    
    const [getStyle, setStyle] = useState("row pb-5 px-5 m-5 bg-light rounded text-center");

    useEffect(() => {
        if(props.header){
            setStyle("row pb-5 px-sm-5 m-auto bg-light rounded text-center");
        }
        getTenantVRF();
    }, [props.header]);

    async function getTenantVRF() {
        await api.get('/vrf').then(response => {
            if(response.data.showTenants){
                setTenantOptions(response.data.tenants);
            }
        }).catch(err => {
            alert(err.response.data.error)
        })
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        const data = {
            name,
            description,
            tenant
        }
        await api.post('/VRF', {VRFParam: data}).then(response => {
            console.log(response)
            if(response.data.createdVRF){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdVRF)
            }
        }).catch(err => {
            if(err.response){
                alert(err.response.data.error)
            }
        })
    }

    return (
        // o div está sendo utilizado como um contêiner para os elementos da tela
        // no caso className são as especificações do estilo do nosso contêiner e estamos utilizando bootstrap para isso 
        // row  - coloca os elementos em linha
        // m-5 - espessura da margem
        // pb-5 - espessura do padding em inferior
        // px-5 - espessura dos outros paddings
        // bg-light - cor do padding
        // rounded - 
        // text-center - centralizar o texto no meio da página
        <div className={getStyle}>
            {/* o header está sendo utilizado para identificar o titulo da página indicando o objeto em questão */}
            {props.header
            ?
            <div className="h5">VRF</div>

            :   
                <Header title="Create VRF"/>
            }
            {/* com o form se tem um formulário para coletar as informações que o usuário deseja */}
            {/* com o onSubmit temos a ação de submissão do formulário */}
            <form onSubmit={handleSubmit}>
                {/* com p se trata de um parágrafo respeitando o estilo definido em bootstrap em h6 */}
                {/* h6 se trata de um título com fonte pequena */}
                <p className="h6">VRF Name:</p> 
                {/* com o input se tem uma caixa de entrada para o usuário digitar a informação necessária */}
                {/* na definição de estilo, width: "50%" diz que irá ficar 50% afastado da borda da largura, com isso o colocando no meio */}
                {/* placeholder o texto que se inicia na caixa */}
                {/* value captura o que a pessoa digitou para redefinir o campo */}
                <input style={{width: "50%"}} placeholder="Tenant Name" value={name} onChange={e => setName(e.target.value)}/>
                <p className="h6 mt-2">Description:</p> 
                <input style={{width: "50%"}} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>
                <p className="h6 mt-2">Tenant:</p>
                {/* nesse trecho temos uma caixa de seleção */}
                {/* <Select style={{width: "50%"}} options={tenantOptions} value={tenant} onChange={e => {setTenant(e.value); console.log(tenant)}} placeholder="Select tenant" /> */}
                {/* aqui serão listadas as opções para a minha caixa de seleção */}
                {/* no caso se trata dos tenats já criados */}
                <Select className="col-sm-6 mx-auto" defaultValue={tenantOptions} options={tenantOptions} onChange={e => setTenant(e.value)} />
                {/* com button se tem um botão para submeter o conteúdo digitado */}
                <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default VRF;