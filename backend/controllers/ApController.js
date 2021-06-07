const express = require('express');
const fs = require('fs');
const exec = require('child_process').exec;

const createDBBash = "json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/create_ap.yml";

class AP {
  async create(request,response) {
    try {
      const {ApParam} = request.body;
      if(ApParam){
        if(!ApParam.ap || !ApParam.description || !ApParam.tenant){
          throw 'AP Name, description or Tenant on ApParam does not exists';
        }
        fs.writeFileSync('./ansible/json/vars.json', JSON.stringify(ApParam, undefined, 2));
        await exec(createDBBash, (err,std) => {
          console.log(err)
          console.log( std )
        }).then(response => {
          return response.status(200).json({createdAP: true, statusMessage: 'AP created successfully.'});
        }).catch(err => {
          return response.json({createdAP: false, error: err});
        });
      }else{
        throw 'ApParam parameter does not exists';
      }
    } catch (error) {
      return response.status(400).json({createdAP: false, error})
    }
  }
}

module.exports = AP;