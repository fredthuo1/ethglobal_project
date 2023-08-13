// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarNFT is ERC721Enumerable, Ownable {
    struct CarDetails {
        string make;
        string model;
        uint256 year;
        bool isForSale;
        uint256 price;
    }

    mapping(string => CarDetails) private _carDetails;
    string[] public VINs;

    event CarUpdated(string VIN);

    constructor() ERC721("CarNFT", "CAR") {}

    function mint(
        address to,
        string memory VIN,
        string memory make,
        string memory model,
        uint256 year
    ) public onlyOwner returns (uint256 tokenId) {
        require(!_carExists(VIN), "Car NFT already exists for this VIN");
        tokenId = tokenIdFromVIN(VIN); // Use the updated function here
        _mint(to, tokenId);
        _carDetails[VIN] = CarDetails(make, model, year, false, 0);
        VINs.push(VIN);
    }

    function _carExists(string memory VIN) private view returns (bool) {
        return _carDetails[VIN].year != 0;
    }

    function setForSale(string memory VIN, bool isForSale, uint256 price) public {
        require(ownerOf(tokenIdFromVIN(VIN)) == msg.sender, "Not the owner");
        _carDetails[VIN].isForSale = isForSale;
        _carDetails[VIN].price = price;
        emit CarUpdated(VIN);
    }

    function updateCarDetails(
        string memory VIN,
        string memory make,
        string memory model,
        uint256 year
    ) public {
        require(ownerOf(tokenIdFromVIN(VIN)) == msg.sender, "Not the owner");
        _carDetails[VIN] = CarDetails(make, model, year, _carDetails[VIN].isForSale, _carDetails[VIN].price);
        emit CarUpdated(VIN);
    }

    function purchaseCar(string memory VIN) public payable {
        require(_carDetails[VIN].isForSale, "Car not for sale");
        require(msg.value == _carDetails[VIN].price, "Price mismatch");
        address seller = ownerOf(tokenIdFromVIN(VIN));
        payable(seller).transfer(msg.value);
        _transfer(seller, msg.sender, tokenIdFromVIN(VIN));
        _carDetails[VIN].isForSale = false;
    }

    function getCarDetails(string memory VIN) public view returns (CarDetails memory) {
        return _carDetails[VIN];
    }

    function getAllCars() public view returns (CarDetails[] memory) {
        CarDetails[] memory cars = new CarDetails[](VINs.length);
        for (uint i = 0; i < VINs.length; i++) {
            cars[i] = _carDetails[VINs[i]];
        }
        return cars;
    }

    function getCarsOnSale() public view returns (CarDetails[] memory) {
        uint256 count = 0;
        for (uint i = 0; i < VINs.length; i++) {
            if (_carDetails[VINs[i]].isForSale) {
                count++;
            }
        }

        CarDetails[] memory carsOnSale = new CarDetails[](count);
        uint256 index = 0;
        for (uint i = 0; i < VINs.length; i++) {
            if (_carDetails[VINs[i]].isForSale) {
                carsOnSale[index] = _carDetails[VINs[i]];
                index++;
            }
        }
        return carsOnSale;
    }

    function tokenIdFromVIN(string memory VIN) public view returns (uint256 tokenId) {
        return uint256(keccak256(abi.encodePacked(VIN)));
    }
}
