import { ethers } from "ethers";
import contractABI from "./abi.json";



async function getContract() {
    if (!window.ethereum) throw new Error("MetaMask not installed");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();

    const contractAddress = await getContractAdd(signerAddress);
    return new ethers.Contract(contractAddress, contractABI, signer);
}

export async function issuePayout(
    policy_number,
    farmerAddress
) {
    const contract = await getContract();
    const tx = await contract.addInsurancePolicy(
        policy_number,
        farmerAddress
    );
    return await tx.wait();
}


