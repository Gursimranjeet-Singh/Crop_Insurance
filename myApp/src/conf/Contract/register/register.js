import { ethers } from "ethers";
import contractABI from "./abi.json"; 

// import { deployContractInsurancePolicy } from "../insurancePolicy/insurancePolicy";
// import { addInsuranceProvider } from "../reputation/reputation";

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

export async function registerUser(type) {
	try {
		const contract = await getContract();
		const tx = await contract.registerUser(type);
		const receipt = await tx.wait();

		console.log("Transaction mined:", receipt);
	} catch (err) {
		console.error("Error in registerUser:", err);
	}
}
