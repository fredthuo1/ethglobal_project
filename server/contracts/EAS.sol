// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EAS {
    mapping(bytes32 => bool) private attestations;

    event AttestationAdded(bytes32 indexed dataHash);

    function attest(string memory data) public {
        bytes32 dataHash = keccak256(abi.encodePacked(data));
        attestations[dataHash] = true;
        emit AttestationAdded(dataHash);
    }

    function verify(string memory data) public view returns (bool) {
        bytes32 dataHash = keccak256(abi.encodePacked(data));
        return attestations[dataHash];
    }
}
