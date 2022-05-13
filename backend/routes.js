const express = require("express");
const routes = express.Router();

/**
 * Tenant routes:
 */
const TenantController = require("./controllers/TenantController");
const tenantController = new TenantController();
routes.post("/tenants", tenantController.create);
routes.get("/tenants", tenantController.index);

/**
 * EPG routes:
 */
const EpgController = require("./controllers/EpgController");
const epgController = new EpgController();
routes.post("/epgs", epgController.create);
routes.get("/epgs", epgController.index);

/**
 * VRF routes:
 */
const VrfController = require("./controllers/VrfController");
const vrfController = new VrfController();
routes.post("/vrfs", vrfController.create);
routes.get("/vrfs", vrfController.index);

/**
 * AP routes:
 */
const ApController = require("./controllers/ApController");
const apController = new ApController();
routes.post("/aps", apController.create);
routes.get("/aps", apController.index);

/**
 * BD routes:
 */
const BdController = require("./controllers/BdController");
const bdController = new BdController();
routes.post("/bds", bdController.create);

// routes.get("/epg/bd", epgController.index);
// routes.get("/epg/ap", apController.index);

// routes.post("/combo/01", comboController.combo01);
// routes.get("/combo/01", comboController.getCombo01);
// routes.get("/combo/02", comboController.getCombo02);

// routes.put("/update/query/tenant", queryController.updateTenant);
// routes.put("/update/query/ap", queryController.updateAP);
// routes.put("/update/query/bd", queryController.updateBD);
// routes.put("/update/query/vrf", queryController.updateVRF);
// routes.put("/update/query/swprofile", queryController.updateSW);

module.exports = routes;
