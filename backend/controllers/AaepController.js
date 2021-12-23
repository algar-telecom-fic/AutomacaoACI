const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;

const json2yaml = 'json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_aep.yml'; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
     
class AaepController {
  async create(request, response){
    try {
      const {aep} = request.body;
      console.log(aep)
      if(aep){
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({aep: aep}, undefined, 2)) //grava o .json recebido do front!

        await exec(json2yaml, (err,std) => {
          if (err){
            console.log(err)
            // throw "Connection error!" + err;
          }else{
            runCommand(cmds, cb);
          }
          console.log(`stdout: ${std}`);
          return response.status(200).json({createdAaep: true, statusMessage: "AAEP created successfully."});
        });
      }else{
        throw 'aep parameter does not exists';
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({createdAaep: false, error: err});
    }
  }
}

module.exports = AaepController;