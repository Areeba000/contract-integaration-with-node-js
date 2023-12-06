const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(`https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const  abi  = require('./contracts/contactbook.json');
const contract = new ethers.Contract(contractADDRESS, abi, signer);


const express = require('express');
const app = express();
app.use(express.json());
async function main(number, name) {
    try {

      const tx = await contract.addContact(number, name);
      await tx.wait();
      console.log(`Contact ${name},${number} added successfully!`);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  }
  async function getAllContacts() {
    try {
      const [names, numbers] = await contract.getAllContactNames();
      console.log('All Contacts:');
      names.forEach((name, index) => {
        console.log(`${name}: ${numbers[index]}`);
      });
    } catch (error) {
      console.error('Error getting all contacts:', error);
    }
  }
  
  const newContactName = 'jvcxcvb';
const newContactNumber = 5455555555555;

main(newContactNumber, newContactName);
getAllContacts();
