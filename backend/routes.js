const express = require('express')

const TenantController = require('./controllers/TenantController')
const VrfController = require('./controllers/VrfController')
const ApController = require('./controllers/ApController')
const BdController = require('./controllers/BdController')
const EpgController = require('./controllers/EpgController')
const QuerysTen = require('./controllers/QuerysTen')
const QueryVrf = require('./controllers/QueryVrf')




const routes = express.Router()

routes.post('/tenant', TenantController.index)


routes.get('/vrf', QuerysTen.get)
routes.get('/ap', QuerysTen.get)
routes.get('/bd', QuerysTen.get)
routes.get('/epg', QuerysTen.get)


routes.get('/bd/vrfs', QueryVrf.listvrfs )
routes.get('/epg/vrfs', QueryVrf.listvrfs)




routes.post('/vrf', VrfController.index)
routes.post('/ap', ApController.index)
routes.post('/bd', BdController.index)
routes.post('/epg', EpgController.index)



routes.get('/epg/bd', EpgController.listbds)
routes.get('/epg/ap', EpgController.listap)








module.exports = routes