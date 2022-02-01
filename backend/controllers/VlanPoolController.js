const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const json2yaml =
  "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vlanpool.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class VlanPoolController {
  // async create(request,response) {
  //     try {
  //       const {ApParam} = request.body;
  //       if(ApParam){
  //         if(!ApParam.ap || !ApParam.description || !ApParam.tenant){
  //           throw 'AP Name, description or Tenant on ApParam does not exists';
  //         }
  //         fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(ApParam, undefined, 2));
  //         await exec(createDBBash, (err,std) => {
  //           console.log(err)
  //           console.log( std )
  //         }).then(response => {
  //           return response.status(200).json({createdVlanPool: true, statusMessage: 'AP created successfully.'});
  //         }).catch(err => {
  //           return response.json({createdVlanPool: false, error: err});
  //         });
  //       }else{
  //         throw 'ApParam parameter does not exists';
  //       }
  //     } catch (error) {
  //       return response.status(400).json({createdAP: false, error})
  //     }
  //   }
  async create(request, response) {
    try {
      const { vlanpool } = request.body;
      console.log(vlanpool);
      if (vlanpool) {
        fs.writeFileSync("./ansible/json/vars.json", JSON.stringify({ pool: vlanpool }, undefined, 2)); //grava o .json recebido do front!

        await exec(json2yaml, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            const merged = { err, stdout };
            response.status(400).json({ createdVlanPool: false, error: merged });
          } else {
            runCommand(cmds, cb);
            return response
              .status(200)
              .json({ createdVlanPool: true, statusMessage: "VlanPool created successfully." });
          }
        });
      } else {
        throw "VlanPool parameter does not exists";
      }
    } catch (err) {
      console.log(err);
      response.status(400).json({ createdVlanPool: false, error: err });
    }
  }
}

module.exports = VlanPoolController;
