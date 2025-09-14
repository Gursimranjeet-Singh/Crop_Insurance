// SPDX-License-Identifier: MIT
pragma solidity =0.8.30;

import "./registration.sol";
import "./insurancePolicy.sol";
// import "./weatherVerification.sol";

contract RollPayout {
    Registration public registrationContract;
    InsurancePolicy public insuranceContract;
    // WeatherVerification public weatherContract;

    address public owner;

    event PayoutIssued(string message, address indexed farmer, uint amount);


    constructor(
        address registrationAddress,
        address insuranceAddress
        // address weatherAddress
    ) {
        registrationContract = Registration(registrationAddress);
        insuranceContract = InsurancePolicy(insuranceAddress);
        // weatherContract = WeatherVerification(weatherAddress);

        owner = msg.sender;
    }

    // Function to fund the contract with Ether
    receive() external payable {}

    function issuePayout(uint policyNumber, address payable farmer)
        public
    {
        require(
            registrationContract.farmerExists(farmer),
            "Farmer not registered"
        );

        uint payoutAmount = insuranceContract.InsurancePayOut(policyNumber);
        require(
            address(this).balance >= payoutAmount,
            "Insufficient contract balance"
        );

        (bool success, ) = farmer.call{value: payoutAmount}("");
        require(success, "Transfer failed");

        emit PayoutIssued("Payout issued", farmer, payoutAmount);
    }

    // Optional: allow owner to withdraw leftover funds
    function withdraw(uint amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdraw failed");
    }
}
