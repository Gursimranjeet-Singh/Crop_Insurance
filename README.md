# Source Code
https://github.com/Gursimranjeet-Singh/Crop_Insurance

# Requirements

This project requires Node.js (which includes npm).  
Ensure Node.js 18+ is installed before running any commands.

The project uses several APIs (geocoding, INR→ETH conversion, and historical weather).  
These APIs are already fully explained inside:  
`Project Guide and Information / API_INFORMATION.txt`  
They can be replaced with any other compatible APIs if needed.

Additional requirements include:

- MetaMask account and private key (for signing or deploying contracts)  
  Download MetaMask: https://metamask.io/  
  How to export private key:  
  https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key

- A WSS_RPC endpoint from an Ethereum-compatible provider:  
  Infura: https://www.infura.io/

- Supabase API key and project URL (must be added directly inside the project's config file at `myApp/src/conf/db/connect`)

- Optional GROQ API key if advanced chatbot (LLaMA 17B etc.) is used  
  Get API key: https://console.groq.com/keys



# Environment Setup

Create a `.env` file in the project root containing:

PRIVATE_KEY=your_metamask_private_key  
WSS_RPC=your_wss_rpc_url  
GROQ_API_KEY=your_groq_key_if_used  


# Contract Deployment (Optional)

The project already includes deployed contracts.  
Deployment is only required if you want to use your own contracts.

Steps:

1. Open Remix (`https://remix.ethereum.org`) and connect MetaMask.  
2. Compile and deploy `registration.sol`  
   - Save its deployed address  
   - Copy ABI (Remix → Compilation Details)  
3. Deploy `insurancePolicy.sol`  
   - Use the deployed `registration.sol` address in its constructor  
   - Save deployed address + ABI  
4. Deploy `oracle.sol`  
   - Use the deployed `insurancePolicy.sol` address in its constructor  
   - Save deployed address + ABI  



# Updating Contract Addresses & ABIs

After deployment, update contract addresses inside your `myApp/src/conf/contract`.  
Each file contains a `contractAddress` field — replace it with your deployed values.

Place all ABIs into:

`blockchain/abi/`  
- `abi1.json` (registration.sol ABI)  
- `abi2.json` (insurancePolicy.sol ABI)  
- `abi3.json` (oracle.sol ABI)



# Oracle Nodes (Optional)

Up to 3 oracle nodes can be deployed for redundancy.  
This is optional because the project already includes an existing oracle deployment.



# Running the Project

Run **only from the project root directory**:

npm install
npm start

# Final Checklist


- `.env` is correctly filled  
- Supabase values added to `myApp/src/conf/db/connect`  
- Contract addresses updated (if redeployed)  
- ABI files replaced with your versions  
- Node.js 18+ installed  

### If errors show up, check your terminal first. If you still have no idea what's happening, ask ChatGPT, Gemini, Claude…  or just ask me. I’m open for help — unlike my code.

