// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./insurancePolicy.sol";

contract Oracle {
    InsurancePolicy public insurancePolicyContract;
    address public owner;

    event GetIndex(uint id, string date, uint indexType, string area,uint payout);

    constructor(address registrationAddress) {
        owner = msg.sender;
        insurancePolicyContract = InsurancePolicy(registrationAddress);
    }

    function trigger(uint _policyNumber, string memory date) public {
        InsurancePolicy.insurance memory ins = insurancePolicyContract
            .getInsurance(_policyNumber);

        string memory weatherType = ins.pindex.index_type;
        uint typeIndex;

        if (keccak256(bytes(weatherType)) == keccak256(bytes("humidity"))) {
            typeIndex = 1;
        } else if (keccak256(bytes(weatherType)) == keccak256(bytes("rainfall"))) {
            typeIndex = 2;
        } else if (keccak256(bytes(weatherType)) == keccak256(bytes("temperature"))) {
            typeIndex = 3;
        } else if (keccak256(bytes(weatherType)) == keccak256(bytes("windspeed"))) {
            typeIndex = 4;
        } else if (keccak256(bytes(weatherType)) == keccak256(bytes("snowfall"))) {
            typeIndex = 5;
        } else {
            revert("Invalid weather type");
        }

        emit GetIndex(_policyNumber,date, typeIndex, ins.parea.area_name,ins.pamount.payout_amount);
    }
}
