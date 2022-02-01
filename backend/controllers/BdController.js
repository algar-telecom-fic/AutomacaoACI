const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const json2yaml =
  "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_bd.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class BD {
  async create(request, response) {
    try {
      const { BdParam } = request.body; //declara que os parametros do tenant são do corpo da requisição
      if (BdParam) {
        if (!BdParam.bd || !BdParam.tenant || !BdParam.vrf) {
          throw "BD Name, VRF or Tenant on BdParam does not exists";
        }
        fs.writeFileSync("./ansible/json/vars.json", JSON.stringify(BdParam, undefined, 2)); //grava o .json recebido do front!

        await exec(json2yaml, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            const merged = { err, stdout };
            return response.status(400).json({ createdBD: false, error: merged });
          } else {
            runCommand(cmds, cb);
            return response.status(200).json({ createdBD: true, statusMessage: "BD created successfully." });
          }
        });
        // return response.json('Todos os dados da VRFa foram atualizados')
      } else {
        throw "BdParam parameter does not exists";
      }
    } catch (error) {
      return response.status(400).json({ createdBD: false, error });
    }
  }
}

module.exports = BD;
