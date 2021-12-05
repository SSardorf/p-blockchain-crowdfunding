// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract CrowdfundingProjects {
    struct Project {
        string projectName;
        uint256 deadline;
        uint256 fundingGoal;
        uint256 currentFunding;
        address creator;
        address[] supporters;
    }

    struct Contributor {
        address contributor;
        uint256 amount;
        
    }
    Contributor[] public contributors;
    Project[] public projects;

    //mapping (uint=>address[]) supporters;
    mapping (address => uint) amountDonated;

    function createProject(
        string memory _name,
        uint256 _deadline,
        uint256 _fundingGoal
    ) public {
        Project memory project;
        project.projectName = _name;
        project.deadline = _deadline;
        project.fundingGoal = _fundingGoal;
        project.currentFunding = 0;
        project.creator = msg.sender;
        //project.contributors = new Contributor[](0); This doesn't work. Uncomment if you find a solution
        projects.push(project);
    }

    function getArr() public view returns (Project[] memory) {
        return projects;
    }

    function newDonation(uint256 _index) external payable {
        Project storage project = projects[_index];
        require(
            msg.value + project.currentFunding <= project.fundingGoal,
            "The funding exceeds the goal"
        );
        // current date should be less than deadline TODO: make require

        project.currentFunding += msg.value;
        amountDonated[msg.sender] += msg.value;
        project.supporters.push(msg.sender);
    }

    function userAmountDonated() public view returns (uint){
        return amountDonated[msg.sender];
    }
    // Make functionality to pay back if it doesn't go through

    // Pay the project owner
}
