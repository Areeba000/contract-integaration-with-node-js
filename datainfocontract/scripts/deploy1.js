// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  

  const datainfo = await hre.ethers.getContractFactory("datainfo");
  const myContract = await datainfo.deploy();
  await myContract.deployed();
  console.log(`Contract address:${myContract.address} `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
