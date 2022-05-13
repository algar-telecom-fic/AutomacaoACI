const fs = require("fs");
const { exec } = require("child_process");

class BD {
  /**
   * /bds:
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

      if (!data) throw "BD data was not received.";
      if (!data.name) throw "BD name is missing.";
      if (!data.tenant) throw "BD tenant is missing.";
      if (!data.vrf) throw "BD VRF is missing.";

      /**
       * Escreve as informações do BD no arquivo "vars.json"
       */
      fs.writeFileSync("./ansible/json/vars.json", JSON.stringify(data, undefined, 2));

      const createBdCommand =
        "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_bd.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

      /**
       * Executa o comando para criar um BD na máquina
       */
      await exec(createBdCommand, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) return response.status(400).json({ error, stdout, stderr });

        runCommand(cmds, cb);

        return response.status(200).json({ stdout });
      });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

module.exports = BD;
