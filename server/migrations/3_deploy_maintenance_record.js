const MaintenanceRecord = artifacts.require("MaintenanceRecord");

module.exports = function (deployer) {
    deployer.deploy(MaintenanceRecord);
};
