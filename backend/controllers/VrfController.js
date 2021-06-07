const express = require('express')
const fs = require('fs')
const { exec }  = require("child_process");

// const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
// const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; cat ../ansible/json/vars.json' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
const createVFRBash = "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class VRFController{
  async create(request, response){
    try{
      const {VRFParam} = request.body;
      if(VRFParam){
        if(!VRFParam.name || !VRFParam.description || !VRFParam.tenant){
          throw 'Name, Description or Tenant on VRFParam does not exists';
        }
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({vrf: VRFParam.name, description: VRFParam.description, tenant: VRFParam.tenant}, null, 2)); //grava o .json recebido do front!
        await exec(createVFRBash, {cwd: __dirname}, (err, stdout, stderr) => {
          if(err){
            throw err;
          }else{
            runCommand(cmds, cb);
          }
          console.log(`stdout: ${stdout}`);
        });
        return response.status(200).json({createdVRF: true, statusMessage: "VRF created successfully"});
      }else{
        throw 'VRFParam parameter does not exists';
      }
    }catch(err){
      response.status(400).json({createdVRF: false, error: err});
    }
  }
}

module.exports = VRFController;