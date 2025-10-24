// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./registration.sol";

contract InsurancePolicy {
    struct policy_details {
        uint date_of_creation;
        string name_of_policy;
        address provider;
        address[] farmers;
    }

    struct policy_duration {
        uint policy_in_months;
        uint policy_in_days;
        uint payout_in_months;
        uint payout_in_days;
    }

    struct policy_amount {
        uint premium_amount;
        uint payout_amount;
    }

    struct policy_area {
        string area_name;
        string area_type;
    }

    struct policy_index {
        uint index_level;
        string index_type;
    }

    struct insurance {
        uint policy_number;
        policy_details pdetails;
        policy_duration pduration;
        policy_amount pamount;
        policy_area parea;
        policy_index pindex;
    }

    Registration registrationContract;
    address public owner;

    mapping(uint256 => insurance) public insurances;
    mapping(address => uint256[]) public farmerPolicies;
    mapping(address => uint256[]) public providerPolicies;
    uint[] public allPolicyNumbers;

    event NewInsurancePolicyAdded(address indexed provider, uint policy_number);
    event FarmerAdded(address indexed farmer, uint policy_number);
    event PremiumPaid(address indexed farmer, uint policy_number, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized (not owner).");
        _;
    }

    modifier onlyInsuranceProvider() {
        require(
            registrationContract.insuranceProviderExists(msg.sender),
            "Sender not authorized (not insurance provider)."
        );
        _;
    }

    modifier onlyFarmer() {
        require(
            registrationContract.farmerExists(msg.sender),
            "Sender not authorized (not farmer)."
        );
        _;
    }

    constructor(address registrationAddress) {
        owner = msg.sender;
        registrationContract = Registration(registrationAddress);
    }

    function addInsurancePolicy(
        uint _policyNumber,
        string memory _policyName,
        policy_duration calldata _pduration,
        policy_amount calldata _pamount,
        policy_area calldata _parea,
        policy_index calldata _pindex
    ) public onlyInsuranceProvider {
        require(
            insurances[_policyNumber].policy_number == 0,
            "Policy ID already exists"
        );

        address[] memory emptyFarmers;

        policy_details memory _pdetails = policy_details({
            date_of_creation: block.timestamp,
            name_of_policy: _policyName,
            provider: msg.sender,
            farmers: emptyFarmers
        });

        insurance memory newPolicy = insurance({
            policy_number: _policyNumber,
            pdetails: _pdetails,
            pduration: _pduration,
            pamount: _pamount,
            parea: _parea,
            pindex: _pindex
        });

        insurances[_policyNumber] = newPolicy;
        allPolicyNumbers.push(_policyNumber);
        providerPolicies[msg.sender].push(_policyNumber);

        emit NewInsurancePolicyAdded(msg.sender, _policyNumber);
    }

    function addFarmerToPolicy(uint _policyNumber) public onlyFarmer {
        insurance storage policy = insurances[_policyNumber];
        require(policy.policy_number != 0, "Policy does not exist");

        for (uint i = 0; i < policy.pdetails.farmers.length; i++) {
            require(
                policy.pdetails.farmers[i] != msg.sender,
                "Farmer already added"
            );
        }

        policy.pdetails.farmers.push(msg.sender);
        farmerPolicies[msg.sender].push(_policyNumber);

        emit FarmerAdded(msg.sender, _policyNumber);
    }

    function payInsurancePremium(uint _policyNumber) public payable onlyFarmer {
        insurance storage policy = insurances[_policyNumber];
        require(policy.policy_number != 0, "Invalid policy ID");
        
        bool isIncluded = false;
        for (uint i = 0; i < policy.pdetails.farmers.length; i++) {
            if (policy.pdetails.farmers[i] == msg.sender) {
                isIncluded = true;
                break;
            }
        }
        require(isIncluded, "You are not registered for this policy");

        emit PremiumPaid(msg.sender, _policyNumber, msg.value);

        (bool sent, ) = payable(policy.pdetails.provider).call{value: msg.value}("");
        require(sent, "Failed to transfer premium to provider");
    }

    function getInsurance(uint _policyNumber) public view returns (insurance memory) {
        return insurances[_policyNumber];
    }

    function getFarmers(uint _policyNumber) public view returns (address[] memory) {
        return insurances[_policyNumber].pdetails.farmers;
    }

    function getPoliciesForInsuranceProvider() public view returns (insurance[] memory) {
        uint[] memory policyNumbers = providerPolicies[msg.sender];
        insurance[] memory result = new insurance[](policyNumbers.length);
        for (uint i = 0; i < policyNumbers.length; i++) {
            result[i] = insurances[policyNumbers[i]];
        }
        return result;
    }

    function getPoliciesForFarmer() public view returns (insurance[] memory) {
        uint[] memory policyNumbers = farmerPolicies[msg.sender];
        insurance[] memory result = new insurance[](policyNumbers.length);
        for (uint i = 0; i < policyNumbers.length; i++) {
            result[i] = insurances[policyNumbers[i]];
        }
        return result;
    }

    function showPolicestoFarmer(policy_area memory pa) public view returns (insurance[] memory) {
        uint count = 0;
        for (uint i = 0; i < allPolicyNumbers.length; i++) {
            insurance storage pol = insurances[allPolicyNumbers[i]];
            if (
                keccak256(bytes(pol.parea.area_name)) == keccak256(bytes(pa.area_name)) &&
                keccak256(bytes(pol.parea.area_type)) == keccak256(bytes(pa.area_type))
            ) {
                count++;
            }
        }

        insurance[] memory result = new insurance[](count);
        uint j = 0;
        for (uint i = 0; i < allPolicyNumbers.length; i++) {
            insurance storage pol = insurances[allPolicyNumbers[i]];
            if (
                keccak256(bytes(pol.parea.area_name)) == keccak256(bytes(pa.area_name)) &&
                keccak256(bytes(pol.parea.area_type)) == keccak256(bytes(pa.area_type))
            ) {
                result[j] = pol;
                j++;
            }
        }

        return result;
    }
}
