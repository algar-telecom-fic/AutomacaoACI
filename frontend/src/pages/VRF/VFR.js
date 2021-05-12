import React, { useState, useEffect } from 'react';
import './styles.css'
import logo from '../../img/algar-logo.png'
import api from '../../services/api'
import Select from 'react-select';
import Header from '../../components/Header/Header';

export default function CreateVRF() {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [tenant, setTenant] = useState('Selecione');
    // const [ vrf, setVrf] = useState('')
    // const [ description, setDescription] = useState('')
    // const [ tenant, setTenantname] = useState('')
    // const [ formatted_tn, setformatted_tn ] = useState('')
    
    // useEffect(() => {
    //     api.get('vrf').then(response => {
    //         setformatted_tn(response.data)
    //     })
    // }, []);
    
    async function handleSubmit(event){
        event.preventDefault();
        const data = {
            name,
            description,
            tenant
        }
        await api.post('/VRF', {VRFParam: data}).then(response => {
            if(response.data.createdVRF){
                alert(response.data.statusMessage)
            }else{
                alert(response.data.createdVRF)
            }
        }).catch(err => {
            if(err.response){
                alert(err.response.data.error)
            }
            console.log(err);
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
        <div className="row m-5 pb-5 px-5 bg-light rounded text-center">
            {/* o header está sendo utilizado para identificar o titulo da página indicando o objeto em questão */}
            <Header title="Create VRF"/>
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
                <select style={{width: "50%"}} value={tenant} onChange={e => setTenant(e.target.value)}>
                    {/* aqui serão listadas as opções para a minha caixa de seleção */}
                    {/* no caso se trata dos tenats já criados */}
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                {/* com button se tem um botão para submeter o conteúdo digitado */}
                <button className="btn d-block mx-auto mt-2 btn-secondary" style={{width: "50%"}} type="submit">Submit</button>
            </form>
        </div>
    )
}