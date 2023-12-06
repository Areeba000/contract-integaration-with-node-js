// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ContactBook {
    // Define a struct to represent a contact
    struct Contact {
        uint256 number; // The contact's phone number
        bool exists;    // A flag to check if the contact exists
    }

    // Mapping to associate contact names with their corresponding Contact structs
    mapping(string => Contact) private contacts;

    // Arrays to store the list of contact names and their corresponding phone numbers
    string[] private contactNames;
    uint256[] private contactNumbers;

    // Function to add a new contact
    function addContact(uint256 _number, string memory _name) public {
        require(!contacts[_name].exists, "Contact already exists");

        // Create a new Contact struct and add it to the mapping
        contacts[_name] = Contact(_number, true);

        // Add the contact's name and phone number to the respective arrays
        contactNames.push(_name);
        contactNumbers.push(_number);
    }

    // Function to get the phone number of a contact by name
    function getContactNumber(string memory _name) public view returns (uint256) {
        require(contacts[_name].exists, "Contact does not exist");
        return contacts[_name].number;
    }

    // Function to retrieve all contact names and their corresponding phone numbers
    function getAllContactNames() public view returns (string[] memory, uint256[] memory) {
        return (contactNames, contactNumbers);
    }
}