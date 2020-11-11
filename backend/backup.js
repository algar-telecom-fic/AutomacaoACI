
app.get('/vrf', (request, response) => {
    
    const querytenant = fs.readFileSync('./ansible/aci_tenants.json') //le o arquivo
    const querytenant_vars = JSON.parse(querytenant) //converte o arquivo "bruto" para json
    var names = [];
      
          // variável de controle para não pegar o mesmo id
          var containerId;
          for(let i in querytenant_vars){
         // atribui o valor de containerId a variável id
         let id = querytenant_vars[i];
         // se for diferente, pega o valor de name
         if(containerId != id){
            // redefine o valor da variável com o valor atual
            containerId = id;
            // adiciona as names à array
            names.push(querytenant_vars[i].fvTenant.attributes.name);
           }
          }
  
          const formatted = names.map((c) => ({
            label: c,
            value: c,
          })); 
          return response.json(formatted)
  })
  
  app.post('/vrf', (request, response) => {
  
      
    const VrfParm = request.body; //declara que os parametros do tenant são do corpo da requisição
  
    fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(VrfParm, undefined, 2), finished) //grava o .json recebido do front!
  
    function finished(err) {
        console.log('all set.')
    }
  
    const data = fs.readFileSync('./ansible/json/vars.json') //le o arquivo
    const vars = JSON.parse(data) //converte o arquivo "bruto" para json
  
    console.log(VrfParm) //le as informações vindas do front
  
  
    exec(json2yaml, {
        cwd: __dirname
      }, (err, stdout, stderr) => {
        console.log(stdout);
        if (err) console.log(err);
        else runCommand(cmds, cb);
      });
   
  
   
    return response.json('Todos os dados foram atualizados') //retorna os dados atuais do arquivo do ansible
  
    
  
  
  })