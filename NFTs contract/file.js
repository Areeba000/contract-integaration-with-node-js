const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider('https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc');

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const  abi = require('./contracts/nftcontract.json');
const contract = new ethers.Contract(contractADDRESS, abi, signer);


const express = require('express');
const app = express();
app.use(express.json());
// async function mintToken(to, id) {
//     try {
//       const transaction = await contract.mint(to, id);
//       await transaction.wait();
//       console.log(`Token minted successfully!`);
//     } catch (error) {
//       console.error(`Error minting token: ${error.message}`);
//     }
//   }
// async function burnToken(id) {
//     try {
//       // Call the burn function
//       const transaction = await contract.burn(id);
//       await transaction.wait();
//       console.log(`Token burned successfully!`);
//     } catch (error) {
//       console.error(`Error burning token: ${error.message}`);
//     }
//   }
 async function getBalanceOf(owner) {
  try {
    // Call the balanceOf function
    const balance = await contract.balanceOf(owner);
    console.log(`Balance of ${owner}: ${balance}`);
    return balance;
  } catch (error) {
    console.error(`Error getting balance: ${error.message}`);
  }
}
async function getOwnerOf(id) {
    try {
      // Call the ownerOf function
      const owner = await contract.ownerOf(id);
      console.log(`Owner of token ${id}: ${owner}`);
      return owner;
    } catch (error) {
      console.error(`Error getting owner: ${error.message}`);
    }
  }
//   async function approveSpender(spender, id) {
//     try {
//       // Call the approve function
//       const transaction = await contract.approve(spender, id);
//       await transaction.wait();
//       console.log(`Approved spender ${spender} for token ${id}`);
//     } catch (error) {
//       console.error(`Error approving spender: ${error.message}`);
//     }
//   }
  
  async function getApprovedAddress(id) {
    try {
      // Call the getApproved function
      const approvedAddress = await contract.getApproved(id);
      console.log(`Approved address for token ${id}: ${approvedAddress}`);
      return approvedAddress;
    } catch (error) {
      console.error(`Error getting approved address: ${error.message}`);
    }
  }
  async function safeTransfer(from,to,id) {
    
      const transaction1 = await contract.safeTransferFrom(from,to,id);
      await transaction1.wait();
      console.log(`Token ${id} safely transferred from ${from} to ${to}`);
  }
  
  // Example usage
  safeTransfer('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72','0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2',4);
  
//   // Example usage
  // approveSpender('0xA29f4cAfaaEEb8655f9e5416c2f0de64F5c362aa', 4);
  getApprovedAddress(4);
  
  
//   // Example usage
   getOwnerOf(4);
  

// // Example usage
 getBalanceOf('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72');
  
//   // Example usage
// //   burnToken(2);
  
//   // Example usage
//mintToken('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72', 4);
  