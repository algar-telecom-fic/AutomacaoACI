const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const createTenantBash = "./ansible/querys/aci_tenants.json";

class QueryTenant {
  async listTenants(request, response) {
    try {
      const querytenant = fs.readFileSync(createTenantBash); //le o arquivo
      const querytenant_vars = JSON.parse(querytenant); //converte o arquivo "bruto" para json
      var names = [];

      // variável de controle para não pegar o mesmo id
      var containerId;
      for (let i in querytenant_vars) {
        // atribui o valor de containerId a variável id
        let id = querytenant_vars[i];
        // se for diferente, pega o valor de name
        if (containerId != id) {
          // redefine o valor da variável com o valor atual
          containerId = id;
          names.push(querytenant_vars[i].fvTenant.attributes.name);
        }
      }
      const formattedTenants = names.map((c) => ({
        label: c,
        value: c,
      }));
      return response.status(200).json({ showTenants: true, tenants: formattedTenants });
    } catch (err) {
      return response.status(400).json({ showTenants: false, error: err });
    }
  }
}

module.exports = QueryTenant;
