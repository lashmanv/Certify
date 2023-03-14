// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./IInstitution.sol";

contract Institution is IInstitution{
    address public owner;

    address public admin;
    
    uint instituteCode;
    
    string instituteName;
    
    string instituteAcronym;

    bool isRevoked;
    
    Course[] instituteCourses;

    struct Certificate {
        bytes32 certificateId;
        string certificateURL;
        string candidateName;
        string candidateNumber;
        string courseName;
        uint courseId;
        bool isRevoked;
        uint expirationDate;
    }

    mapping(bytes32 => Certificate) public certificateDetails;

    // Mapping owner address to certificate Id
    mapping(address => bytes32[]) internal userCertificateIds;

    event logCertificateGenerated(bytes32 _certificateId);

    event logCertificateRevoked(bytes32 _revoked);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Caller is not the admin");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function setInstitution(
        address _owner,
        uint _instituteCode,
        string memory _instituteName,
        string memory _instituteAcronym,
        Course[] memory _instituteCourses
    ) external override returns (bool) {
        
        owner = _owner;

        instituteCode = _instituteCode;
        instituteName = _instituteName;
        instituteAcronym = _instituteAcronym;

        for (uint256 i = 0; i < _instituteCourses.length; i++) {
            instituteCourses.push(_instituteCourses[i]);
        }

        return true;
    }

    function addCourse(Course memory _instituteCourses) external onlyOwner() override returns (bool) {
        instituteCourses.push(_instituteCourses);
        
        return true;
    }

    function getInstituteAddress() external view returns (address) {
        return address(this);
    }

    function getInstituteName() external view returns (string memory) {
        return instituteName;
    }

    function getInstituteAcronym() external view returns (string memory) {
        return instituteAcronym;
    }

    function getInstituteCode() external view returns (uint) {
        return instituteCode;
    }

    function getInstituteDetails() external override view returns (address, uint, string memory, string memory, Course[] memory) {
        return (
            address(this),
            instituteCode,
            instituteName,
            instituteAcronym,
            instituteCourses
        );
    }

    function generateCertificate(
        bytes32[] memory _certificateId,
        string[] memory _certificateURL,
        string[] memory _candidateName,
        string[] memory _candidateNumber,
        address[] memory _candidateAddress,
        string[] memory _courseName,
        uint[] memory _courseId,
        uint[] memory _expirationDate
    ) external onlyOwner() override returns(bool) {
        
        for(uint i = 0; i < _certificateId.length; i++) {
            require(certificateDetails[_certificateId[i]].expirationDate == 0, "Certificate with given id already exists");
            require(_expirationDate[i] > block.timestamp, "Expiration date should be more than the current date");

            certificateDetails[_certificateId[i]] = Certificate(_certificateId[i], _certificateURL[i], _candidateName[i], _candidateNumber[i], _courseName[i], _courseId[i], false, _expirationDate[i]);

            userCertificateIds[_candidateAddress[i]].push(_certificateId[i]);

            emit logCertificateGenerated(_certificateId[i]);
        }

        return true;
    }

    function getCertificateDetails(bytes32 _certificateId) public override view returns(bytes32, string memory, string memory, string memory, uint, bool, uint) {
        Certificate memory temp = certificateDetails[_certificateId];
        require(temp.expirationDate != 0, "No data exists");

        return (temp.certificateId, temp.certificateURL, temp.candidateName, temp.courseName, temp.courseId, temp.isRevoked, temp.expirationDate);
    }

    function revokeCertificate(bytes32 _certificateId) external onlyOwner() override returns(bool){
        
        require(
            certificateDetails[_certificateId].expirationDate >= block.timestamp,
            "Certificate id does not exist"
        );

        certificateDetails[_certificateId].isRevoked = true;

        emit logCertificateRevoked(_certificateId);

        return true;
    }

    function getCertificateURL(bytes32 _certificateId) external view override returns (string memory) {
        string memory url = certificateDetails[_certificateId].certificateURL;

        require(bytes(url).length != 0, "Certificate id does not exist");

        return url;
    }

    function getUserCertificates(address _user) external view override returns(bytes32[] memory) {
        bytes32[] memory url = userCertificateIds[_user];

        require(url.length != 0, "User don't have any certificates");

        return url;
    }    

    function revokenInstitute() external onlyAdmin() override returns (bool) {
        isRevoked = !isRevoked;

        return isRevoked;
    }

}