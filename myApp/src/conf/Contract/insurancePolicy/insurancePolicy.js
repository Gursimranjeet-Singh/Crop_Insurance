import { ethers } from "ethers";
import { insertContract, getContractAdd } from "../registry/registry";
import contractABI from "./abi.json";
import byteCode from "./byteCode.txt";

export async function deployContractInsurancePolicy(addressRegisterContract) {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const factory = new ethers.ContractFactory(contractABI, byteCode, signer);
    const contract = await factory.deploy(addressRegisterContract);

    // console.log("Deploying, tx hash:", contract.deploymentTransaction().hash);

    await contract.waitForDeployment();
    await insertContract(contract.target);

    // console.log("Deployed at:", contract.target);
    return contract.target;
}

export async function getContract() {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    const contractAddress = await getContractAdd(signerAddress);
    return new ethers.Contract(contractAddress, contractABI, signer);
}

export async function addInsurancePolicy(
    policy_number,
    insurance_premium,
    insurance_period,
    agreed_payout_amount,
    agreed_index_level
) {
    const contract = await getContract();
    const tx = await contract.addInsurancePolicy(
        policy_number,
        insurance_premium,
        insurance_period,
        agreed_payout_amount,
        agreed_index_level
    );
    return await tx.wait();
}

export async function getInsurancePeriod(policy_number) {
    const contract = await getContract();
    return await contract.InsurancePeriod(policy_number);
}

export async function getInsurancePayOut(policy_number) {
    const contract = await getContract();
    return await contract.InsurancePayOut(policy_number);
}

export async function getAgreedIndexLevel(policy_number) {
    const contract = await getContract();
    return await contract.AgreedIndexLevel(policy_number);
}

export async function getInsurancePremium(policy_number) {
    const contract = await getContract();
    return await contract.getInsurancePremium(policy_number);
}

//must be connected to farmers wallet for this 
export async function payInsurancePremium(farmerDecision, policy_number) {
    const contract = await getContract();

    const premium = await getInsurancePremium(policy_number);

    const tx = await contract.payInsurancePremium(farmerDecision, policy_number, {
        value: premium
    });

    return await tx.wait();
}
