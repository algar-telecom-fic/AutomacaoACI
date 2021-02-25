const express = require('express')
const routes = require('../routes')
const app = express()
const fs = require('fs')
const cors = require('cors')
const spawn = require('cross-spawn');
const exec = require('child_process').exec;

const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE


module.exports = {

    async index (request,response) {
      try {
        const VrfParm = request.body; //declara que os parametros do tenant são do corpo da requisição
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(VrfParm, undefined, 2)) //grava o .json recebido do front!
        // console.log(VrfParm) //le as informações vindas do front   
        exec("json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_vrf.yml", (err,std) => {
          return response.json({created: false, error: err});
          // console.log(err)
          // console.log( std )
        })
         /*execSync(json2yaml, {
            cwd: __dirname
          }, (err, stdout, stderr) => {
            console.log(stdout);
            if (err) console.log(err);
            else  runCommand(cmds, cb);
          });*/
        // return response.json({created: true, statusMessage: 'Todos os dados da VRF foram atualizados.'});
        return response.json({created: true, statusMessage: 'VRF criada com sucesso.'});
      } catch (error) {
        console.log(error)
        return response.json({created: false, error})
      }
    }
}