const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;
const json2yaml =
  "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_tenant.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
const createTenantBash = "./ansible/querys/aci_tenants.json";

class TenantController {
  async create(request, response) {
    try {
      const { TenantParam } = request.body;
      if (TenantParam) {
        if (!TenantParam.name || !TenantParam.description) {
          throw "Name or Description on TenantParam does not exists";
        }
        fs.writeFileSync(
          "./ansible/json/vars.json",
          JSON.stringify({ tenant: TenantParam.name, description: TenantParam.description }, null, 2)
        ); //grava o .json recebido do front!

        await exec(json2yaml, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            const merged = { err, stdout };
            response.status(400).json({ createdTenant: false, error: merged });
          } else {
            runCommand(cmds, cb);
            return response.status(200).json({ createdTenant: true, statusMessage: "Tenant created successfully" });
          }
        });
      } else {
        throw "TenantParam parameter does not exists";
      }
    } catch (err) {
      response.status(400).json({ createdTenant: false, error: err });
    }
  }

  async index(request, response) {
    try {
      const querytenant = fs.readFileSync(createTenantBash); //le o arquivo
      const querytenant_vars = JSON.parse(querytenant); //converte o arquivo "bruto" para json
      var names = [];

      // variável de controle para não pegar o mesmo id
      var containerId;
      for (let i in querytenant_vars) {
        // atribui o valor de containerId a variável id
        let id = querytenant_vars[i];
        // se for diferente, pega o valor de name
        if (containerId != id) {
          // redefine o valor da variável com o valor atual
          containerId = id;
          names.push(querytenant_vars[i].fvTenant.attributes.name);
        }
      }
      const formattedTenants = names.map((c) => ({
        label: c,
        value: c,
      }));
      return response.status(200).json({ showTenants: true, tenants: formattedTenants });
    } catch (err) {
      return response.status(400).json({ showTenants: false, error: err });
    }
  }
  // async createTenant(TenantParam){
  //   try{
  //     console.log(1)
  //     console.log(TenantParam)
  //     console.log(TenantParam.name)
  //     console.log(TenantParam.description)
  //     if(TenantParam){
  //       if(TenantParam.name || TenantParam.description){
  //         fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: TenantParam.name, tenant_descr: TenantParam.description}, null, 2)); //grava o .json recebido do front!

  //         await exec(json2yaml, {cwd: __dirname}, (err, stdout, stderr) => {
  //           if(err){
  //             throw err;
  //           }else{
  //             runCommand(cmds, cb);
  //           }
  //           console.log(`stdout: ${stdout}`);
  //         });
  //         return "Tenant created successfully";
  //       }else{
  //         throw 'Name or Description on TenantParam does not exists';
  //       }
  //     }else{
  //       throw 'TenantParam parameter does not exists';
  //     }
  //   }catch(err){
  //     return err;
  //   }
  // }
}

module.exports = TenantController;
