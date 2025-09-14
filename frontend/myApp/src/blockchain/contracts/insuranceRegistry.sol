// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./registration.sol";

contract InsuranceRegistry {
    address public owner;
    Registration registrationContract;

    mapping(address => address) public registry;

    event InsuranceContractDeployed(address indexed insurer, address contractAddress);

    constructor(address _registration) {
        owner = msg.sender;
        registrationContract = Registration(_registration);
    }

    modifier onlyInsuranceProvider {
        require(registrationContract.insuranceProviderExists(msg.sender), "Sender not authorized.");
        _;
    } 

    function insertContract(address deployed_contract) onlyInsuranceProvider public {
        require(registry[msg.sender] == address(0), "Contract already exists for this provider");
        registry[msg.sender] = deployed_contract;
        emit InsuranceContractDeployed(msg.sender, deployed_contract);
    }

    
    function getContractAdd(address insurance_provider) public view returns (address) {
        return registry[insurance_provider];
    }
}
