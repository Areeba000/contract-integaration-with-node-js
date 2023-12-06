const { ethers } = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(`https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Check if your ABI import path is correct
const  abi  = require('./contracts/schoolstorage.json');
const schoolRecordContract = new ethers.Contract(contractADDRESS, abi, signer);


const express = require('express');
const app = express();
app.use(express.json());
async function main() {
    // Example: Adding a teacher by the principal
    const principalAddress = await wallet.getAddress();
    const addTeacherTx = await schoolRecordContract.teacheradd(principalAddress);
    await addTeacherTx.wait();

    console.log('Teacher added successfully by the principal.');

    const studentName = 'AREEBA';
        const rollNo = 1;
        const homeAddress = '123 Main Street';
        const studentClass = 10;

        const addStudentTx = await schoolRecordContract.addStudent(studentName, rollNo, homeAddress, studentClass);
        await addStudentTx.wait();

        console.log('Student added successfully by the teacher.');
         // Example: Fetching and displaying a student
         const rollNoToFetch = 1; 

         const studentDetails = await schoolRecordContract.getStudent(rollNoToFetch);
         console.log('Student Details:', studentDetails.toString());
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});
