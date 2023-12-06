// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract datainfo {
    // Define a struct to store personal data
    struct MyData {
        string myName;    // The name of the person
        uint myAge;       // The age of the person
        string myAddress; // The address of the person
        string fatherName; // The name of the person's father
    }

    // Create a mapping to store personal data with a unique data number
    mapping(uint => MyData) public dataMap;

    // Function to set personal data
    function setData(
        uint _dataNo,         // Unique data number to identify the data
        string memory _myName, // The name of the person
        uint _myAge,           // The age of the person
        string memory _myAddress, // The address of the person
        string memory _fatherName // The name of the person's father
    ) public {
        // Store the provided personal data in the data mapping
        dataMap[_dataNo] = MyData(_myName, _myAge, _myAddress, _fatherName);
    }
     function getData(uint _dataNo) public view returns (MyData memory) {
        return dataMap[_dataNo];
    }
}