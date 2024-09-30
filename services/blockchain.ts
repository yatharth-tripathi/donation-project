import { ethers } from 'ethers';
import CharityContract from '../contracts/Charity.json'; // Import ABI

const getBlockchain = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const charityAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address
    const contract = new ethers.Contract(charityAddress, CharityContract.abi, signer);
    return { contract, signer };
  } else {
    console.error("Please install MetaMask");
  }
};

export default getBlockchain;
