import { ethers } from "ethers";
import contractABI from "../../../../../blockchain/abi/abi3.json"; 

const contractAddress = "0x4b22bEF720466f3d9878d3349dcaEAdd46e1dF71";

export async function getContract() {
    if (!window.ethereum) {
        throw new Error("MetaMask not installed");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    // const signerAddress = await signer.getAddress();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    return contract;
}


export async function trigger(
    policy_number,
    date
) {
    const contract = await getContract();
    const tx = await contract.trigger(
        policy_number,
        date
    );
}

