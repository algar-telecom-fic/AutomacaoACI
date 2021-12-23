const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;

const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_domain_phy.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class DomainController {
    async create(request, response){
        try {
            const {domain} = request.body;
            if(domain){
                fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({domain: domain}, null, 2)) //grava o .json recebido do front!

                await exec(json2yaml, {cwd: __dirname}, (err, stdout, stderr) => {
                    if (err){
                      console.log(err)
                    }else{
                      runCommand(cmds, cb);
                    }
                    console.log(`stdout: ${stdout}`);
                });
                return response.status(200).json({createdDomain: true, statusMessage: "Domain created successfully"});
            }else{
                throw 'Domain parameter does not exists';
            }
        } catch (err) {
            response.status(400).json({createdDomain: false, error: err});
        }
    }
}

module.exports = DomainController;