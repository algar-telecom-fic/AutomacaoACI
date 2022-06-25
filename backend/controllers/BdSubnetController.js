const fs = require("fs");
const { exec } = require("child_process");

class BdSubnetController {
  /**
   * /bdsubnets:
   *   post:
   *     description: Usada para solicitar a criação de um BD
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
      if (!data.tenant) throw "Tenant is missing.";
      if (!data.bd) throw "BD is missing.";
      if (!data.gateway) throw "Gateway is missing.";
      if (!data.mask) throw "Mask is missing.";

      /**
       * Escreve as informações do tenant no arquivo "vars.json"
       */
      fs.writeFileSync(
        "./ansible/json/vars.json",
        JSON.stringify({ tenant: data.tenant, bd: data.bd, gateway: data.gateway, mask: data.mask }, null, 2)
      );

      const createBdSubnetCommand =
        "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_bd_subnet.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

      await exec(createBdSubnetCommand, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) return response.status(400).json({ error, stderr });

        runCommand(cmds, cb);

        return response.status(200).json({ stdout });
      });
    } catch (error) {
      response.status(400).json({ error });
    }
  }
}

module.exports = BdSubnetController;
