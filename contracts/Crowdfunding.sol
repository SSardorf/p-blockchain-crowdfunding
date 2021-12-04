// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
contract Project {
    string public projectName;
    uint public deadline;
    uint public fundingGoal;
    uint public currentFunding;
    address public projectOwner;

    constructor(
        string memory name,
        uint endDate,
        uint goal
    ){
        projectOwner = msg.sender;
        projectName = name;
        deadline = endDate;
        fundingGoal = goal;
        currentFunding = 0;
    }

    function newDonation() external payable {
        require(
            msg.value+currentFunding <= fundingGoal,
            "The funding exceeds the goal"
        );
        // current date should be less than deadline TODO: make require
        currentFunding += msg.value;
    }

    // Make functionality to pay back if it doesn't go through

    // Pay the project owner
}