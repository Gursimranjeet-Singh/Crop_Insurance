//manual deployment
import { ethers } from "ethers";
import {deployContractInsurancePolicy} from "../insurancePolicy/insurancePolicy"
import {addInsuranceProvider} from "../reputation/reputation"
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

	return { contract, signerAddress };
}

export async function registerUser(type) {
	try {
		const { contract,signerAddress } = await getContract();
		// console.log("Contract loaded:", contract.target);

		const tx = await contract.registerUser(type);
		const receipt = await tx.wait();

		// console.log("Transaction mined in block:", receipt);

		if (type == 2) {
			deployContractInsurancePolicy(contractAddress);
			addInsuranceProvider(signerAddress);
		}

	} catch (err) {
		console.error("Error in registerUser:", err);
	}
}


