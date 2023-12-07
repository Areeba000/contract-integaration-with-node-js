/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.19",
  defaultNetwork:"xana",
  networks:{
    hardhat:{},
    xana:{
     
      url:`https://testnet.xana.net/ext/bc/fRuomnMajakodKhGaxiaWz7DqGdqAAAZTnQUUPqA4osnLkw5i/rpc`,
     
      accounts: [PRIVATE_KEY],
      gas: 8000000,
      gasPrice: 10000200000000,

    }
    },
   

  }
  
    
  

