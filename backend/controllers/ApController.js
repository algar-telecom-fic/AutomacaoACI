const express = require('express');
const fs = require('fs');
const exec = require('child_process').exec;

const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_ap.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class AP {
  async create(request,response) {
    try {
      const {ApParam} = request.body;
      if(ApParam){
        if(!ApParam.ap || !ApParam.description || !ApParam.tenant){
          throw 'AP Name, description or Tenant on ApParam does not exists';
        }
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(ApParam, undefined, 2));
       
        await exec(json2yaml, {cwd: __dirname}, (err, stdout, stderr) => {
          if (err){
            const merged = {err, stdout}
            return response.status(400).json({createdAP: false, error: merged});
          }else{
            runCommand(cmds, cb);
            return response.status(200).json({createdAP: true, statusMessage: 'AP created successfully.'});
          }
        });
      }else{
        throw 'ApParam parameter does not exists';
      }
    } catch (error) {
      return response.status(400).json({createdAP: false, error: error})
    }
  }
}

module.exports = AP;