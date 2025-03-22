// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "./registration.sol";

contract Reputation {
    Registration registrationContract;
    mapping(address => uint) public InsuranceProviderRep;
    address owner;
    uint constant adjusting_factor = 4;

    event ReputationUpdated(address indexed insurance_provider, uint repScore);

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    }

    modifier onlyFarmer() {
        require(registrationContract.FarmerExists(msg.sender), "Sender not authorized.");
        _;
    }

    struct FarmerFeedbackData {
        mapping(address => bool) insurance_providers;
        mapping(address => bool) status;
    }

    mapping(address => FarmerFeedbackData) FarmerFeedback;

    constructor(address registrationAddress) {
        registrationContract = Registration(registrationAddress);
        owner = msg.sender;
    }

    function addInsuranceProvider(address provider) public onlyOwner {
        require(InsuranceProviderRep[provider] == 0, "Insurance provider already added");
        InsuranceProviderRep[provider] = 80; 
    }

    function feedback(address insurance_provider, bool transactionSuccessful) public onlyFarmer {
        require(!FarmerFeedback[msg.sender].insurance_providers[insurance_provider], 
                "Farmer has already provided feedback for this provider");
        require(registrationContract.InsuranceProviderExists(insurance_provider), 
                "Invalid insurance provider address");

        FarmerFeedback[msg.sender].insurance_providers[insurance_provider] = true;
        FarmerFeedback[msg.sender].status[insurance_provider] = transactionSuccessful;
    }

    function calculateRep(address insurance_provider) external {
        require(FarmerFeedback[msg.sender].insurance_providers[insurance_provider], 
                "No feedback provided by this farmer");

        uint cr;
        if (FarmerFeedback[msg.sender].status[insurance_provider]) {
            cr = (InsuranceProviderRep[insurance_provider] * 95) / (4 * adjusting_factor);
        } else {
            cr = (InsuranceProviderRep[insurance_provider] * 95) / (4 * (10 - adjusting_factor));
        }
        
        cr /= 100;

      
        if (FarmerFeedback[msg.sender].status[insurance_provider]) {
            InsuranceProviderRep[insurance_provider] += cr;
        } else {
            if (InsuranceProviderRep[insurance_provider] > cr) {
                InsuranceProviderRep[insurance_provider] -= cr;
            } else {
                InsuranceProviderRep[insurance_provider] = 0; // Prevent underflow
            }
        }

        if (InsuranceProviderRep[insurance_provider] > 100) {
            InsuranceProviderRep[insurance_provider] = 100;
        }

        emit ReputationUpdated(insurance_provider, InsuranceProviderRep[insurance_provider]);
    }
}
