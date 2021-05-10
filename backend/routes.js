const express = require('express')

const VrfController = require('./controllers/VrfController')
const ApController = require('./controllers/ApController')
const BdController = require('./controllers/BdController')
const QuerysTen = require('./controllers/QuerysTen')
const QueryVrf = require('./controllers/QueryVrf')

const TenantController = require('./controllers/TenantController');
const EpgController = require('./controllers/EpgController');

const DomainController = require('./controllers/DomainController');

const tenantController = new TenantController();
const epgController = new EpgController();

const domainController = new DomainController();

const routes = express.Router()

routes.post('/tenant', tenantController.create);
routes.post('/epg', epgController.create)

routes.post('/domain', domainController.create);

routes.get('/vrf', QuerysTen.get)
routes.get('/ap', QuerysTen.get)
routes.get('/bd', QuerysTen.get)
routes.get('/epg', QuerysTen.get)

routes.get('/bd/vrfs', QueryVrf.listvrfs )
routes.get('/epg/vrfs', QueryVrf.listvrfs)

routes.post('/vrf', VrfController.index)
routes.post('/ap', ApController.index)
routes.post('/bd', BdController.index)

// routes.get('/epg/bd', EpgController.listbds)
// routes.get('/epg/ap', EpgController.listap)

module.exports = routes