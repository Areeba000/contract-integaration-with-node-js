// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}


contract ERC20 is IERC20{

    
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    uint public totalSupply=1000;
    string public name ="abeer";
    string public symbol="aber";
    uint8 public decimals=18 ;
    address public owner;
    constructor(){
        owner=msg.sender;
  }
    modifier  onlyowner{
        require(owner==msg.sender,"you are not owner");
        _;
    }
     function getName() external view returns (string memory) {
        return name;
    }

     function getsymbol() external view returns (string memory) {
        return symbol;
    }
     function gettotalsupply() external view returns (uint) {
        return totalSupply;
    }
     function getdecimal() external view returns (uint) {
        return decimals;
    }

    function transfer(address recipient, uint amount) external returns(bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender,address recipient,  uint amount ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(address account,uint256 amount) external onlyowner {
          require(account != address(0), "ERC20: mint to the zero address");
        totalSupply += amount;
       balanceOf[account] += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(address account,uint256 amount) external onlyowner {
        require(account != address(0), "ERC20: mint to the zero address");
         balanceOf[account] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
    function allowancefun(address _owner, address _spender) external view returns (uint256){
    return  allowance[_spender][_owner];
    } 
      function gettotalSupply() external view returns (uint256){
        return totalSupply;
    }
    function getbalanceOf(address _owner) external view returns (uint256){
        return balanceOf[_owner];

    }
}