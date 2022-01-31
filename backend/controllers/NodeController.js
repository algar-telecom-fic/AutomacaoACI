const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;

const createNewNode = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_newnode.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class SwProfileController {
    async create(request, response){
        try {
            const {NodeParam} = request.body;
            if(NodeParam.name && NodeParam.nodeId && NodeParam.serial){
                fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({name: NodeParam.name , node_id: NodeParam.nodeId, serial: NodeParam.serial }, null, 2)) //grava o .json recebido do front!

                await exec(createNewNode, {cwd: __dirname}, (err, stdout, stderr) => {
                    if (err){
                        const merged = {err, stdout}
                        return response.status(400).json({createdNodeMember: false, error: merged});
                    }else{
                        runCommand(cmds, cb);
                        return response.status(200).json({createdNodeMember: true, statusMessage: "Node Member created successfully"});
                    }
                });
            }else{
                throw 'name, nodeId or serial parameter does not exists';
            }
        } catch (err) {
            console.log(err)
            response.status(400).json({createdNodeMember: false, error: err});
        }
    }
}

module.exports = SwProfileController;