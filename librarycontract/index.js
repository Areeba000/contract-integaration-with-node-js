const ethers = require(`ethers`);
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./artifacts/contracts/contractapi.sol/contractapi.json");
const contractinstance = new ethers.Contract(contractADDRESS, abi, signer);
const express = require(`express`);
const app = express();
app.use(express.json());

async function main() {
    try {
        const wardenAddress = await contractinstance.warden();
        console.log(`Warden Address: ${wardenAddress}`);
        
        const count = await contractinstance.bookCount();
        console.log('Total number of books:', count.toString());

        const bookdetailsno = count.toNumber();  
          const book = await contractinstance.books(bookdetailsno);
          console.log(`Book ${bookdetailsno}:`);
          console.log(`Title: ${book.title}`);
          console.log(`Author: ${book.author}`);
          console.log(`Available: ${book.available}`);
          console.log(`Borrower: ${book.borrower}`);
          console.log(`Due Date: ${book.dueDate}`);
          console.log("----------------------");
      

      console.log("Book details displayed successfully!");
        // Add a book to the library
        const addBookTx = await contractinstance.addBook("The Great day", "Scott");
        await addBookTx.wait();
        console.log("Book added successfully");

        // Borrow the added book
        const borrowBookTx = await contractinstance.borrowBook(22, 7, { value: ethers.utils.parseEther("1") });
        await borrowBookTx.wait();
        console.log("Book borrowed successfully");

        // Return the borrowed book
        const returnBookTx = await contractinstance.returnBook(22);
        await returnBookTx.wait();
        console.log("Book returned successfully");

        console.log("Script executed successfully!");
    } catch (error) {
        console.error("Error executing script:", error);
        process.exit(22);
    }
}

main();
