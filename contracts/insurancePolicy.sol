pragma solidity =0.8.29;

// SPDX-License-Identifier: MIT
import "./registration.sol";

contract InsurancePolicy {
    
    struct insurance_type {
        uint insurance_premium;
        uint insurance_period;
        uint agreed_payout_amount;
        uint agreed_index_level;
    }

    Registration registrationContract;
    mapping(uint => insurance_type) insurance;
    address owner;

    event NewInsurancePolicyAdded(
        uint policy_number, uint insurance_premium, 
        uint insurance_period, uint agreed_payout_amount, uint agreed_index_level
    );
    event InsuranceAgreed(string message, uint policy_number, uint premium);

    modifier onlyOwner {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    } 

    modifier onlyFarmer {
        require(registrationContract.FarmerExists(msg.sender), "Sender not authorized.");
        _;
    }  

    constructor(address registrationAddress) {
        registrationContract = Registration(registrationAddress);
        
        require(registrationContract.InsuranceProviderExists(msg.sender),
            "The sender is not an approved insurance provider");

        owner = msg.sender;
    }

    function addInsurancePolicy(
        uint policy_number, uint insurance_premium, uint insurance_period,
        uint agreed_payout_amount, uint agreed_index_level
    ) public onlyOwner {
        if (insurance_premium != 0) {
            insurance[policy_number].insurance_premium = insurance_premium;
        }
        insurance[policy_number].insurance_period = block.timestamp + (insurance_period * 1 days);
        insurance[policy_number].agreed_payout_amount = agreed_payout_amount;
        insurance[policy_number].agreed_index_level = agreed_index_level;
        
        emit NewInsurancePolicyAdded(policy_number, insurance_premium, insurance[policy_number].insurance_period, 
            agreed_payout_amount, agreed_index_level);
    }

    function InsurancePeriod(uint policy_number) public view returns (uint) {
        return insurance[policy_number].insurance_period;
    }

    function InsurancePayOut(uint policy_number) public view returns (uint) {
        return insurance[policy_number].agreed_payout_amount;
    }

    function AgreedIndexLevel(uint policy_number) public view returns (uint) {
        return insurance[policy_number].agreed_index_level;
    }

    function payInsurancePremium(
        bool farmerDecision, uint policy_number, address payable insurance_provider
    ) public onlyFarmer payable {
        
        require(farmerDecision, "Farmer does not agree with the policy");
        require(msg.value == insurance[policy_number].insurance_premium, "Incorrect insurance premium");

        emit InsuranceAgreed("Farmer agreed to the insurance policy", policy_number, insurance[policy_number].insurance_premium);

        require(registrationContract.InsuranceProviderExists(insurance_provider), "Invalid insurance provider");
        (bool sent, ) = insurance_provider.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance(address desired_address) public view returns (uint) {
        return desired_address.balance;
    }
}