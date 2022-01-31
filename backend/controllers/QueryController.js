const express = require('express')
const fs = require('fs')
const exec = require('child_process').exec;
const createEPGBash = "sudo json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/create_epg.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE
const queryBDBash = "ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/query_bds.yml";

const updateQueryTenant = "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/query_tenants.yml";
const updateQueryAp = "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/query_aps.yml";
const updateQueryBd = "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/query_bds.yml";
const updateQueryVrf = "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/query_vfrs.yml";
const updateQuerySw = "json2yaml ../ansible/json/vars.json > ../ansible/yml/vars.yml ; ansible-playbook -i ../ansible/yml/hosts ../ansible/yml/query_swprof.yml";

class QueryController {
    async updateTenant(request, response){
        try{
            await exec(updateQueryTenant, {cwd: __dirname}, (err, stdout, stderr) => {
            if (err){
                const merged = {err, stdout}
                return response.status(400).json({updateQueryTenant: false, error: merged});
            }else{
                runCommand(cmds, cb);
                return response.status(200).json({updateQueryTenant: true, statusMessage: "Tenants list has been updated successfully."});
                }
            });

        }catch(err){
            return response.status(400).json({updateQueryTenant: false, error: err});
        }
    }

    async updateAP(request, response){
        try{
            const {APParam} = request.body;
            if(APParam){
              if(!APParam.tenant){
                throw 'Tenant on APParam does not exists';
              }
              
              fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: APParam.tenant}, null, 2)); //grava o .json recebido do front!
              
              await exec(updateQueryAp, {cwd: __dirname}, (err, stdout, stderr) => {
                  if (err){
                      const merged = {err, stdout}
                      return response.status(400).json({updateQueryAp: false, error: merged});
                  }else{
                      runCommand(cmds, cb);
                      return response.status(200).json({updateQueryAp: true, statusMessage: "AP list has been updated successfully."});
                  }
              });
            }else{
                throw 'APParam parameter does not exists';
            }      
        }catch(err){
            return response.status(400).json({updateQueryAp: false, error: err});
        }
    }

    async updateBD(request, response){
        try{
            const {BDParam} = request.body;
            if(BDParam){
              if(!BDParam.tenant){
                throw 'Tenant on BDParam does not exists';
              }
              
              fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: BDParam.tenant}, null, 2)); //grava o .json recebido do front!
              
              await exec(updateQueryBd, {cwd: __dirname}, (err, stdout, stderr) => {
                  if (err){
                      const merged = {err, stdout}
                      return response.status(400).json({updateQueryBd: false, error: merged});
                  }else{
                      runCommand(cmds, cb);
                      return response.status(200).json({updateQueryBd: true, statusMessage: "BD list has been updated successfully."});
                  }
              });
            }else{
                throw 'BDParam parameter does not exists';
            }      
        }catch(err){
            return response.status(400).json({updateQueryBd: false, error: err});
        }
    }

    async updateVRF(request, response){
        try{
            const {VRFParam} = request.body;
            if(VRFParam){
              if(!VRFParam.tenant){
                throw 'Tenant on VRFParam does not exists';
              }
              
              fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({tenant: VRFParam.tenant}, null, 2)); //grava o .json recebido do front!
              
              await exec(updateQueryVrf, {cwd: __dirname}, (err, stdout, stderr) => {
                  if (err){
                      const merged = {err, stdout}
                      return response.status(400).json({updateQueryVrf: false, error: merged});
                  }else{
                      runCommand(cmds, cb);
                      return response.status(200).json({updateQueryVrf: true, statusMessage: "VRF list has been updated successfully."});
                  }
              });
            }else{
                throw 'VRFParam parameter does not exists';
            }      
        }catch(err){
            return response.status(400).json({updateQueryVrf: false, error: err});
        }
    }

    async updateSW(request, response){
        try{
            const {SwProfParam} = request.body;
            if(SwProfParam){
                if(!SwProfParam.siteId || !SwProfParam.swId){
                throw 'SiteId or SwId on SwProfParam does not exists';
              }
              
              fs.writeFileSync('./ansible/json/vars.json', JSON.stringify({site_id: SwProfParam.siteId, sw_id: SwProfParam.swId}, null, 2)); //grava o .json recebido do front!
              
              await exec(updateQuerySw, {cwd: __dirname}, (err, stdout, stderr) => {
                  if (err){
                      const merged = {err, stdout}
                      return response.status(400).json({updateQuerySwProf: false, error: merged});
                  }else{
                      runCommand(cmds, cb);
                      return response.status(200).json({updateQuerySwProf: true, statusMessage: "Switch Profile list has been updated successfully."});
                  }
              });
            }else{
                throw 'SwProfParam parameter does not exists';
            }      
        }catch(err){
            return response.status(400).json({updateQuerySwProf: false, error: err});
        }
    }
    
}

module.exports = QueryController;