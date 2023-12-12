const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider('https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc');

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const  abi = require('./contracts/1155contract.json');
const contract = new ethers.Contract(contractADDRESS, abi, signer);


const express = require('express');
const app = express();
app.use(express.json());
// async function mint() {
//     const id = 1;  // Replace with your desired values
//     const value = 100;  // Replace with your desired values
//     const data = '0x';  // Replace with your desired values
  
//     try {
//       const tx = await contract.mint(id, value, data);
//       await tx.wait();
//       console.log('Transaction mined:', tx.hash);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  async function getBalance() {
    const ownerAddress = '0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72'; 
    const id = 1; 
  
    try {
      const balance = await contract.balanceOf(ownerAddress, id);
      console.log(`Balance of ${ownerAddress} for ID ${id}: ${balance}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
//   async function burn() {
//     const id = 1;  // Replace with your desired values
//     const value = 50;  // Replace with your desired values
  
//     try {
//       const tx = await contract.burn(id, value);
//       await tx.wait();
//       console.log('Transaction mined:', tx.hash);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
async function checkApproval() {
    const ownerAddress = '0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72'; // Replace with the owner's Ethereum address
    const operatorAddress = '0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2'; // Replace with the operator's Ethereum address
  
    try {
      const isApproved = await contract.isApprovedForAll(ownerAddress, operatorAddress);
      console.log(`Is ${operatorAddress} approved for all tokens of ${ownerAddress}: ${isApproved}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async function setApprovalForAll() {
    const operatorAddress = '0xB69bFEFd44810FD13783E3bdC978760c197035ee'; // Replace with the operator's Ethereum address
    const approved = true; // Replace with your desired approval status
  
    try {
      const tx = await contract.setApprovalForAll(operatorAddress, approved);
      await tx.wait();
      console.log(`Approval for all set for ${operatorAddress}: ${approved}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
//   async function safeTransferFrom() {
//     const fromAddress = '0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72';
//     const toAddress = '0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2';
//     const id = 1;
//     const value = 50;
//     const data = '0x';
    
//     // Set a higher gas price
//     const gasPrice = ethers.utils.parseUnits('100', 'gwei'); // Adjust the gas price as needed
  
//     try {
//       const tx = await contract.safeTransferFrom(fromAddress, toAddress, id, value, data, {
//         gasPrice: gasPrice,
//       });
  
//       await tx.wait();
//       console.log('Transfer successful:', tx.hash);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  
//   safeTransferFrom();
  
//   // Call the setApprovalForAll function
//   setApprovalForAll();
  
  // Call the isApprovedForAll function
  checkApproval();
  
 
  // Call the mint function
  //mint();
  // Call the balanceOf function
  getBalance();
   // Call the burn function
   //burn();
  