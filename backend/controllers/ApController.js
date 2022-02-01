const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const json2yaml =
  "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_ap.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class AP {
  async create(request, response) {
    try {
      const { ApParam } = request.body;
      if (ApParam) {
        if (!ApParam.ap || !ApParam.description || !ApParam.tenant) {
          throw "AP Name, description or Tenant on ApParam does not exists";
        }
        fs.writeFileSync("./ansible/json/vars.json", JSON.stringify(ApParam, undefined, 2));

        await exec(json2yaml, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            const merged = { err, stdout };
            return response.status(400).json({ createdAP: false, error: merged });
          } else {
            runCommand(cmds, cb);
            return response.status(200).json({ createdAP: true, statusMessage: "AP created successfully." });
          }
        });
      } else {
        throw "ApParam parameter does not exists";
      }
    } catch (error) {
      return response.status(400).json({ createdAP: false, error: error });
    }
  }

  async index(request, response) {
    try {
      const queryvrf = fs.readFileSync("./ansible/querys/aci_aps.json"); //le o arquivo
      const queryvrf_vars = JSON.parse(queryvrf);

      var names = [];

      // variável de controle para não pegar o mesmo id
      var containerId;
      for (let i in queryvrf_vars.current[0].fvTenant.children) {
        // atribui o valor de containerId a variável id
        let id = queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name;
        // se for diferente, pega o valor de name
        if (containerId != id) {
          // redefine o valor da variável com o valor atual
          containerId = id;
          // adiciona as names à array
          names.push(queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name);
        }
      }
      const queryvrf_formatted = names.map((c) => ({
        label: c,
        value: c,
      })); //QUERY VRFS ON TENANT FIM

      return response.status(200).json({ showAp: true, aps: queryvrf_formatted });
    } catch (err) {
      return response.status(400).json({ showAp: false, error: err });
    }
  }
}

module.exports = AP;
