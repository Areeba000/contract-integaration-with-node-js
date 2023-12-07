// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MessageStorage {
    address payable public  owner;
    string public message;
    uint256 public updateCount;
    enum msgplacecondition{available,rented}
    msgplacecondition newmessage;

    constructor(string memory initialMessage) {
        owner =payable(msg.sender);
        message = initialMessage;
        updateCount = 0;
        newmessage=msgplacecondition.available;
    }

    function updateMessage(string memory newMessage) public payable  {
         require(newmessage == msgplacecondition.available,"the place is already rented");
        if(msg.value==1 ether){
             message = newMessage;
        }else{
            payable(msg.sender).transfer(msg.value);
        }
        updateCount ++;
        newmessage=msgplacecondition.rented;

    }

    function getcondition()public view returns(msgplacecondition){
        return newmessage;

    }
    
    function returnplace()public{
        newmessage = msgplacecondition.available;

    }
    function withdraw()public payable  {
        require(owner==msg.sender,"you are not owner");
        owner.transfer(address(this).balance);
   }

}