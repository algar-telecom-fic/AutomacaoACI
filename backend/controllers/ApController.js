const fs = require("fs");
const { exec } = require("child_process");

class AP {
  /**
   * /aps:
   *   post:
   *     description: Usada para solicitar a criação de um AP
   *     responses:
   *       '200':
   *         description: Solicitação feita com sucesso
   *       '400':
   *         description: Falha na solicitação
   */
  async create(request, response) {
    try {
      const { data } = request.body;

      if (!data) throw "AP data was not received.";
      if (!data.name) throw "AP name is missing.";
      if (!data.description) throw "AP description is missing.";
      if (!data.tenant) throw "AP tenant is missing.";

      /**
       * Escreve as informações do tenant no arquivo "vars.json"
       */
      fs.writeFileSync("./ansible/json/vars.json", JSON.stringify(data, undefined, 2));

      const json2yaml =
        "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_ap.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

      /**
       * Executa o comando para criar um tenant na máquina
       */
      await exec(json2yaml, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) return response.status(400).json({ error, stdout, stderr });

        runCommand(cmds, cb);

        return response.status(200).json({ stdout });
      });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  /**
   * /aps:
   *   get:
   *     description: Usada para listar os APs
   *     responses:
   *       '200':
   *         description: Listagem feita com sucesso
   *       '400':
   *         description: Falha na listagem
   */
  async index(request, response) {
    try {
      const queryvrf = fs.readFileSync("./ansible/querys/aci_aps.json"); // Lê o arquivo
      const queryvrf_vars = JSON.parse(queryvrf); // Converte o arquivo para JSON

      var names = [];
      var containerId; // Variável de controle para não pegar o mesmo ID

      for (let i in queryvrf_vars.current[0].fvTenant.children) {
        let id = queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name; // Atribui o valor de containerId a variável ID

        // Se for diferente, pega o valor de name
        if (containerId != id) {
          containerId = id; // Redefine o valor da variável com o valor atual
          names.push(queryvrf_vars.current[0].fvTenant.children[i].fvAp.attributes.name);
        }
      }
      const queryvrf_formatted = names.map((c) => ({
        label: c,
        value: c,
      }));

      return response.status(200).json({ showAp: true, aps: queryvrf_formatted });
    } catch (err) {
      return response.status(400).json({ showAp: false, error: err });
    }
  }
}

module.exports = AP;
