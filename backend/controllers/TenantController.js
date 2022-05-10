const fs = require("fs");
const { exec } = require("child_process");
const json2yaml =
  "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_tenant.yml";
const createTenantBash = "./ansible/querys/aci_tenants.json";

class TenantController {
  /**
   * /tenant:
   *   post:
   *     description: Usada para solicitar a criação de um tenant
   *     responses:
   *       '200':
   *         description: Solicitação feita com sucesso
   *       '400':
   *         description: Falha na solicitação
   */
  async create(request, response) {
    try {
      const { data } = request.body;

      if (!data) throw "Tenant data was not received.";
      if (!data.name) throw "Tenant name is missing.";
      if (!data.description) throw "Tenant description is missing.";

      fs.writeFileSync(
        "./ansible/json/vars.json",
        JSON.stringify(
          {
            tenant: data.name,
            description: data.description,
          },
          null,
          2
        )
      );

      await exec(json2yaml, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) return response.status(400).json({ error, stderr });

        runCommand(cmds, cb);

        return response.status(200).json({ stdout });
      });
    } catch (error) {
      response.status(400).json({ error });
    }
  }

  /**
   * /tenant:
   *   post:
   *     description: Usada para listar os tenants
   *     responses:
   *       '200':
   *         description: Listagem feita com sucesso
   *       '400':
   *         description: Falha na listagem
   */
  async index(request, response) {
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

module.exports = TenantController;
