const express = require('express')

const QueryVrf = require('./controllers/QueryVrf')

const QueryTenant = require('./controllers/QuerysTenant');

const TenantController = require('./controllers/TenantController');
const EpgController = require('./controllers/EpgController');
const VrfController = require('./controllers/VrfController');
const ApController = require('./controllers/ApController')
const BdController = require('./controllers/BdController')

const DomainController = require('./controllers/DomainController');
const VlanPoolController = require('./controllers/VlanPoolController');
const AaepController = require('./controllers/AaepController');
const BdSubnetController = require('./controllers/BdSubnetController');

const ComboController = require('./controllers/ComboController');

const SwProfileController = require('./controllers/SwProfileController');

const tenantController = new TenantController();
const epgController = new EpgController();
const vrfController = new VrfController();
const bdController = new BdController();
const apController = new ApController();

const queryTenant = new QueryTenant();

const domainController = new DomainController();
const vlanPoolController = new VlanPoolController();
const aaepController = new AaepController();
const bdSubnetController = new BdSubnetController();

const comboController = new ComboController();

const swProfileController = new SwProfileController();

const routes = express.Router()

routes.post('/tenant', tenantController.create);
routes.post('/vrf', vrfController.create);
routes.post('/epg', epgController.create)
routes.post('/bd', bdController.create)

routes.get('/epg/bd', epgController.listBds);
routes.get('/epg/ap', epgController.listAps);

routes.post('/domain', domainController.create);
routes.post('/vlanpool', vlanPoolController.create);
routes.post('/aaep', aaepController.create);
routes.post('/bdsubnet', bdSubnetController.create);

routes.post('/combo/01', comboController.combo01);

routes.get('/combo/01', comboController.getCombo01);

routes.post('/swprofile', swProfileController.create);

routes.get('/vrf', queryTenant.listTenants);
routes.get('/ap', queryTenant.listTenants);
routes.get('/bd', queryTenant.listTenants);
routes.get('/epg', queryTenant.listTenants);

routes.get('/bd/vrfs', QueryVrf.listvrfs)
routes.get('/epg/vrfs', QueryVrf.listvrfs)

routes.post('/ap', apController.create);

// routes.get('/epg/bd', EpgController.listbds)
// routes.get('/epg/ap', EpgController.listap)

module.exports = routes