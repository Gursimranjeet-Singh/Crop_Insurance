// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "./registration.sol";
import "./insurancePolicy.sol";

contract WeatherVerification {

    struct WeatherInfo {
        uint index_level;
    }

    Registration immutable registrationContract;
    InsurancePolicy immutable insuranceContract;

    mapping(uint => WeatherInfo) public weather;
    address public immutable owner;

    event WeatherUpdate(uint policy_number, uint index_level);

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    }

    modifier onlyWeatherProvider() {
        require(registrationContract.WeatherProviderExists(msg.sender), "Sender not authorized.");
        _;
    }

    constructor(address registrationAddress, address insuranceAddress) {
        registrationContract = Registration(registrationAddress);
        insuranceContract = InsurancePolicy(insuranceAddress);
        owner = msg.sender;
    }

    function reportWeatherStatus(uint policy_number, uint index_level) public onlyWeatherProvider {
        uint insurance_period = insuranceContract.InsurancePeriod(policy_number);
        
        if (block.timestamp < insurance_period) {  
            weather[policy_number].index_level = index_level;
        }

        emit WeatherUpdate(policy_number, weather[policy_number].index_level);
    }

    function IndexLevel(uint policy_number) public view returns (uint) {
        return weather[policy_number].index_level;
    }
}
