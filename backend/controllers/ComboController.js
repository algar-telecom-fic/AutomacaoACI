const express = require("express");
const fs = require("fs");
const exec = require("child_process").exec;

const json2yaml =
  "json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml && ansible-playbook -i ./ansible/yml/hosts ./ansible/yml/combo1_ip.yml"; //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

const TenantController = require("./TenantController");

class ComboController {
  async getCombo01(request, response) {
    return response.status(200).json({ combo: true, length: 6 });
  }

  async getCombo02(request, response) {
    return response.status(200).json({ combo: true, length: 6 });
  }

  async combo01(request, response) {
    try {
      const { comboData } = request.body;
      if (!comboData.tenant) {
        if (!comboData.tenant.name || !comboData.tenant.description) {
          throw "Tenant values does not exists";
        } else {
          throw "Tenant does not exists";
        }
      } else if (!comboData.ap) {
        if (!comboData.ap.name || !comboData.ap.description) {
          throw "AP values does not exists";
        } else {
          throw "AP does not exists";
        }
      } else if (!comboData.vrf) {
        if (!comboData.vrf.name || !comboData.vrf.description) {
          throw "VRF values does not exists";
        } else {
          throw "VRF does not exists";
        }
      } else if (!comboData.bd) {
        if (!comboData.bd.name || !comboData.bd.description) {
          throw "BD values does not exists";
        } else {
          throw "BD does not exists";
        }
      } else if (!comboData.bd_subnet) {
        if (!comboData.bd_subnet.name || !comboData.bd_subnet.gateway || !comboData.bd_subnet.mask) {
          throw "BD_Subnet values does not exists";
        } else {
          throw "BD_Subnet does not exists";
        }
      } else if (!comboData.epg) {
        if (!comboData.epg.name || !comboData.epg.description) {
          throw "EPG values does not exists";
        } else {
          throw "EPG does not exists";
        }
      } else {
        console.log("aa");
        return response.status(200).json({ createdCombo: true });
      }
    } catch (err) {
      console.log(err);
      response.status(400).json({ createdCombo: false, error: err });
    }
  }
}

module.exports = ComboController;
