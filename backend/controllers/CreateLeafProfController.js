const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const json2yaml =
  "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_leaf_prof_selector.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

class CreateLeafProf {
  async create(request, response) {
    try {
      const { site_id, sw_id } = request.body;
      if (site_id && sw_id) {
        fs.writeFileSync("./ansible/json/vars.json", JSON.stringify({ site_id: site_id, sw_id: sw_id }, null, 2)); //grava o .json recebido do front!

        await exec(json2yaml, { cwd: __dirname }, (err, stdout, stderr) => {
          if (err) {
            const merged = { err, stdout };
            return response.status(400).json({ createdLeafProfile: false, error: merged });
          } else {
            runCommand(cmds, cb);
            return response
              .status(200)
              .json({ createdLeafProfile: true, statusMessage: "Leaf Profile created successfully" });
          }
        });
      } else {
        throw "site_id or sw_id parameter does not exists";
      }
    } catch (err) {
      // console.log(err)
      response.status(400).json({ createdLeafProfile: false, error: err });
    }
  }
}

module.exports = CreateLeafProf;
