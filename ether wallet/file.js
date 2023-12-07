const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider('https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc');

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const  abi = require('./contracts/etherwallet.json');
const contract = new ethers.Contract(contractADDRESS, abi, signer);


const express = require('express');
const app = express();
app.use(express.json());
async function etherWallet() {
    const ownerAddress = await contract.owner();

   console.log('Owner Address:', ownerAddress);
}
async function fetchCondition() {
    try {
      const condition = await contract.getcondition();
      console.log('Current Condition:', condition);
    } catch (error) {
      console.error('Error fetching condition:', error);
    }
}
async function updateMessage(newMessage) {
    try {
      const tx = await contract.updateMessage(newMessage, { value: ethers.utils.parseEther('1') });
      await tx.wait();
      console.log('Message updated successfully!');
    } catch (error) {
      console.error('Error updating message:', error);
    }
  }async function getMessage() {
    try {
    const getmessage= await contract.message();
      console.log('Current Message:', getmessage);
    } catch (error) {
      console.error('Error getting message:', error);
    }
  }
  async function returnPlace() {
    try {
      const tx = await contract.returnplace();
      await tx.wait();
      console.log('Place returned successfully!');
    } catch (error) {
      console.error('Error returning place:', error);
    }
  }
  
 
  
etherWallet();
fetchCondition();
const newMessage = "sahjf";
updateMessage(newMessage);
getMessage();
returnPlace();

