import { ethers } from "ethers";
import contractABI from "../../../../../blockchain/abi/abi1.json"; 

const contractAddress = "0xef812A442A595d431C786cd9c9Ce130202B4002C";

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
