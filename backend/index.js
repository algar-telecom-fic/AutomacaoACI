const express = require('express')
const routes = require('./routes')
const app = express()
const cors = require('cors')
app.use(cors())

// const fs = require('fs')
// const exec = require('child_process').exec;

// const json2yaml = 'sudo json2yaml ./ansible/json/vars.json > ./ansible/yml/vars.yml ; sudo touch ./ansible/Ansible_no_meu_lugar' //converte JSON->YAML & EXECUTA COMANDO ANSIBLE

app.use(express.json())
app.use(routes)

app.listen(3333)