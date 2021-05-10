const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;
const json2yaml = 'sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_tenant.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class TenantController{
  async create(request, response){
    try{
      const {TenantParam} = request.body;
      if(TenantParam){
        if(!TenantParam.name || !TenantParam.description){
          throw 'Name or Description on TenantParam does not exists';
        }
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: TenantParam.name, description: TenantParam.description}, null, 2)); //grava o .json recebido do front!

        await exec(json2yaml, {cwd: __dirname}, (err, stdout, stderr) => {
          if(err){
            throw err;
          }else{
            runCommand(cmds, cb);
          }
          console.log(`stdout: ${stdout}`);
        });
        return response.status(200).json({createdTenant: true, statusMessage: "Tenant created successfully"});
      }else{
        throw 'TenantParam parameter does not exists';
      }
    } catch(err){
      response.status(400).json({createdTenant: false, error: err});
    }
  }
}

module.exports = TenantController;