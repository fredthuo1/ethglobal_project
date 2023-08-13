// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./EAS.sol";  // Import the EAS contract directly.
import "./CarNFT.sol";  // Import the CarNFT contract directly.

contract MaintenanceRecord is Ownable {
    struct Record {
        uint256 date;
        string description;
        uint256 cost;
        address recordedBy;
        bool exists;
    }

    mapping(uint256 => Record[]) public carRecords;

    CarNFT public carNFT;  // Update the type to CarNFT.
    EAS public eas;  // Update the type to EAS.

    constructor(address _carNFT, address _eas) {
        carNFT = CarNFT(_carNFT);  // Typecast the address to CarNFT.
        eas = EAS(_eas);  // Typecast the address to EAS.
    }

    event MaintenanceRecorded(uint256 indexed carId, uint256 date, string description, uint256 cost, address indexed recordedBy);
    event MaintenanceUpdated(uint256 indexed carId, uint256 recordIndex, string newDescription, uint256 newCost);
    event MaintenanceDeleted(uint256 indexed carId, uint256 recordIndex);

    function recordMaintenance(uint256 carId, string memory description, uint256 cost) public {
        require(address(carNFT.ownerOf(carId)) != address(0), "Car NFT does not exist");
        
        uint256 date = block.timestamp;
        address recordedBy = msg.sender;
        
        carRecords[carId].push(Record(date, description, cost, recordedBy, true));

        // Make an attestation about the maintenance event using EAS
        string memory data = string(abi.encodePacked("Maintenance event for car ID: ", Strings.toString(carId)));
        eas.attest(data);

        emit MaintenanceRecorded(carId, date, description, cost, recordedBy);
    }

    function updateMaintenance(uint256 carId, uint256 recordIndex, string memory newDescription, uint256 newCost) public {
        require(recordIndex < carRecords[carId].length, "Record index out of bounds");
        require(carRecords[carId][recordIndex].exists, "Record does not exist");
        require(carRecords[carId][recordIndex].recordedBy == msg.sender || owner() == msg.sender, "Not authorized");

        carRecords[carId][recordIndex].description = newDescription;
        carRecords[carId][recordIndex].cost = newCost;

        emit MaintenanceUpdated(carId, recordIndex, newDescription, newCost);
    }

    function deleteMaintenance(uint256 carId, uint256 recordIndex) public {
        require(recordIndex < carRecords[carId].length, "Record index out of bounds");
        require(carRecords[carId][recordIndex].exists, "Record does not exist");
        require(carRecords[carId][recordIndex].recordedBy == msg.sender || owner() == msg.sender, "Not authorized");

        carRecords[carId][recordIndex].exists = false;

        emit MaintenanceDeleted(carId, recordIndex);
    }

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
