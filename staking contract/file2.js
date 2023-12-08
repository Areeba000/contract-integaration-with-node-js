const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider('https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc');

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const abi = require('./contracts/staking.json');
const contract1 = new ethers.Contract(contractADDRESS, abi, signer);

const erc20Interface = new ethers.utils.Interface(abi);
const express = require('express');
const app = express();
app.use(express.json());
// async function stakeTokens(amount) {
//     try {
//         const gasLimit = 300000; 
//       // Call the stakeTokens function on the smart contract
//       const transaction = await contract1.stakeTokens(amount,{gasLimit});
  
//       const receipt = await transaction.wait();
  
//       // Log the transaction receipt
//       console.log('Transaction done:',transaction);
  
//     } catch (error) {
//       console.error('Error staking tokens:', error.message);
//     }
//   }
  async function unstake() {
    try {
  
      // Call the unstake function on the smart contract
      const transaction = await contract1.unstake();
  
      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
  
      // Log the transaction receipt
      console.log('Transaction receipt:', transaction );
  
    } catch (error) {
      console.error('Error unstaking tokens:', error.message);
    }
  }async function isTokenStake(ownerAddress) {
    try {
      // Call the istokenstake function on the smart contract
      const isStaker = await contract1.istokenstake(ownerAddress);
  
      // Log the result
      console.log(`Is ${ownerAddress} a staker? ${isStaker}`);
  
      return isStaker;
    } catch (error) {
      console.error('Error checking staker status:', error.message);
      return false; // Return false in case of an error
    }
  }
  
  // Example usage
  const ownerAddressToCheck = '0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72'; // Replace with the address you want to check
  isTokenStake(ownerAddressToCheck);
  
  // Example usage
  unstake();
  
  // Example usage
//   const amountToStake = 150;
//   stakeTokens(amountToStake);