// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "./ICourse.sol";

interface ICertify is ICourse{

    function createInstitution(
        address _owner,
        uint _instituteCode,
        string memory _instituteName,
        string memory _instituteAcronym,
        Course[] memory _instituteCourses
    ) external returns (bool);

    function getInstituteDetails(address _instituteAddress)
    external
    view
    returns (
        address,
        uint,
        string memory,
        string memory,
        Course[] memory
    );

    function revokeInstitute(address _instituteAddress) external returns (bool);
}