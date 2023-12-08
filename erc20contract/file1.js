const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider('https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc');

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const abi = require('./contracts/erc20.json');
const contract1 = new ethers.Contract(contractADDRESS, abi, signer);

const erc20Interface = new ethers.utils.Interface(abi);
const express = require('express');
const app = express();
app.use(express.json());
async function interactWithERC20() {
    try {
        // Example: Get total supply
        const totalSupply = await contract1.gettotalSupply();
        console.log('Total Supply:', totalSupply.toString());

        // Example: Get name, symbol, and decimals
        const name = await contract1.getName();
        
        const symbol = await contract1.getsymbol();
        const decimals = await contract1.getdecimal();

        console.log('Name:', name);
        console.log('Symbol:', symbol);
        console.log('Decimals:', decimals.toString());

        // Example: Get owner
        const owner = await contract1.owner();
        console.log('Owner:', owner);
       

    } catch (error) {
        console.error('Error interacting with ERC20:', error);
    }
}
// async function mintTokens(accountAddress, amount) {
//     try {
//       const tx = await contract1.mint(accountAddress, amount);
//       await tx.wait();
//       console.log('Minting successful!');
//     } catch (error) {
//       console.error('Error minting tokens:', error);
//     }
//   }
//   async function burnTokens(accountAddress, amount) {
//     try {
//       const tx = await contract1.burn(accountAddress, amount);
//       await tx.wait();
//       console.log('Burning successful!');
//     } catch (error) {
//       console.error('Error burning tokens:', error);
//     }
//   }
  async function getBalanceOf(accountAddress) {
    try {
      const balance = await contract1.getbalanceOf(accountAddress);
      console.log('Balance of', accountAddress, ':', balance.toString());
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  }
//   async function transferTokens(recipientAddress, amount) {
//     try {
//       const tx = await contract1.transfer(recipientAddress, amount);
//       await tx.wait();
//       console.log('Transfer successful!');
//     } catch (error) {
//       console.error('Error transferring tokens:', error);
//     }
//   }
async function approveSpending(spenderAddress, amount) {
    try {
      const tx = await contract1.approve(spenderAddress, amount);
      await tx.wait();
      console.log('Approval successful!');
    } catch (error) {
      console.error('Error approving spending:', error);
    }
  }
// async function transferFromWithApproval(senderAddress, recipientAddress, amount) {
//     try {
//       const tx = await contract1.transferFrom(senderAddress, recipientAddress, amount);
//       await tx.wait();
//       console.log('Transfer with approval successful!');
//     } catch (error) {
//       console.error('Error transferring with approval:', error);
//     }
//   }
async function checkAllowance(ownerAddress, spenderAddress) {
    try {
      const allowance = await contract1.allowancefun(ownerAddress, spenderAddress);
      console.log('Allowance:', allowance.toString());
    } catch (error) {
      console.error('Error checking allowance:', error);
    }
  }
  approveSpending('0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2', 50);
  //transferFromWithApproval('senderAddress', 'recipientAddress', 30);
  //transferFromWithApproval('0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2', '0xB49B88526ff332e499Dc5CD0450358F96E4e8B6B', 30);
  //transferTokens('0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2', 100);
  interactWithERC20();
   //mintTokens('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72', 200);
  //burnTokens('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72', 50);
  getBalanceOf('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72');
checkAllowance('0xB0A386B77B81Be0C4D0DE0F6BFe3F08892c15F72', '0xbCb67b47D270bF1CBB55e6b0D48824d6FbB22fD2');
