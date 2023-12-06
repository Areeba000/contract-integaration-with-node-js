// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  

  const contractapi = await hre.ethers.getContractFactory("contractapi");
  const myContract = await contractapi.deploy();
  await myContract.deployed();
  console.log("Contract address:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
