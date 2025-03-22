// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./registration.sol";
import "./insurancePolicy.sol";
import "./weatherVerification.sol";

contract RollPayout {
    Registration registrationContract;
    InsurancePolicy insuranceContract;
    WeatherVerification weatherContract;

    address owner;

    event PayoutIssued(string message, address indexed farmer, uint amount);

    modifier onlyOwner {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    }

    constructor(address registrationAddress, address insuranceAddress, address weatherAddress) {
        registrationContract = Registration(registrationAddress);
        insuranceContract = InsurancePolicy(insuranceAddress);
        weatherContract = WeatherVerification(weatherAddress);

        require(registrationContract.InsuranceProviderExists(msg.sender), "Sender is not an approved insurance provider");
        
        owner = msg.sender;
    }

    function IssuePayout(uint policy_number, address payable farmer) public onlyOwner payable {
        require(weatherContract.IndexLevel(policy_number) >= insuranceContract.AgreedIndexLevel(policy_number), 
            "The index level detected is below the agreed index stated in the insurance policy");

        uint payoutAmount = insuranceContract.InsurancePayOut(policy_number);
        require(msg.value == payoutAmount, "Incorrect payout amount");

        emit PayoutIssued("Payout issued", farmer, payoutAmount);

        require(registrationContract.FarmerExists(farmer), "Farmer not registered");

        (bool success, ) = farmer.call{value: msg.value}("");
        require(success, "Transfer failed");
    }

    function getBalance(address desired_address) public view returns (uint) {
        return address(desired_address).balance;
    }

    // receive() external payable {}
    // fallback() external payable {}
}
