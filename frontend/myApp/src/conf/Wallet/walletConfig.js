// need to set state accordingly
import {getContract,registerUser} from '../Contract/register/register'

export const connectWallet = async () => {
  if (typeof window.ethereum === 'undefined') {
    window.alert("MetaMask not installed");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Connected account:", accounts[0]);

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }]
    });


  } catch (err) {
    if (err.code === 4001) {
      window.alert("Please give access to enjoy the service.");
    } else if (err.code === -32002) {
      window.alert("Already pending permission. Please open MetaMask.");
    } else {
      console.error("Connection failed:", err);
      // setError("Unexpected error occurred. Please try again.");
    }
  }
};


function disconnectWallet() {
  setAccount(null);  // just clear it from your app
}

// useEffect(() => {
//   const connect = async () => {
//     const result = await connectWallet();
//     if (result.account) {
//       setAccount(result.account);
//     } else {
//       setError(result.error);
//         window.location.reload();
//     }
//   };

//   connect();
// }, []);