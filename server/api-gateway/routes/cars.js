// routes/cars.js
const express = require('express');
const router = express.Router();

// Import the MaintenanceRecord contract ABI
const MaintenanceRecordABI = require('../../build/contracts/MaintenanceRecord.json');

// Connect to the Ethereum network using Layer0's web3 instance
const web3 = require('@layer0/core/utils/web3');
const layer0 = require('@layer0/core/utils/layer0');

// Define the address of the MaintenanceRecord contract on the Ethereum network
const maintenanceRecordAddress = '0x...'; // Replace this with the actual contract address

// Create an instance of the MaintenanceRecord contract
const maintenanceRecordContract = new web3.eth.Contract(MaintenanceRecordABI, maintenanceRecordAddress);

// Define the API routes
router.get('/cars/:carId', async (req, res) => {
    try {
        const carId = req.params.carId;

        // Get the car details from the Car NFT contract using Layer0's callContract method
        const carDetails = await layer0.callContract('CarNFT', 'getCarDetails', [carId]);

        // Get the maintenance records for the car from the MaintenanceRecord contract
        const maintenanceRecords = await maintenanceRecordContract.methods.getMaintenanceRecords(carId).call();

        const carData = {
            carId: carId,
            make: carDetails[0],
            model: carDetails[1],
            year: carDetails[2],
            maintenanceRecords: maintenanceRecords,
        };

        res.json(carData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
