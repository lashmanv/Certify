// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;
// [[1,"CSE"],[2,"ECE"],[3,"EEE"],[4,"ME"],[5,"IT"],[6,"EIE"],[7,"RA"],[8,"CE"]]
import "./ICertify.sol";
import "./Institution.sol";
import "./IInstitution.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Certify is Ownable, ICertify{
    // State Variables
    IInstitution[] public institutions;

    mapping(address => bool) isRevoked;

    // Events
    event logCreatedInstitution(address _institution);

    function createInstitution(
        address _owner,
        uint _instituteCode,
        string memory _instituteName,
        string memory _instituteAcronym,
        Course[] memory _instituteCourses
    ) external 
    override
    returns (bool) {
        uint institutionsLength = institutions.length;

        bool isSameAcronym;
        bool isSameCode;

        for (uint256 i = 0; i < institutionsLength; i++) {
            if(institutions[i].getInstituteCode() == _instituteCode) {
                isSameCode = true;
            }
            if(stringToBytes32(institutions[i].getInstituteAcronym()) == stringToBytes32(_instituteAcronym)) {
                isSameAcronym = true;
            }
        }
        
        require(!isSameCode,"Institute with same acronym already exists");
        require(!isSameAcronym,"Institute with same code already exists");

        require(
            _instituteCourses.length > 0,
            "Atleast one course must be added"
        );

        Institution child = new Institution();

        institutions.push(child);

        child.setInstitution(_owner, _instituteCode, _instituteName, _instituteAcronym, _instituteCourses);
        
        emit logCreatedInstitution(address(child));

        return true;
    }

    function getInstituteDetails(address _instituteAddress)
    external
    view
    returns (
        address,
        uint,
        string memory,
        string memory,
        Course[] memory
    ) {
        IInstitution institute = IInstitution(_instituteAddress);

        require(institute.getInstituteCode() != 0, "Institute doesn't exists");

        return institute.getInstituteDetails();
    }

    function revokeInstitute(address _instituteAddress) external returns (bool) {
        IInstitution institute = IInstitution(_instituteAddress);

        require(institute.getInstituteCode() != 0, "Institute doesn't exists");

        institute.revokenInstitute();

        isRevoked[_instituteAddress] = true;

        return true;
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
                result := mload(add(source, 32))
        }
    }

}