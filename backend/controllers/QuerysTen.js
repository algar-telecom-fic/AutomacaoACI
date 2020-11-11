const express = require('express')
const routes = require('../routes')
const app = express()
const fs = require('fs')
const cors = require('cors')

module.exports = {

    async get (request,response) {
    
        const querytenant = fs.readFileSync('./ansible/querys/aci_tenants.json') //le o arquivo
        const querytenant_vars = JSON.parse(querytenant) //converte o arquivo "bruto" para json
        var names = [];
          
              // variável de controle para não pegar o mesmo id
              var containerId;
              for(let i in querytenant_vars){
             // atribui o valor de containerId a variável id
             let id = querytenant_vars[i];
             // se for diferente, pega o valor de name
             if(containerId != id){
                // redefine o valor da variável com o valor atual
                containerId = id;
                // adiciona as names à array
                names.push(querytenant_vars[i].fvTenant.attributes.name);
               }
              }
      
              const formatted = names.map((c) => ({
                label: c,
                value: c,
              })); 
              return response.json(formatted)
      },
}