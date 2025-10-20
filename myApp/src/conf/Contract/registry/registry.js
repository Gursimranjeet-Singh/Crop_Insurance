//manual deployment
import { ethers } from "ethers";
import contractABI from './abi.json';
// const contractAddress = ""; // demo

async function getContract() {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        return contract;
    } catch (err) {
        console.error("Failed to get contract:", err);
        throw err;
    }
}

export async function insertContract(deployedContractAddress) {
    try {
        const contract = await getContract();

        const tx = await contract.insertContract(deployedContractAddress);
        // console.log("Transaction sent from:", signerAddress, "Hash:", tx.hash);

        const receipt = await tx.wait();
        // console.log("Transaction mined in block:", receipt.blockNumber);

    } catch (err) {
        console.error("Error in Registering New Deployed Contract:", err);
        throw err;
    }
}

export async function getContractAdd(insuranceProviderAddress) {
    try {
        const  contract  = await getContract();

        const addr = await contract.getContractAdd(insuranceProviderAddress);
        // console.log("Returned address:", addr);

        return addr;
    } catch (err) {
        console.error("Error in getting Deployed Contract Address:", err);
        throw err;
    }
}
