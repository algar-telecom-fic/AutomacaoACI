const express = require('express')
const routes = require('../routes')
const app = express()
const fs = require('fs')
const cors = require('cors')
const exec = require('child_process').exec;

module.exports = {
  

     async listvrfs (request, response) { /* Rota que irá listar as VRFs presentes em um tenant */
      
      exec("ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_vrfs.yml", (err,std) => {
        console.log(err)
        console.log(std)
      })

     
        const queryvrf = fs.readFileSync('./ansible/querys/aci_vrfs.json') //le o arquivo
        const queryvrf_vars = JSON.parse(queryvrf)


          var names = [];
          
              // variável de controle para não pegar o mesmo id
              var containerId;
              for(let i in queryvrf_vars[0].fvTenant.children){
             // atribui o valor de containerId a variável id
             let id = queryvrf_vars[0].fvTenant.children[i].fvCtx.attributes.name;
             // se for diferente, pega o valor de name
             if(containerId != id){
                // redefine o valor da variável com o valor atual
                containerId = id;
                // adiciona as names à array
                names.push(queryvrf_vars[0].fvTenant.children[i].fvCtx.attributes.name);
               }
              }
      
              const queryvrf_formatted = names.map((c) => ({
                label: c,
                value: c,
              })); //QUERY VRFS ON TENANT FIM


          return response.json(queryvrf_formatted)
              

          

    },
   

}