const fs = require("fs");
const { exec } = require("child_process");

class EpgController {
  /**
   * /epgs:
   *   post:
   *     description: Usada para solicitar a criação de um EPG
   *     responses:
   *       '200':
   *         description: Solicitação feita com sucesso
   *       '400':
   *         description: Falha na solicitação
   */
  async create(request, response) {
    try {
      const { data } = request.body;

      if (!data) throw "EPG data was not received.";
      if (!data.name) throw "EPG name is missing.";
      if (!data.description) throw "EPG description is missing.";
      if (!data.tenant) throw "EPG tenant is missing.";
      if (!data.vrf) throw "EPG VRF is missing.";
      if (!data.bd) throw "EPG BD is missing.";
      if (!data.ap) throw "EPG AP is missing.";

      console.log("Data was received successfully.");

      /**
       * Escreve as informações do EPG no arquivo "vars.json"
       */
      fs.writeFileSync(
        "./ansible/json/vars.json",
        JSON.stringify(
          {
            description: data.description,
            tenant: data.tenant,
            description: data.description,
            ap: data.ap,
            epg: data.epgName,
            bd: data.bd,
          },
          null,
          2
        )
      );

      console.log("Vars file was filled.");

      const createEpgCommand =
        "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml && ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_epg.yml";

      /**
       * Executa o comando para criar um EPG na máquina
       */
      await exec(createEpgCommand, { cwd: __dirname }, (error, stdout, stderr) => {
        console.log("Entered the run function.");

        if (error) return response.status(400).json({ error, stdout, stderr });

        runCommand(cmds, cb);

        console.log("Run function was executed.", stdout);

        return response.status(200).json({ stdout });
      });
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  /**
   * /epgs:
   *   get:
   *     description: Usada para listar os EPGs
   *     responses:
   *       '200':
   *         description: Listagem feita com sucesso
   *       '400':
   *         description: Falha na listagem
   */
  async index(request, response) {
    try {
      const queryvrf = fs.readFileSync("./ansible/querys/aci_bds.json"); // Lê o arquivo
      const queryvrf_vars = JSON.parse(queryvrf); // Converte o arquivo para JSON

      var names = [];

      let containerId; // Variável de controle para não pegar o mesmo ID

      for (let i in queryvrf_vars.current[0].fvTenant.children) {
        let id = queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name; // Atribui o valor de containerId a variável ID

        // Se for diferente pega o valor de name
        if (containerId != id) {
          containerId = id; // Redefine o valor da variável com o valor atual
          names.push(queryvrf_vars.current[0].fvTenant.children[i].fvBD.attributes.name);
        }
      }

      const queryvrf_formatted = names.map((c) => ({
        label: c,
        value: c,
      }));

      return response.status(200).json({ showBd: true, bds: queryvrf_formatted });
    } catch (err) {
      return response.status(400).json({ showBd: false, error: err });
    }
  }
}

module.exports = EpgController;
