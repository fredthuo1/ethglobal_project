const MaintenanceRecord = artifacts.require("MaintenanceRecord");
const CarNFT = artifacts.require("CarNFT");
const EAS = artifacts.require("EAS");

module.exports = async function (deployer) {
    await deployer.deploy(MaintenanceRecord, CarNFT.address, EAS.address);
};
