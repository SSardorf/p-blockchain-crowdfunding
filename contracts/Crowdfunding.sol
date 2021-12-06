// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


contract CrowdfundingProjects {
    struct Project { // more complex data type
        string projectName;
        uint256 deadline;
        uint256 fundingGoal;
        uint256 currentFunding;
        bool complete; // add completeness status
        address payable creator; // has to be payable
        address[] supporters; // instead, implement a list of struct contributors?
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
    ) external payable {
        Project memory project; // memory is used to hold temporary values, cheaper to use
        project.projectName = _name;
        project.deadline = _deadline;
        project.fundingGoal = _fundingGoal;
        project.currentFunding = 0;
        project.complete = false;
        project.creator = payable(msg.sender);
        // project.contributors = new Contributor[](0); This doesn't work. Uncomment if you find a solution
        projects.push(project);
    }

    function getArr() public view returns (Project[] memory) { // get all projects that were ever made
        return projects;
    }

// payable function can recieve ether into the contract
    function newDonation(uint256 _index) external payable { // anyone can make a call to external function
        Project storage project = projects[_index]; // storage is where all the contract state variables reside, persistent bw calls, more expensive to use
        require(
            msg.value + project.currentFunding <= project.fundingGoal, // ??? change >
            "The funding exceeds the goal"
        );
        require(
            block.timestamp <= project.deadline, 
            "The crowdfunding project has passed the deadline"
        );
        // current date should be less than deadline TODO: make require

        project.currentFunding += msg.value;
        amountDonated[msg.sender] += msg.value; // mapping
        project.supporters.push(msg.sender);
        if (project.currentFunding < project.fundingGoal) {
            project.complete = false;
        }
        else project.complete = true;
    }

    function userAmountDonated() public view returns (uint){
        return amountDonated[msg.sender];
    }
    
    // Make functionality to pay back if it doesn't go through
    // if (project.currentFunding < project.fundingGoal && block.timestamp > project.deadline)

    // Pay the project owner
    function payCreator(uint256 _index) external payable { // or public payable?
        Project storage project = projects[_index]; 
        require (project.complete = true);
        project.creator.transfer(project.currentFunding);
    }
}
