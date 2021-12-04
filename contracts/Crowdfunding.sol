// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
contract Project {
    string public projectName;
    uint public deadline;
    uint public fundingGoal;
    uint public currentFunding;

    constructor(
        string memory name,
        uint endDate,
        uint goal
    ){
        projectName = name;
        deadline = endDate;
        fundingGoal = goal;
        currentFunding = 0;
    }

    function newDonation(uint amount) public {
        require(
            amount+currentFunding <= fundingGoal,
            "The funding exceeds the goal"
        );
        // current date should be less than deadline TODO: make require
        currentFunding += amount;
    }
}