// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./ICourse.sol";

interface IInstitution is ICourse{

    function setInstitution(
        address _owner,
        uint _instituteCode,
        string memory _instituteName,
        string memory _instituteAcronym,
        Course[] memory _instituteCourses
    ) external returns (bool);

    function addCourse(Course memory _instituteCourses) external returns (bool);

    function getInstituteAddress() external view returns (address);

    function getInstituteName() external view returns (string memory);

    function getInstituteAcronym() external view returns (string memory);

    function getInstituteCode() external view returns (uint);

    function getInstituteDetails()
    external
    view
    returns (
        address,
        uint,
        string memory,
        string memory,
        Course[] memory
    );

    function generateCertificate(
        bytes32[] memory _certificateId,
        string[] memory _certificateURL,
        string[] memory _candidateName,
        string[] memory _candidateNumber,
        address[] memory _candidateAddress,
        string[] memory _courseName,
        uint[] memory _courseCode,
        uint[] memory _expirationDate
    ) external returns (bool);

    function getCertificateDetails(bytes32 _certificateId) 
    external 
    view 
    returns (
        bytes32,
        string memory,
        string memory,
        string memory,
        uint,
        bool,
        uint
    );

    function revokeCertificate(bytes32 _certificateId) external returns (bool);

    function getCertificateURL(bytes32 _certificateId) external view returns (string memory);

    function revokenInstitute() external returns(bool);

    function getUserCertificates(address _user) external view returns(bytes32[] memory);

}