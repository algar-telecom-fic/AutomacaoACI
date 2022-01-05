const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;

const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_bd_subnet.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class BdSubnetController {
    async create(request, response){
        try {
            const {tenant, bd, gateway, mask} = request.body;
            if(tenant && bd && gateway && mask){
                fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: tenant, bd: bd, gateway: gateway, mask: mask}, null, 2)) //grava o .json recebido do front!

                await exec(json2yaml, {cwd: __dirname}, (err, stdout, stderr) => {
                    if (err){
                        const merged = {err, stdout}
                        response.status(400).json({createdBdSubnet: false, error: merged});
                    }else{
                        runCommand(cmds, cb);
                        return response.status(200).json({createdBdSubnet: true, statusMessage: "BD Subnet created successfully"});
                    }
                });
            }else{
                throw 'Tenant, bd, gateway or mask parameter does not exists';
            }
        } catch (err) {
            console.log(err)
            response.status(400).json({createdBdSubnet: false, error: err});
        }
    }
}

module.exports = BdSubnetController;