const express = require('express')
const fs = require('fs')
const { exec }  = require("child_process");

// const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
// const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; cat ../ansible/json/vars.json' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
const createVFRBash = "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

module.exports = {
    async index (request,response) {
      try {
        const VRFParam = request.body; //declara que os parametros do tenant são do corpo da requisição
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(VRFParam, undefined, 2)) //grava o .json recebido do front!
        // console.log(VrfParm) //le as informações vindas do front   
        // exec("json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_vrf.yml", (error, stdout, stderr) => {
        //   if(error){
        //     return response.json({created: false, error: error});
        //   }
        //   if(stdout){
        //     return response.json({created: false, error: stdout});
        //   }
        //   if(stderr){
        //     return response.json({created: false, error: stderr});
        //   }
          // console.log(VrfParm)
          // console.log(err)
          // console.log( std )
        // })
        await exec(createVFRBash, {
            cwd: __dirname
          }, (err, stdout, stderr) => {
            console.log(stdout);
            if (err){
              console.log(err); 
            }else{
              runCommand(cmds, cb);
            }
            console.log(`stdout: ${stdout}`);
        });
        // exec("ls -la", (error, stdout, stderr) => {
        //   if (error) {
        //       console.log(`error: ${error.message}`);
        //       return;
        //   }
        //   if (stderr) {
        //       console.log(`stderr: ${stderr}`);
        //       return;
        //   }
        //   console.log(`stdout: ${stdout}`);
      // });
        // return response.json({created: true, statusMessage: 'Todos os dados da VRF foram atualizados.'});
        return response.json({createdVRF: true, statusMessage: 'VRF criada com sucesso.'});
      } catch (error) {
        console.log(error)
        return response.json({createdVRF: false, error})
      }
    }
}