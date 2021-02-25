const express = require('express')
const routes = require('../routes')
const app = express()
const fs = require('fs')
const cors = require('cors')
const exec = require('child_process').exec;


module.exports = {   
    async index (request,response) {
      try {
        const VrfParm = request.body; //declara que os parametros do tenant são do corpo da requisição
        
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(VrfParm, undefined, 2)) //grava o .json recebido do front!
        
        exec("json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_ap.yml", (err,std) => {
          return response.json({created: false, error: err});
          // console.log(err)
          // console.log( std )
        })  
        return response.json({created: true, statusMessage: 'AP criada com sucesso.'});
        // return response.json('Todos os dados da AP foram atualizados')
      } catch (error) {
        return response.json({created: false, error})
      }
    }
}