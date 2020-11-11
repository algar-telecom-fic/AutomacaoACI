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
      
        exec("json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_ap.yml", (err,std) => {
          console.log(err)
          console.log( std )
        })  


          
        return response.json('Todos os dados da AP foram atualizados')

    }

}