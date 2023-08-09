// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol"; // Import the Strings library

import "@openzeppelin/contracts/access/Ownable.sol";

interface ICarNFT {
    function exists(uint256 tokenId) external view returns (bool);
}

interface IEAS {
    function attest(string calldata data) external;
}

contract MaintenanceRecord is Ownable {
    using Strings for uint256; // Use the Strings library to convert uint256 to string

    struct Record {
        uint256 date;
        string description;
        uint256 cost;
        address recordedBy;
        bool exists;
    }

    mapping(uint256 => Record[]) public carRecords; // Mapping from Car NFT ID to an array of maintenance records

    ICarNFT public carNFT;
    IEAS public eas;

    constructor(address _carNFT, address _eas) {
        carNFT = ICarNFT(_carNFT);
        eas = IEAS(_eas);
    }

    event MaintenanceRecorded(uint256 indexed carId, uint256 date, string description, uint256 cost, address indexed recordedBy);
    event MaintenanceUpdated(uint256 indexed carId, uint256 recordIndex, string newDescription, uint256 newCost);
    event MaintenanceDeleted(uint256 indexed carId, uint256 recordIndex);

    // Record a maintenance event
    function recordMaintenance(uint256 carId, string memory description, uint256 cost) public {
        require(carNFT.exists(carId), "Car NFT does not exist");
        
        uint256 date = block.timestamp;
        address recordedBy = msg.sender;
        
        carRecords[carId].push(Record(date, description, cost, recordedBy, true));

        // Make an attestation about the maintenance event using EAS
        string memory data = string(abi.encodePacked("Maintenance event for car ID: ", carId.toString())); // Use the toString() function
        eas.attest(data);

        emit MaintenanceRecorded(carId, date, description, cost, recordedBy);
    }

    // Update a maintenance record
    function updateMaintenance(uint256 carId, uint256 recordIndex, string memory newDescription, uint256 newCost) public {
        require(recordIndex < carRecords[carId].length, "Record index out of bounds");
        require(carRecords[carId][recordIndex].exists, "Record does not exist");
        require(carRecords[carId][recordIndex].recordedBy == msg.sender || owner() == msg.sender, "Not authorized");

        carRecords[carId][recordIndex].description = newDescription;
        carRecords[carId][recordIndex].cost = newCost;

        emit MaintenanceUpdated(carId, recordIndex, newDescription, newCost);
    }

    // Delete a maintenance record
    function deleteMaintenance(uint256 carId, uint256 recordIndex) public {
        require(recordIndex < carRecords[carId].length, "Record index out of bounds");
        require(carRecords[carId][recordIndex].exists, "Record does not exist");
        require(carRecords[carId][recordIndex].recordedBy == msg.sender || owner() == msg.sender, "Not authorized");

        carRecords[carId][recordIndex].exists = false;

        emit MaintenanceDeleted(carId, recordIndex);
    }

    // Get all existing maintenance records for a specific car
    function getMaintenanceRecords(uint256 carId) public view returns (Record[] memory records) {
        uint256 count = 0;
        for (uint256 i = 0; i < carRecords[carId].length; i++) {
            if (carRecords[carId][i].exists) {
                count++;
            }
        }

        records = new Record[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < carRecords[carId].length; i++) {
            if (carRecords[carId][i].exists) {
                records[index] = carRecords[carId][i];
                index++;
            }
        }
    }
}
