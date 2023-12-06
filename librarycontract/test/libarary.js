const { expect } = require("chai");
const { ethers } = require('hardhat');

describe("LibrarySystem", function () {
  let librarySystem;
  let owner;
  let user;

  before(async () => {
    [owner, user] = await ethers.getSigners();

    const LibrarySystem = await ethers.getContractFactory('LibrarySystem');
    librarySystem = await LibrarySystem.deploy();
    await librarySystem.deployed();
  });

  it('should initialize the warden correctly', async function () {
    const warden = await librarySystem.warden();
    expect(warden).to.equal(owner.address);
  });

  it('should add a book', async function () {
    await librarySystem.addBook('Sample Book', 'Sample Author');
    const book = await librarySystem.books(1);
    expect(book.title).to.equal('Sample Book');
    expect(book.author).to.equal('Sample Author');
  });

  it('should borrow a book', async function () {
    await librarySystem.addBook('Book to Borrow', 'Borrow Author');
    await librarySystem.connect(user).borrowBook(2, 7, { value: ethers.utils.parseEther('1') });
    const book = await librarySystem.books(2);
    expect(book.borrower).to.equal(user.address);
    expect(book.available).to.be.false;
  });

  it('should return a borrowed book', async function () {
    await librarySystem.connect(user).returnBook(2);
    const book = await librarySystem.books(2);
    expect(book.borrower).to.equal(ethers.constants.AddressZero);
    expect(book.available).to.be.true;
  });

  it('should allow the warden to withdraw funds', async function () {
    const initialBalance = await ethers.provider.getBalance(owner.address);
    await librarySystem.withdraw();
    const newBalance = await ethers.provider.getBalance(owner.address);

    // Convert balance values to BigNumber
    const initialBalanceBigNumber = ethers.BigNumber.from(initialBalance);
    const newBalanceBigNumber = ethers.BigNumber.from(newBalance);

    // Calculate the difference
    const difference = newBalanceBigNumber.sub(initialBalanceBigNumber);

    // Check if the difference is greater than 0
    expect(difference.gt(0)).to.be.true;
  });
 });

  
    
