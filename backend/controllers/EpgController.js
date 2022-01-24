const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;
const createEPGBash = "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_epg.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
const queryBDBash = "ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_bds.yml";

class EpgController {
  async create(request, response){
    try{
      const {EPGParam} = request.body;
      if(EPGParam){
        if(!EPGParam.epgName || !EPGParam.description || !EPGParam.tenant || !EPGParam.vrf || !EPGParam.bd || !EPGParam.ap){
          throw 'EPG Name, Description, Tenant, VRF, BD or AP on EPGParam does not exists';
        }
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(
          {description: EPGParam.description, 
            tenant: EPGParam.tenant,
            description: EPGParam.description,
            ap: EPGParam.ap,
            epg: EPGParam.epgName,
            bd: EPGParam.bd
          }, null, 2)); //grava o .json recebido do front!

        await exec(createEPGBash, {cwd: __dirname}, (err, stdout, stderr) => {
          if (err){
              const merged = {err, stdout}
              return response.status(400).json({createdEPG: false, error: merged});
          }else{
              runCommand(cmds, cb);
              return response.status(200).json({createdEPG: true, statusMessage: "EPG created successfully"});
            }
      });

      }else{
        throw 'EPGParam parameter does not exists';
      }
    }catch(err){
      return response.status(400).json({createdEPG: false, error: err});
    }
  }

  async index (request, response) { /* Rota que irá listar os BDs presentes em um tenant */
    try{
      const queryvrf = fs.readFileSync('./ansible/querys/aci_bds.json') //le o arquivo
      const queryvrf_vars = JSON.parse(queryvrf)
      var names = [];
    
      // variável de controle para não pegar o mesmo id
      let containerId;
      for(let i in queryvrf_vars.current[0].fvTenant.children){
        // atribui o valor de containerId a variável id
        let id = queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name;
        // se for diferente, pega o valor de name
        if(containerId != id){
          // redefine o valor da variável com o valor atual
          containerId = id;
          // adiciona as names ao array
          names.push(queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name);
        }
      }
      const queryvrf_formatted = names.map((c) => ({
        label: c,
        value: c,
      })); //QUERY VRFS ON TENANT FIM
      return response.status(200).json({showBd: true, bds: queryvrf_formatted})

    }catch(err){
      return response.status(400).json({showBd: false, error: err});
    }
  }
}

module.exports = EpgController;

// module.exports = {

//     async index (request,response) {
//       try {
//         const VrfParm = request.body; //declara que os parametros do tenant são do corpo da requisição
    
//           fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(VrfParm, undefined, 2)) //grava o .json recebido do front!
  
//           exec("json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_epg.yml", (err,std) => {
//             return response.json({created: false, error: err});
//             // console.log(err)
//             // console.log( std )
//           })
//           return response.json({created: true, statusMessage: 'EPG criado com sucesso.'});
  
//           // return response.json('Todos os dados da VRFa foram atualizados')
//       } catch (error) {
//         return response.json({created: false, error})

//       }
//     },
  
//     async listbds (request, response) { /* Rota que irá listar os BDs presentes em um tenant */
//       exec("ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_bds.yml", (err,std) => {
//         console.log(err)
//         console.log( std )
//       })
//       const queryvrf = fs.readFileSync('./ansible/querys/aci_bds.json') //le o arquivo
//       const queryvrf_vars = JSON.parse(queryvrf)
//       var names = [];
    
//       // variável de controle para não pegar o mesmo id
//       var containerId;
//       for(let i in queryvrf_vars.current[0].fvTenant.children){
//       // atribui o valor de containerId a variável id
//       let id = queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name;
//       // se for diferente, pega o valor de name
//       if(containerId != id){
//         // redefine o valor da variável com o valor atual
//         containerId = id;
//         // adiciona as names à array
//         names.push(queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name);
//         }
//       }
//       const queryvrf_formatted = names.map((c) => ({
//         label: c,
//         value: c,
//       })); //QUERY VRFS ON TENANT FIM
//       return response.json(queryvrf_formatted)
  
//     },

//     async listap (request, response) { /* Rota que irá listar os Ap's presentes em um tenant */
//       exec("ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_aps.yml", (err,std) => {
//         console.log(err)
//         console.log(std)
//       })
//       const queryvrf = fs.readFileSync('./ansible/querys/aci_aps.json') //le o arquivo
//       const queryvrf_vars = JSON.parse(queryvrf)

//       var names = [];
    
//       // variável de controle para não pegar o mesmo id
//       var containerId;
//       for(let i in queryvrf_vars.current[0].fvTenant.children){
//       // atribui o valor de containerId a variável id
//       let id = queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name;
//       // se for diferente, pega o valor de name
//       if(containerId != id){
//         // redefine o valor da variável com o valor atual
//         containerId = id;
//         // adiciona as names à array
//         names.push(queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name);
//         }
//       }
//       const queryvrf_formatted = names.map((c) => ({
//         label: c,
//         value: c,
//       })); //QUERY VRFS ON TENANT FIM

//       return response.json(queryvrf_formatted)
//     },
// }