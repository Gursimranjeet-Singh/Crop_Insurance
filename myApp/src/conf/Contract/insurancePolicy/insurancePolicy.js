import { ethers } from "ethers";
import contractABI from "./abi.json";

const contractAddress = "";

export async function getContract() {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
}


export async function addInsurancePolicy(
    policy_number,
    policy_name,
    pduration,
    pamount,
    parea,
    pindex
) {
    const contract = await getContract();
    const tx = await contract.addInsurancePolicy(
        policy_number,
        policy_name,
        pduration,
        pamount,
        parea,
        pindex
    );
    return await tx.wait();
}

export async function addFarmerToPolicy(policy_number) {
    const contract = await getContract();
    const tx = await contract.addFarmerToPolicy(
        policy_number
    );
    return await tx.wait();
}

export async function payInsurancePremium(policy_number,premiumInWei) {
    const contract = await getContract();
    const tx = await contract.payInsurancePremium(
        policy_number,{value:premiumInWei}
    );
    return await tx.wait();
}

export async function getInsurance(policy_number) {
    const contract = await getContract();
    const data = await contract.getInsurance(
        policy_number
    );
    return data;
}

export async function getFarmers(policy_number) {
    const contract = await getContract();
    const data = await contract.getFarmers(
        policy_number
    );
    return data;
}

export async function getPoliciesForInsuranceProvider() {
    const contract = await getContract();
    const data = await contract.getPoliciesForInsuranceProvider();
    return data;
}

export async function getPoliciesForFarmer() {
    const contract = await getContract();
    const data = await contract.getPoliciesForFarmer();
    return data;
}

export async function showPolicestoFarmer(policy_area) {
    const contract = await getContract();
    const data = await contract.showPolicestoFarmer(policy_area);
    return data;
}

