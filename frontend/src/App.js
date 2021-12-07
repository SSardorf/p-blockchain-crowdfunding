import Web3 from "web3";
import { useState, useEffect, Fragment } from "react";
import CROWDFUNDING from "./contracts/crowdfunding.json";
import ADDRESS from "./contracts/contract-address.json";

function App() {
    async function getAllProjects() {
        const projects = await crowdfunding.methods.getArr().call();
        setAllProjects(projects);
    }
    async function createProject(name, deadline, goal) {
        const newProject = await crowdfunding.methods
            .createProject(name, goal, deadline)
            .send({ from: account });
        getAllProjects();
    }

    async function loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        await window.ethereum.enable();
        const network = await web3.eth.net.getNetworkType();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const crowdfunding = new web3.eth.Contract(
            CROWDFUNDING.abi,
            ADDRESS.crowdfunding
        );
        setAccount(account);
        setCrowdfunding(crowdfunding);
        const allProjects = await crowdfunding.methods.getArr().call();
        setAllProjects(allProjects);
        return account, allProjects;
    }

    const [account, setAccount] = useState("");
    const [crowdfunding, setCrowdfunding] = useState("");
    const [allProjects, setAllProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [fundingGoal, setFundingGoal] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        // Update the document title using the browser API
        console.log(CROWDFUNDING.abi);
        console.log(ADDRESS.crowdfunding);
        loadBlockchainData();
    }, []);

    return (
        <div className="App h-full">
            <h1 className="text-4xl">Hello {account}</h1>
            <div className="flex flex-wrap w-full">
                {allProjects.map((project, index) => {
                    return (
                        <div key={index} className="w-1/2 ">
                            <div className="bg-gray-100 m-4 p-4">
                                <p className="">Creator: {project.creator}</p>
                                <p>Projectname: {project.projectName}</p>
                                <p>Funding: {project.currentFunding}</p>
                                <p>Goal: {project.fundingGoal}</p>
                                <p>Deadline: {project.deadline}</p>
                                <button className="bg-green-300 p-2 rounded-md">
                                    Donate
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <form className="flex flex-col w-1/3">
                <label>
                    Projectname:
                    <input
                        type="text"
                        name="projectname"
                        className="form-input"
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project Name"
                    />
                </label>
                <label>
                    Goal:
                    <input
                        type="number"
                        name="fundingGoal"
                        onChange={(e) => setFundingGoal(e.target.value)}
                    />
                </label>
                <label>
                    Deadline:
                    <input
                        type="date"
                        name="deadline"
                        //parseInt((new Date('2012.08.10').getTime() / 1000).toFixed(0))
                        onChange={(e) =>
                            setDeadline(
                                new Date(e.target.value).getTime() / 1000
                            )
                        }
                    />
                </label>
                <button
                    type="button"
                    className="bg-green-300 p-2 rounded-md"
                    onClick={() =>
                        createProject(projectName, fundingGoal, deadline)
                    }
                >
                    Create Project
                </button>
            </form>
        </div>
    );
}

export default App;
