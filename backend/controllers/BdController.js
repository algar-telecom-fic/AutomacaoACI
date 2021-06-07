const express = require('express');
const fs = require('fs');
const exec = require('child_process').exec;

const createDBBash = "json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_bd.yml";

class BD {
  async index (request,response) {
    try {
      const {BdParam} = request.body; //declara que os parametros do tenant são do corpo da requisição
      if(BdParam){
        if(!BdParam.bd || !BdParam.tenant || !BdParam.vrf){
          throw 'BD Name, VRF or Tenant on BdParam does not exists';
        }
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(BdParam, undefined, 2)) //grava o .json recebido do front!
        // tenant: "{{ tenant }}"
        // vrf: "{{ vrf }}"
        // bd: "{{ bd }}"
        exec(createDBBash, (err,std) => {
          return response.json({created: false, error: err});
          // console.log(err)
          // console.log( std )
        });
        
        return response.status(200).json({createdBD: true, statusMessage: 'BD created successfully.'});
        // return response.json('Todos os dados da VRFa foram atualizados')
      }else{
        throw 'BdParam parameter does not exists';
      }
    } catch (error) {
      return response.status(400).json({createdBD: false, error})
    }
  }
}

module.exports = BD;
