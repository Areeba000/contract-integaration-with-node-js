const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider('https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc');

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const abi = require('./contracts/erc20lockcontract.json');
const contract1 = new ethers.Contract(contractADDRESS, abi, signer);

const erc20Interface = new ethers.utils.Interface(abi);
const express = require('express');
const app = express();
app.use(express.json());
// async function lockToken(tokenContract, tokenAmount) {
//     try {
//       // Call the locktoken function on the smart contract
//       const transaction = await contract1.locktoken(tokenContract, tokenAmount);
  
//       // Wait for the transaction to be mined
//       const receipt = await transaction.wait();
  
//       // Log the transaction receipt
//       console.log('Transaction receipt:', receipt);
  
  
//     } catch (error) {
//       console.error('Error locking tokens:', error.message);
//     }
//   }
  async function isTokenLocked(tokenContract, ownerAddress) {
    try {
      // Call the istokenLocked function on the smart contract
      const isLocked = await contract1.istokenLocked(tokenContract, ownerAddress);
  
      // Log the result
      console.log(`Are tokens locked for ${ownerAddress}? ${isLocked}`);
  
      return isLocked;
    } catch (error) {
      console.error('Error checking token lock status:', error.message);
      return false; // Return false in case of an error
    }
  }
  async function unlockToken(tokenContract, tokenAmount) {
    try {
  
      // Call the unlocktoken function on the smart contract
      const transaction = await contract1.unlocktoken(tokenContract, tokenAmount);
  
      // Wait for the transaction to be mined
      const receipt = await transaction.wait();
  
      // Log the transaction receipt
      console.log('Transaction receipt:', receipt);
  
  
    } catch (error) {
      console.error('Error unlocking tokens:', error.message);
    }
  }
  
  // Example usage
  const tokenContractToUnlock = '0xC5DdB0531A6d320A03a15883e91Dac0127B59744'; // Replace with the actual token contract address
  const tokenAmountToUnlock = 250; // Replace with the amount of tokens to unlock
  unlockToken(tokenContractToUnlock, tokenAmountToUnlock);
  
  // Example usage
  const tokenContractToCheck = '0xC5DdB0531A6d320A03a15883e91Dac0127B59744'; // Replace with the actual token contract address
  const ownerAddressToCheck = '0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72'; // Replace with the address you want to check
  isTokenLocked(tokenContractToCheck, ownerAddressToCheck);
//   const tokenContractToLock = '0xC5DdB0531A6d320A03a15883e91Dac0127B59744'; // Replace with the actual token contract address
// const tokenAmountToLock = 100; // Replace with the amount of tokens to lock
// lockToken(tokenContractToLock, tokenAmountToLock);