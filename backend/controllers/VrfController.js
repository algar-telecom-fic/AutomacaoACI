const fs = require("fs");
const { exec } = require("child_process");

class VRFController {
  /**
   * /tenants:
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

      if (!data) throw "VRF data was not received.";
      if (!data.name) throw "VRF name is missing.";
      if (!data.description) throw "VRF description is missing.";
      if (!data.tenant) throw "VRF tenant is missing.";

      /**
       * Escreve as informações do tenant no arquivo "vars.json"
       */
      fs.writeFileSync(
        "./ansible/json/vars.json",
        JSON.stringify({ vrf: data.name, description: data.description, tenant: data.tenant }, null, 2)
      );

      const createVrfCommand =
        "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_vrf.yml";

      /**
       * Executa o comando para criar um tenant na máquina
       */
      await exec(createVrfCommand, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) response.status(400).json({ error, stdout, stderr });

        runCommand(cmds, cb);

        return response.status(200).json({ stdout });
      });
    } catch (error) {
      response.status(400).json({ error });
    }
  }

  /**
   * /tenants:
   *   get:
   *     description: Usada para listar os tenants
   *     responses:
   *       '200':
   *         description: Listagem feita com sucesso
   *       '400':
   *         description: Falha na listagem
   */
  async index(request, response) {
    try {
      const queryVrf = fs.readFileSync("./ansible/querys/aci_vrfs.json"); // Lê o arquivo
      const queryVrf_vars = JSON.parse(queryVrf); // Converte o arquivo para JSON

      var names = [];

      var containerId; // Variável de controle para não pegar o mesmo ID

      for (let i in queryVrf_vars) {
        let id = queryVrf_vars[i]; // Atribui o valor de containerId a variável ID

        // Se for diferente pega o valor de name
        if (containerId != id) {
          containerId = id; // Redefine o valor da variável com o valor atual
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
