// SPDX-License-Identifier: MIT
pragma solidity =0.8.29;

contract Registration {
    

    address private owner;
    mapping(address=>bool) public farmer;
    mapping(address=>bool) public insurance_provider;
    mapping(address=>bool) public weather_provider;

    event FarmerRegistered(address farmer);
    event Insurance_providerRegistered(address insurance_provider);
    event Weather_providerRegistered(address weather_provider);

    
    constructor() {
        owner=msg.sender;
    }
    
    function registerFarmer() public{
        require(!farmer[msg.sender] && !insurance_provider[msg.sender] && !weather_provider[msg.sender],
        "Address already used");
        
        farmer[msg.sender]=true;
        emit FarmerRegistered(msg.sender);
    }
    
    function registerInsurance_provider() public{
         require(!farmer[msg.sender] && !insurance_provider[msg.sender] && !weather_provider[msg.sender],
        "Address already used");
        
        insurance_provider[msg.sender]=true;
        emit Insurance_providerRegistered(msg.sender);
    }

    function registerWeather_provider() public{
         require(!farmer[msg.sender] && !insurance_provider[msg.sender] && !weather_provider[msg.sender],
        "Address already used");
        
        weather_provider[msg.sender]=true;
        emit Weather_providerRegistered(msg.sender);
    }
    
    function FarmerExists(address s) view public returns (bool) {
        return farmer[s];
    }
    
    function InsuranceProviderExists(address r) view public returns (bool) {
        return insurance_provider[r];
    }

    function WeatherProviderExists(address t) view public returns (bool) {
        return weather_provider[t];
    }
}