// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SchoolRecord {
    address public principal;

    struct Student {
        string name;
        uint256 rollno;
        string homeaddress;
        uint class;
    }

    mapping(uint256 => Student) public students;
    mapping(address=>bool) public teacher;

    constructor() {
        principal = msg.sender;
    }

    modifier onlyPrincipal() {
        require(msg.sender == principal, "Only the principal can add teacher");
        _;
    }
    modifier onlyteacher() {
        require(teacher[msg.sender], "Only the teacher can add students");
        _;
    }

    function teacheradd(address _teacher)public onlyPrincipal{
        teacher[_teacher]=true;
    }

    function teacherremove(address _teacher)public onlyPrincipal{
        teacher[_teacher]=false;
        
    }
    function addStudent( string memory name, uint256 rollno, string memory homeaddress, uint class ) public onlyteacher  {
        students[rollno] = Student(name, rollno, homeaddress, class);
    }
     function getStudent(uint256 rollno) public view returns (string memory name, uint256 rollNo, string memory homeAddress, uint class) {
        Student storage student = students[rollno];
        return (student.name, student.rollno, student.homeaddress, student.class);
    }
}