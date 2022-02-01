const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");

// const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
// const json2yaml = 'json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; cat ../ansible/json/vars.json' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
const createVFRBash =
  "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

const vrfListPath = "./ansible/querys/aci_vrfs.json";

class VRFController {
  async create(request, response) {
    try {
      const { VRFParam } = request.body;
      if (VRFParam) {
        if (!VRFParam.name || !VRFParam.description || !VRFParam.tenant) {
          throw "Name, Description or Tenant on VRFParam does not exists";
        }
        fs.writeFileSync(
          "./ansible/json/vars.json",
          JSON.stringify({ vrf: VRFParam.name, description: VRFParam.description, tenant: VRFParam.tenant }, null, 2)
        ); //grava o .json recebido do front!

        await exec(createVFRBash, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            const merged = { err, stdout };
            return response.status(400).json({ createdDomain: false, error: merged });
          } else {
            runCommand(cmds, cb);
            return response.status(200).json({ createdVRF: true, statusMessage: "VRF created successfully" });
          }
        });
      } else {
        throw "VRFParam parameter does not exists";
      }
    } catch (err) {
      response.status(400).json({ createdVRF: false, error: err });
    }
  }

  async index(request, response) {
    try {
      const queryVrf = fs.readFileSync(vrfListPath); //le o arquivo
      const queryVrf_vars = JSON.parse(queryVrf); //converte o arquivo "bruto" para json
      var names = [];

      // variável de controle para não pegar o mesmo id
      var containerId;
      for (let i in queryVrf_vars) {
        // atribui o valor de containerId a variável id
        let id = queryVrf_vars[i];
        // se for diferente, pega o valor de name
        if (containerId != id) {
          // redefine o valor da variável com o valor atual
          containerId = id;
          names.push(queryVrf_vars[i].fvTenant.attributes.name);
        }
      }
      const formattedTenants = names.map((c) => ({
        label: c,
        value: c,
      }));
      return response.status(200).json({ showVrfs: true, vrfs: formattedTenants });
    } catch (err) {
      return response.status(400).json({ showVrfs: false, error: err });
    }
  }
}

module.exports = VRFController;
