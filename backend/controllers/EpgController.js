const express = require('express')
const routes = require('../routes')
const app = express()
const fs = require('fs')
const cors = require('cors')
const exec = require('child_process').exec;



module.exports = {
    

    async index (request,response) {



        const VrfParm = request.body; //declara que os parametros do tenant são do corpo da requisição
  
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(VrfParm, undefined, 2)) //grava o .json recebido do front!
          

      
        console.log(VrfParm) //le as informações vindas do front
      
      
        exec("json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_epg.yml", (err,std) => {
          console.log(err)
          console.log( std )
        })


          
        return response.json('Todos os dados da VRFa foram atualizados')

    },
  

    async listbds (request, response) { /* Rota que irá listar os BDs presentes em um tenant */


                      
      exec("ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_bds.yml", (err,std) => {
        console.log(err)
        console.log(std)
      })
  

            const queryvrf = fs.readFileSync('./ansible/querys/aci_bds.json') //le o arquivo
            const queryvrf_vars = JSON.parse(queryvrf)
        
                                
  
            var names = [];
          
              // variável de controle para não pegar o mesmo id
              var containerId;
              for(let i in queryvrf_vars.current[0].fvTenant.children){
             // atribui o valor de containerId a variável id
             let id = queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name;
             // se for diferente, pega o valor de name
             if(containerId != id){
                // redefine o valor da variável com o valor atual
                containerId = id;
                // adiciona as names à array
                names.push(queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name);
               }
              }
              
      
              const queryvrf_formatted = names.map((c) => ({
                label: c,
                value: c,
              })); //QUERY VRFS ON TENANT FIM
         


          
          
            

            return response.json(queryvrf_formatted)
  
    },

    async listap (request, response) { /* Rota que irá listar os Ap's presentes em um tenant */
          
    exec("ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_aps.yml", (err,std) => {
      console.log(err)
      console.log(std)
    })
            const queryvrf = fs.readFileSync('./ansible/querys/aci_aps.json') //le o arquivo
            const queryvrf_vars = JSON.parse(queryvrf)
        
                                
  
            var names = [];
          
              // variável de controle para não pegar o mesmo id
              var containerId;
              for(let i in queryvrf_vars.current[0].fvTenant.children){
             // atribui o valor de containerId a variável id
             let id = queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name;
             // se for diferente, pega o valor de name
             if(containerId != id){
                // redefine o valor da variável com o valor atual
                containerId = id;
                // adiciona as names à array
                names.push(queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name);
               }
              }
              
      
              const queryvrf_formatted = names.map((c) => ({
                label: c,
                value: c,
              })); //QUERY VRFS ON TENANT FIM
         


          
          
            

            return response.json(queryvrf_formatted)

    },






}