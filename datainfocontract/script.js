const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(`https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const { abi } = require('./artifacts/contracts/datainfo.sol/datainfo.json');
const contract = new ethers.Contract(contractADDRESS, abi, signer);


const express = require('express');
const app = express();
app.use(express.json());

async function setPersonalData(dataNo, myName, myAge, myAddress, fatherName) {
    try {
        // Call the setData function on the smart contract to set personal data
        const tx = await contract.setData(dataNo, myName, myAge, myAddress, fatherName);
        await tx.wait();
        console.log('Personal data set successfully!');
    } catch (error) {
        console.error('Error setting personal data:', error);
    }
}

// Example function to view personal data
async function viewPersonalData(dataNo) {
    try {
        // Call the getData function on the smart contract to retrieve personal data
        const data = await contract.getData(dataNo);

        // Display the retrieved personal data
        console.log(`Data Number: ${dataNo}`);
        console.log(`Name: ${data.myName}`);
        console.log(`Age: ${data.myAge}`);
        console.log(`Address: ${data.myAddress}`);
        console.log(`Father's Name: ${data.fatherName}`);
    } catch (error) {
        console.error('Error viewing personal data:', error);
    }
}

// Example usage
const dataNoToSet = 1;
setPersonalData(dataNoToSet, 'John Doe', 25, '123 Main St', 'John Doe Sr.');

const dataNoToView = 1;
viewPersonalData(dataNoToView);
