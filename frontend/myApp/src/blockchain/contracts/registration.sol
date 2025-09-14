// SPDX-License-Identifier: MIT
pragma solidity =0.8.30;

contract Registration {
    address private owner;

    enum Role {
        None,
        Farmer,
        InsuranceProvider
    }
    mapping(address => Role) public roles;

    event FarmerRegistered(address indexed user, string message);
    event InsuranceProviderRegistered(address indexed user, string message);

    constructor() {
        owner = msg.sender;
    }

    function registerUser(Role r) public {
        require(roles[msg.sender] == Role.None, "Address already registered");

        roles[msg.sender] = r;

        if (r == Role.Farmer) {
            emit FarmerRegistered(msg.sender, "Farmer Registered");
        } else {
            emit InsuranceProviderRegistered(
                msg.sender,
                "Insurance Provider Registered"
            );
        }
    }

    function farmerExists(address s) public view returns (bool) {
        return roles[s] == Role.Farmer;
    }

    function insuranceProviderExists(address r) public view returns (bool) {
        return roles[r] == Role.InsuranceProvider;
    }
}
