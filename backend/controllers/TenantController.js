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
            const merged = {err, stdout}
            response.status(400).json({createdTenant: false, error: merged});
          }else{
            runCommand(cmds, cb);
            return response.status(200).json({createdTenant: true, statusMessage: "Tenant created successfully"});
          }
        });
      }else{
        throw 'TenantParam parameter does not exists';
      }
    } catch(err){
      response.status(400).json({createdTenant: false, error: err});
    }
  }
  async createTenant(TenantParam){
    try{
      console.log(1)
      console.log(TenantParam)
      console.log(TenantParam.name)
      console.log(TenantParam.description)
      if(TenantParam){
        if(TenantParam.name || TenantParam.description){
          fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: TenantParam.name, tenant_descr: TenantParam.description}, null, 2)); //grava o .json recebido do front!

          await exec(json2yaml, {cwd: __dirname}, (err, stdout, stderr) => {
            if(err){
              throw err;
            }else{
              runCommand(cmds, cb);
            }
            console.log(`stdout: ${stdout}`);
          });
          return "Tenant created successfully";
        }else{
          throw 'Name or Description on TenantParam does not exists';
        }
      }else{
        throw 'TenantParam parameter does not exists';
      }
    }catch(err){
      return err;
    }
  }
}

module.exports = TenantController;