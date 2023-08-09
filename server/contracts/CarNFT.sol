// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarNFT is ERC721Enumerable, Ownable {
    struct CarDetails {
        string VIN;
        string make;
        string model;
        uint256 year;
        bool isForSale;
        uint256 price;
    }

    mapping(uint256 => CarDetails) private _carDetails;

    event CarUpdated(uint256 tokenId);

    constructor() ERC721("CarNFT", "CAR") {}

    function mint(
        address to,
        string memory VIN,
        string memory make,
        string memory model,
        uint256 year
    ) public onlyOwner returns (uint256 tokenId) {
        tokenId = totalSupply();
        _mint(to, tokenId);
        _carDetails[tokenId] = CarDetails(VIN, make, model, year, false, 0);
    }

    function getCarDetails(uint256 tokenId) public view returns (CarDetails memory) {
        return _carDetails[tokenId];
    }

    function setForSale(uint256 tokenId, bool isForSale, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        _carDetails[tokenId].isForSale = isForSale;
        _carDetails[tokenId].price = price;
        emit CarUpdated(tokenId);
    }

    function updateCarDetails(
        uint256 tokenId,
        string memory VIN,
        string memory make,
        string memory model,
        uint256 year
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        _carDetails[tokenId] = CarDetails(VIN, make, model, year, _carDetails[tokenId].isForSale, _carDetails[tokenId].price);
        emit CarUpdated(tokenId);
    }

    function purchaseCar(uint256 tokenId) public payable {
        require(_carDetails[tokenId].isForSale, "Car not for sale");
        require(msg.value == _carDetails[tokenId].price, "Price mismatch");
        address seller = ownerOf(tokenId);
        payable(seller).transfer(msg.value);
        _transfer(seller, msg.sender, tokenId);
        _carDetails[tokenId].isForSale = false;
    }
}
