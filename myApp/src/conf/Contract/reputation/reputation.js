//manual deployment
import { ethers } from "ethers";
import  contractABI from "./abi.json";
const contractAddress = "sample";

export async function getContract() {
	if (!window.ethereum) {
		throw new Error("MetaMask not installed");
	}

	const provider = new ethers.BrowserProvider(window.ethereum);
	const signer = await provider.getSigner();

	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	return contract;
}

export async function addInsuranceProvider(insuranceProviderAddress) {
	try {
		const contract = await getContract();
		// console.log("Contract loaded:", contract.target);

		const tx = await contract.addInsuranceProvider(insuranceProviderAddress);
		const receipt = await tx.wait();

		// console.log("Transaction mined in block:", receipt);

	} catch (err) {
		console.error("Error in registerUser:", err);
	}
}

//must be called by farmer only
export async function feedback(insurance_provider,transactionSuccessful){
    try {
		const contract = await getContract();
		// console.log("Contract loaded:", contract.target);

		const tx = await contract.feedback(insurance_provider,transactionSuccessful);
		const receipt = await tx.wait();

		// console.log("Transaction mined in block:", receipt);

	} catch (err) {
		console.error("Error in registerUser:", err);
	}
}


